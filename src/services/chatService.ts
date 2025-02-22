import { supabase } from "../config/supabase";
import { ChatMessage } from "../types/index";
import aiService from "./aiService";
import Logger from "../utils/logger";

export class ChatService {
    async getResponse(studentId: string, question: string, context: string): Promise<ChatMessage> {
        try {
            const response = await aiService.chatResponse(question, context);
            const { data, error } = await supabase
                .from("chat_history")
                .insert({ studentId, question, response })
                .select()
                .single();

            if (error) throw error;
            return data as ChatMessage;
        } catch (error: Error | any) {
            Logger.error("Erro ao processar mensagem do chat", error);
            throw error;
        }
    }
}

export default new ChatService();