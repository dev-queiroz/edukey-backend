import { Request, Response } from "express";
import simulationService from "../services/simulationService";
import Logger from "../utils/logger";

export const createSimulation = async (req: Request, res: Response) => {
    try {
        const { studentId, questionIds } = req.body;
        if (!studentId || !questionIds || !Array.isArray(questionIds)) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes ou inválidos" });
        }

        const simulation = await simulationService.createSimulation(studentId, questionIds);
        res.status(201).json(simulation);
    } catch (error: Error | any) {
        Logger.error("Erro no controlador de simulação", error);
        res.status(500).json({ error: "Erro ao criar simulado" });
    }
};
