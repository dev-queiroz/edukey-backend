import { Request, Response } from "express";
import gamificationService from "../services/gamificationService";
import Logger from "../utils/logger";

export const updateScore = async (req: Request, res: Response) => {
    try {
        const { studentId, points } = req.body;
        if (!studentId || typeof points !== "number") {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes ou inválidos" });
        }

        const score = await gamificationService.updateScore(studentId, points);
        res.status(200).json(score);
    } catch (error: Error | any) {
        Logger.error("Erro no controlador de gamificação", error);
        res.status(500).json({ error: "Erro ao atualizar pontuação" });
    }
};
