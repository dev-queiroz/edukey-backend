import express from 'express';
import { handleRecordScore, handleGetLeaderboard, handleRegisterChallenge } from './gamificationController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/record-score', logger, authenticate, handleRecordScore);
router.get('/leaderboard', logger, authenticate, handleGetLeaderboard);
router.post('/register-challenge', logger, authenticate, handleRegisterChallenge);
export default router;