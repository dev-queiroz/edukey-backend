import { supabase } from "../config/supabase";
import { AccessibleContent } from "../types/index";
import Logger from "../utils/logger";

export class AccessibilityService {
    async generateAudio(text: string, originalId: string): Promise<AccessibleContent> {
        try {
            // Placeholder para TTS (ex.: usar gTTS localmente no futuro)
            const audioContent = Buffer.from(text); // Simulação
            const { data, error } = await supabase
                .from("accessible_content")
                .insert({ originalId, type: "audio", content: audioContent })
                .select()
                .single();

            if (error) throw error;
            return data as AccessibleContent;
        } catch (error: Error | any) {
            Logger.error("Erro ao gerar áudio", error);
            throw error;
        }
    }
}

export default new AccessibilityService();