import express from 'express';
import { handleGenerateQuestion, handleReformulateQuestion } from './questionsController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/generate', logger, authenticate, handleGenerateQuestion);
router.post('/reformulate', logger, authenticate, handleReformulateQuestion);
export default router;