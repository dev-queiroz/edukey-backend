import { Request, Response } from "express";
import notificationService from "../services/notificationService";
import Logger from "../utils/logger";

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes" });
        }

        const notification = await notificationService.sendNotification(userId, message);
        res.status(201).json(notification);
    } catch (error) {
        Logger.error("Erro no controlador de notificações", error);
        res.status(500).json({ error: "Erro ao enviar notificação" });
    }
};
