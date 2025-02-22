import { Request, Response } from "express";
import performanceService from "../services/performanceService";
import Logger from "../utils/logger";

export const getPerformance = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            return res.status(400).json({ error: "studentId é obrigatório" });
        }

        const report = await performanceService.getPerformance(studentId);
        res.status(200).json(report);
    } catch (error) {
        Logger.error("Erro no controlador de desempenho", error);
        res.status(500).json({ error: "Erro ao gerar relatório de desempenho" });
    }
};