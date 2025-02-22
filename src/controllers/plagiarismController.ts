import { Request, Response } from "express";
import plagiarismService from "../services/plagiarismService";
import Logger from "../utils/logger";

export const checkPlagiarism = async (req: Request, res: Response) => {
    try {
        const { studentId, content } = req.body;
        if (!studentId || !content) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const response = await plagiarismService.checkPlagiarism(studentId, content);
        res.status(200).json(response);
    } catch (error) {
        Logger.error("Erro no controlador de plágio", error);
        res.status(500).json({ error: "Erro ao verificar plágio" });
    }
};