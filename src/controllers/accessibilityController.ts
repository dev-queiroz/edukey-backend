import { Request, Response } from "express";
import accessibilityService from "../services/accessibilityService";
import Logger from "../utils/logger";

export const generateAccessibleContent = async (req: Request, res: Response) => {
    try {
        const { text, originalId } = req.body;
        if (!text || !originalId) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const content = await accessibilityService.generateAudio(text, originalId);
        res.status(201).json(content);
    } catch (error) {
        Logger.error("Erro no controlador de acessibilidade", error);
        res.status(500).json({ error: "Erro ao gerar conteúdo acessível" });
    }
};
