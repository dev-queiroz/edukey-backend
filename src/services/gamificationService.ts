import { supabase } from "../config/supabase";
import { Score } from "../types/index";
import Logger from "../utils/logger";

export class GamificationService {
    async updateScore(studentId: string, points: number): Promise<Score> {
        try {
            const { data, error } = await supabase
                .from("scores")
                .upsert({ studentId, points }, { onConflict: "studentId" })
                .select()
                .single();

            if (error) throw error;
            return data as Score;
        } catch (error) {
            Logger.error("Erro ao atualizar pontuação", error);
            throw error;
        }
    }
}

export default new GamificationService();