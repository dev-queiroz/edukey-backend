import express from 'express';
import { gerarQuestao } from './aiController.js';
import { logger, authenticate } from '../../common/middleware.js';

const router = express.Router();
router.post('/gerar-questao', logger, authenticate, gerarQuestao);
export default router;