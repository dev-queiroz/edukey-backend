import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';

export const generateQuestion = async (materialEstudo) => {
    const messages = [
        { role: 'system', content: 'Você é um gerador de questões baseado no material fornecido.' },
        { role: 'user', content: `Crie uma questão de múltipla escolha sobre o seguinte material: ${materialEstudo}. Forneça 4 alternativas, sendo uma correta.` },
    ];
    return await sendMessageToDeepSeek(messages);
};