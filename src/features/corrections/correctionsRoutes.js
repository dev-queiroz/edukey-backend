import express from 'express';
import { handleCorrectEssay } from './correctionsController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/correct-essay', logger, authenticate, handleCorrectEssay);
export default router;