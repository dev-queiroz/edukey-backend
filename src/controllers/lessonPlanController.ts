import { Request, Response } from "express";
import lessonPlanService from "../services/lessonPlanService";
import Logger from "../utils/logger";

export const generateLessonPlan = async (req: Request, res: Response) => {
    try {
        const { teacherId, topic, grade, duration } = req.body;
        if (!teacherId || !topic || !grade || !duration) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes: teacherId, topic, grade, duration" });
        }

        const result = await lessonPlanService.generateLessonPlan(teacherId, topic, grade, duration);
        res.status(201).json({
            lessonPlan: result.lessonPlan,
            pdfUrl: result.pdfUrl,
        });
    } catch (error: Error | any) {
        Logger.error("Erro no controlador de plano de aula", error);
        res.status(500).json({ error: "Erro ao gerar plano de aula" });
    }
};