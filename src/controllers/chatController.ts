import { Request, Response } from "express";
import chatService from "../services/chatService";
import Logger from "../utils/logger";

export const getChatResponse = async (req: Request, res: Response) => {
    try {
        const { studentId, question, context } = req.body;
        if (!studentId || !question || !context) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const response = await chatService.getResponse(studentId, question, context);
        res.status(200).json(response);
    } catch (error: Error | any) {
        Logger.error("Erro no controlador de chat", error);
        res.status(500).json({ error: "Erro ao processar mensagem do chat" });
    }
};
