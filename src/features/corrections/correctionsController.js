import { correctEnemEssay } from './correctionsService.js';

export const handleCorrectEssay = async (req, res) => {
    const { essayText } = req.body;
    if (!essayText) return res.status(400).json({ success: false, error: 'Texto da redação é obrigatório' });

    try {
        const result = await correctEnemEssay(essayText);
        res.json({ correction: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao corrigir redação' });
    }
};