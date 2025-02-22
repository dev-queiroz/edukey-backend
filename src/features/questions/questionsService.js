import { sendMessageToDeepSeek } from '../../common/deepSeekService.js';
import { supabase } from '../../common/db.js';
import { recordUserScore } from '../gamification/gamificationService.js';

export const generateQuestionFromContent = async (content, userId) => {
    const messages = [
        { role: 'system', content: 'Você é um criador de questões educacionais de múltipla escolha.' },
        { role: 'user', content: `Crie uma questão de múltipla escolha com 4 alternativas (1 correta) baseada em: ${content}` },
    ];
    const questionText = await sendMessageToDeepSeek(messages);

    const { question, options, correctAnswer } = parseQuestion(questionText);

    const { data, error } = await supabase.from('questions').insert([
        { content: question, options, correctAnswer, createdBy: userId }
    ]);
    if (error) throw error;

    await recordUserScore(userId, 10);

    return data[0];
};

export const reformulateQuestion = async (originalQuestionId, userId) => {
    const { data: original, error: fetchError } = await supabase
        .from('questions')
        .select('*')
        .eq('id', originalQuestionId)
        .single();
    if (fetchError) throw fetchError;

    const messages = [
        { role: 'system', content: 'Você é um especialista em reformular questões educacionais.' },
        { role: 'user', content: `Reformule esta questão para maior clareza e plausibilidade: ${original.content}` },
    ];
    const reformulatedText = await sendMessageToDeepSeek(messages);

    const { question, options, correctAnswer } = parseQuestion(reformulatedText);

    const { data, error } = await supabase
        .from('questions')
        .update({ content: question, options, correctAnswer, updatedBy: userId })
        .eq('id', originalQuestionId);
    if (error) throw error;

    await recordUserScore(userId, 5);

    return data[0];
};

const parseQuestion = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const question = lines[0];
    const options = lines.slice(1, 5);
    const correctAnswer = options[0];
    return { question, options, correctAnswer };
};