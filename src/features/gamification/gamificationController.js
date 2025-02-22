import { recordUserScore, getLeaderboard, registerChallenge } from './gamificationService.js';

// Registrar pontuação
export const handleRecordScore = async (req, res) => {
    const { userId, points } = req.body;
    if (!userId || points == null) return res.status(400).json({ success: false, error: 'userId e points são obrigatórios' });

    try {
        const result = await recordUserScore(userId, points);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao registrar pontuação' });
    }
};

// Obter leaderboard
export const handleGetLeaderboard = async (req, res) => {
    const { limit = 10 } = req.query;
    try {
        const leaderboard = await getLeaderboard(limit);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao obter leaderboard' });
    }
};

// Registrar desafio
export const handleRegisterChallenge = async (req, res) => {
    const challengeData = req.body;
    if (!challengeData.title || !challengeData.points || !challengeData.condition) {
        return res.status(400).json({ success: false, error: 'Dados do desafio incompletos' });
    }

    try {
        const result = await registerChallenge(challengeData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao registrar desafio' });
    }
};