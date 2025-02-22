import { generateQuestion } from './aiService.js';

export const gerarQuestao = async (req, res) => {
    const { materialEstudo } = req.body;
    if (!materialEstudo) return res.status(400).json({ success: false, error: 'Material de estudo é obrigatório' });

    try {
        const result = await generateQuestion(materialEstudo);
        res.json({ question: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao gerar questão' });
    }
};