import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';

export const sendChatMessage = async (message) => {
    const messages = [
        { role: 'system', content: 'Você é um assistente educacional útil.' },
        { role: 'user', content: message },
    ];
    return await sendMessageToDeepSeek(messages);
};