import { generateQuestionFromContent, reformulateQuestion } from './questionsService.js';

export const handleGenerateQuestion = async (req, res) => {
    const { content } = req.body;
    const { userId } = req.user;
    if (!content) return res.status(400).json({ success: false, error: 'Conteúdo é obrigatório' });

    try {
        const result = await generateQuestionFromContent(content, userId);
        res.json({ question: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao gerar questão' });
    }
};

export const handleReformulateQuestion = async (req, res) => {
    const { originalQuestionId } = req.body;
    const { userId } = req.user;
    if (!originalQuestionId) return res.status(400).json({ success: false, error: 'ID da questão original é obrigatório' });

    try {
        const result = await reformulateQuestion(originalQuestionId, userId);
        res.json({ reformulatedQuestion: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao reformular questão' });
    }
};