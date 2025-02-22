import { generateLessonPlan } from './lessonPlansService.js';

export const handleGenerateLessonPlan = async (req, res) => {
    const { subject, additionalInstructions } = req.body;
    if (!subject) return res.status(400).json({ success: false, error: 'Assunto é obrigatório' });

    try {
        const result = await generateLessonPlan(subject, additionalInstructions);
        res.json({ plan: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao gerar plano de aula' });
    }
};