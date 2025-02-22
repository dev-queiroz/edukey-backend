import { supabase } from "../config/supabase";
import { Correction } from "../types/index";
import aiService from "./aiService";
import { extractText } from "../utils/textExtractor";
import Logger from "../utils/logger";

export class ExamService {
    async correctExam(file: Buffer | string, studentId: string, examId: string): Promise<Correction> {
        try {
            const text = await extractText(file);
            const { score, feedback } = await aiService.correctExam(text);

            const { data, error } = await supabase
                .from("corrections")
                .insert({ studentId, examId, correctedText: text, score, feedback })
                .select()
                .single();

            if (error) throw error;
            return data as Correction;
        } catch (error: Error | any) {
            Logger.error("Erro ao corrigir prova", error);
            throw error;
        }
    }
}

export default new ExamService();