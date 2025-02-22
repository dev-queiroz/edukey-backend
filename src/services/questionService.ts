import { supabase } from "../config/supabase";
import { Question } from "../types/index";
import aiService from "./aiService";
import Logger from "../utils/logger";

export class QuestionService {
    async generateQuestions(
        material: string,
        type: string,
        difficulty: string,
        count: number,
        createdBy: string
    ): Promise<Question[]> {
        try {
            const questions = await aiService.generateQuestions(material, type, difficulty, count);
            const questionData = questions.map((content) => ({
                content,
                type,
                difficulty,
                topicId: "topic-id",
                createdBy,
                isShared: false,
            }));

            const { data, error } = await supabase
                .from("questions")
                .insert(questionData)
                .select();

            if (error) throw error;
            return data as Question[];
        } catch (error) {
            Logger.error("Erro ao gerar questões", error);
            throw error;
        }
    }
}

export default new QuestionService();