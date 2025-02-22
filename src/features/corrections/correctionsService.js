import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';

export const correctEnemEssay = async (essayText) => {
    const messages = [
        { role: 'system', content: 'Você é um corretor de redações do ENEM. Forneça feedback detalhado, pontuação e sugestões com base nos critérios do ENEM.' },
        { role: 'user', content: `Corrija esta redação: "${essayText}"` },
    ];
    return await sendMessageToDeepSeek(messages);
};