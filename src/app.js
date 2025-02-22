import express from 'express';
import { standardizeResponse } from './common/middleware.js';
import aiRoutes from './features/ai/aiRoutes.js';
import chatbotRoutes from './features/chatbot/chatbotRoutes.js';
import correctionsRoutes from './features/corrections/correctionsRoutes.js';
import examSimulatorRoutes from './features/examSimulator/examSimulatorRoutes.js';
import gamificationRoutes from './features/gamification/gamificationRoutes.js';
import lessonPlansRoutes from './features/lessonPlans/lessonPlansRoutes.js';
import questionsRoutes from './features/questions/questionsRoutes.js';

const app = express();

// Middlewares globais
app.use(express.json());
app.use(standardizeResponse);

// Rotas da API
app.use('/api/ai', aiRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/corrections', correctionsRoutes);
app.use('/api/exam-simulator', examSimulatorRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/lesson-plans', lessonPlansRoutes);
app.use('/api/questions', questionsRoutes);

// Rota de boas-vindas
app.get('/api', (req, res) => res.json({ message: 'Bem-vindo ao backend educacional!' }));

export default app;