import express from 'express';
import { handleGenerateLessonPlan } from './lessonPlansController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/generate', logger, authenticate, handleGenerateLessonPlan);
export default router;