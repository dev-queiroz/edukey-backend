import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';

export const generateLessonPlan = async (subject, additionalInstructions) => {
    let prompt = `Crie um plano de aula detalhado sobre "${subject}".`;
    if (additionalInstructions?.trim()) prompt += ` Incorpore: ${additionalInstructions}.`;
    prompt += ' Inclua objetivos, atividades, recursos, avaliação e adaptações pedagógicas.';

    const messages = [
        { role: 'system', content: 'Você é um planejador educacional experiente.' },
        { role: 'user', content: prompt },
    ];
    return await sendMessageToDeepSeek(messages);
};