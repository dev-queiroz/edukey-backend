import { getQuestionsFromOTDB, generateExamQuestionsWithAI, getCustomQuestions } from './examSimulatorService.js';
import PDFDocument from 'pdfkit';
import { recordUserScore } from '../gamification/gamificationService.js';

export const generateExam = async (req, res) => {
    const { category, difficulty, amount = 10, type = 'multiple', source, topic, format } = req.body;
    if (!difficulty) return res.status(400).json({ success: false, error: 'Dificuldade é obrigatória' });

    try {
        let questions;
        if (source === 'custom') {
            questions = await getCustomQuestions(amount);
        } else if (source === 'ai') {
            if (!topic) return res.status(400).json({ success: false, error: 'Tópico é obrigatório para IA' });
            questions = await generateExamQuestionsWithAI(topic, difficulty, amount, type);
            questions = parseAIQuestions(questions);
        } else {
            if (!category) return res.status(400).json({ success: false, error: 'Categoria é obrigatória para OTDB' });
            questions = await getQuestionsFromOTDB(category, difficulty, amount, type);
        }

        if (format === 'pdf') {
            const pdfBuffer = await generatePDF(questions);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=exam.pdf');
            res.send(pdfBuffer);
        } else {
            res.json({ questions });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao gerar exame' });
    }
};

export const submitExam = async (req, res) => {
    const { userId } = req.user;
    const { examId, answers } = req.body; // answers: { questionId: answer }
    if (!examId || !answers) return res.status(400).json({ success: false, error: 'examId e answers são obrigatórios' });

    try {
        // Buscar questões do simulado (assumindo que examId referencia questões usadas)
        const { data: questions, error } = await supabase.from('questions').select('*'); // Filtrar por examId se aplicável
        if (error) throw error;

        // Calcular pontuação
        const score = calculateScore(answers, questions);
        await recordUserScore(userId, score);

        res.json({ success: true, score });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao registrar pontuação' });
    }
};

const generatePDF = questions => {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(16).text('Simulador de Provas', { align: 'center' });
        doc.moveDown();

        questions.forEach((q, i) => {
            doc.fontSize(12).text(`Questão ${i + 1}: ${q.question}`);
            const options = [q.correct_answer, ...q.incorrect_answers];
            options.forEach((opt, j) => doc.text(`${String.fromCharCode(65 + j)}. ${opt}`));
            doc.moveDown();
        });

        doc.end();
    });
};

const parseAIQuestions = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const questions = [];
    let currentQuestion = null;

    lines.forEach(line => {
        if (line.match(/^\d+\./)) {
            if (currentQuestion) questions.push(currentQuestion);
            currentQuestion = { question: line, options: [], correct_answer: null };
        } else if (line.match(/^[a-d]\)/)) {
            currentQuestion.options.push(line);
            if (line.includes('(correta)')) currentQuestion.correct_answer = line;
        }
    });
    if (currentQuestion) questions.push(currentQuestion);
    return questions;
};

const calculateScore = (answers, questions) => {
    let score = 0;
    questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) score += 10;
    });
    return score;
};