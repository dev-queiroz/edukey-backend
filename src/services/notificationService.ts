import { supabase } from "../config/supabase";
import { Notification } from "../types/index";
import Logger from "../utils/logger";

export class NotificationService {
    async sendNotification(userId: string, message: string): Promise<Notification> {
        try {
            const { data, error } = await supabase
                .from("notifications")
                .insert({ userId, message })
                .select()
                .single();

            if (error) throw error;
            return data as Notification;
        } catch (error: Error | any) {
            Logger.error("Erro ao enviar notificação", error);
            throw error;
        }
    }
}

export default new NotificationService();
