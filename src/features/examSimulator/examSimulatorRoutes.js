import express from 'express';
import { generateExam, submitExam } from './examSimulatorController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/generate', logger, authenticate, generateExam);
router.post('/submit', logger, authenticate, submitExam);
export default router;