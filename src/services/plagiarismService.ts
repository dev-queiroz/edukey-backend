import { supabase } from "../config/supabase";
import { StudentResponse } from "../types/index";
import aiService from "./aiService";
import Logger from "../utils/logger";

export class PlagiarismService {
    async checkPlagiarism(studentId: string, content: string): Promise<StudentResponse> {
        try {
            const { isPlagiarized, source } = await aiService.checkPlagiarism(content);
            const { data, error } = await supabase
                .from("student_responses")
                .insert({ studentId, content, isPlagiarized, plagiarismSource: source })
                .select()
                .single();

            if (error) throw error;
            return data as StudentResponse;
        } catch (error: Error | any) {
            Logger.error("Erro ao verificar plágio", error);
            throw error;
        }
    }
}

export default new PlagiarismService();