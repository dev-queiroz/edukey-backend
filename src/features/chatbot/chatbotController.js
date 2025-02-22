import { sendChatMessage } from './chatbotService.js';

export const handleChatMessage = async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Mensagem é obrigatória' });

    try {
        const response = await sendChatMessage(message);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao processar mensagem' });
    }
};