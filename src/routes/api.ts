import { Router } from "express";
import { correctExam } from "../controllers/examController";
import { getPerformance } from "../controllers/performanceController";
import { generateQuestions } from "../controllers/questionController";
import { createSimulation } from "../controllers/simulationController";
import { getChatResponse } from "../controllers/chatController";
import { updateScore } from "../controllers/gamificationController";
import { shareQuestion } from "../controllers/collaborativeController";
import { checkPlagiarism } from "../controllers/plagiarismController";
import { generateLessonPlan } from "../controllers/lessonPlanController";
import { generateAccessibleContent } from "../controllers/accessibilityController";
import { generateMaterial } from "../controllers/materialController";
import { sendNotification } from "../controllers/notificationController";
import Logger from "../utils/logger";

const router = Router();

// Rotas da API

// Correcao Automcatica com IA
router.post("/correct-exam", correctExam);

// Ancalise de Desempenho Personalizada
router.get("/performance/:studentId", getPerformance);

// Geracao de Questcaes com IA
router.post("/generate-questions", generateQuestions);

// Simulador de Provas Oficiais
router.post("/simulate-exam", createSimulation);

// Chatbot Educacional
router.post("/chat", getChatResponse);

// Gamificacao
router.post("/update-score", updateScore);

// Banco de Questcaes Colaborativo
router.post("/share-question", shareQuestion);

// Deteccao de Plcagio
router.post("/check-plagiarism", checkPlagiarism);

// Sugestcao de Planos de Aula
router.post("/lesson-plan", generateLessonPlan);

// Educacao Inclusiva
router.post("/accessible-content", generateAccessibleContent);

// Gerador de Materiais Didcaticos
router.post("/study-material", generateMaterial);

// Notificacaes Inteligentes
router.post("/notify", sendNotification);

// Log de inicializacao das rotas
Logger.info("Rotas da API configuradas com sucesso");

export default router;
