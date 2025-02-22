import { supabase } from "../config/supabase";
import { StudyMaterial } from "../types/index";
import aiService from "./aiService";
import Logger from "../utils/logger";

export class MaterialService {
    async generateSummary(content: string): Promise<StudyMaterial> {
        try {
            const summary = await aiService.generateMaterial(content, "resumo");
            const { data, error } = await supabase
                .from("study_materials")
                .insert({ type: "summary", content: summary })
                .select()
                .single();

            if (error) throw error;
            return data as StudyMaterial;
        } catch (error) {
            Logger.error("Erro ao gerar resumo", error);
            throw error;
        }
    }
}

export default new MaterialService();