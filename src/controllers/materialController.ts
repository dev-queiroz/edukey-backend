import { Request, Response } from "express";
import materialService from "../services/materialService";
import Logger from "../utils/logger";

export const generateMaterial = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: "Parâmetro content é obrigatório" });
        }

        const material = await materialService.generateSummary(content);
        res.status(201).json(material);
    } catch (error) {
        Logger.error("Erro no controlador de materiais", error);
        res.status(500).json({ error: "Erro ao gerar material" });
    }
};