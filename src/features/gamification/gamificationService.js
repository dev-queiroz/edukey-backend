import { supabase } from '../../common/db.js';

// Registrar pontuação de um usuário
export const recordUserScore = async (userId, points) => {
    const { data, error } = await supabase
        .from('user_scores')
        .select('score')
        .eq('userId', userId)
        .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116: registro não encontrado

    const currentScore = data ? data.score : 0;
    const newScore = currentScore + points;

    const { error: updateError } = await supabase
        .from('user_scores')
        .upsert({ userId, score: newScore }, { onConflict: 'userId' });

    if (updateError) throw updateError;
    return { userId, score: newScore };
};

// Obter o leaderboard (ranking)
export const getLeaderboard = async (limit = 10) => {
    const { data, error } = await supabase
        .from('user_scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
};

// Registrar um novo desafio
export const registerChallenge = async (challengeData) => {
    const { data, error } = await supabase
        .from('challenges')
        .insert([challengeData]);

    if (error) throw error;
    return data[0];
};

// Verificar se um usuário completou um desafio (exemplo simplificado)
export const checkChallengeCompletion = async (userId, challengeId) => {
    const { data: challenge, error: challengeError } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', challengeId)
        .single();
    if (challengeError) throw challengeError;

    // Lógica para verificar se o usuário completou o desafio
    if (challenge.condition.type === 'create_questions') {
        const { count, error } = await supabase
            .from('questions')
            .select('*', { count: 'exact' })
            .eq('createdBy', userId);
        if (error) throw error;
        if (count >= challenge.condition.amount) {
            await recordUserScore(userId, challenge.points);
            return true;
        }
    }
    return false;
};