import { Request, Response } from "express";
import questionService from "../services/questionService";
import Logger from "../utils/logger";

export const generateQuestions = async (req: Request, res: Response) => {
    try {
        const { material, type, difficulty, count, createdBy } = req.body;
        if (!material || !type || !difficulty || !count || !createdBy) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const questions = await questionService.generateQuestions(material, type, difficulty, count, createdBy);
        res.status(200).json(questions);
    } catch (error: Error | any) {
        Logger.error("Erro no controlador de geração de questões", error);
        res.status(500).json({ error: "Erro ao gerar questões" });
    }
};