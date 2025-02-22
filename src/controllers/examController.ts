import { Request, Response } from "express";
import examService from "../services/examService";
import Logger from "../utils/logger";

export const correctExam = async (req: Request, res: Response) => {
    try {
        const { file, studentId, examId } = req.body;
        if (!file || !studentId || !examId) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const correction = await examService.correctExam(file, studentId, examId);
        res.status(200).json(correction);
    } catch (error) {
        Logger.error("Erro no controlador de correção de provas", error);
        res.status(500).json({ error: "Erro ao corrigir prova" });
    }
};