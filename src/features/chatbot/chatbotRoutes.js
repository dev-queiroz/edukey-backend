import express from 'express';
import { handleChatMessage } from './chatbotController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/message', logger, authenticate, handleChatMessage);
export default router;