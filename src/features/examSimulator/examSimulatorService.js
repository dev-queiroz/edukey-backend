import fetch from 'node-fetch';
import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';
import { supabase } from '../../common/db.js';

const OTDB_API_URL = 'https://opentdb.com/api.php';

export const getQuestionsFromOTDB = async (category, difficulty, amount, type) => {
    const url = `${OTDB_API_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Erro na OTDB');
    return data.results.map(q => ({
        question: Buffer.from(q.question, 'base64').toString(),
        correct_answer: Buffer.from(q.correct_answer, 'base64').toString(),
        incorrect_answers: q.incorrect_answers.map(a => Buffer.from(a, 'base64').toString()),
    }));
};

export const generateExamQuestionsWithAI = async (topic, difficulty, amount, type) => {
    const prompt = `Crie ${amount} questões de ${type} de nível ${difficulty} sobre "${topic}". Cada questão deve ter 4 alternativas, sendo uma correta.`;
    const messages = [
        { role: 'system', content: 'Você é um gerador de questões para provas oficiais.' },
        { role: 'user', content: prompt },
    ];
    return await sendMessageToDeepSeek(messages);
};

export const getCustomQuestions = async (amount) => {
    const { data, error } = await supabase.from('questions').select('*').limit(amount);
    if (error) throw error;
    return data.map(q => ({
        question: q.content,
        correct_answer: q.correctAnswer,
        incorrect_answers: q.options.filter(opt => opt !== q.correctAnswer),
    }));
};