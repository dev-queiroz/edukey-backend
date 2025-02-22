import { supabase } from "../config/supabase";
import { PerformanceReport } from "../types/index";
import Logger from "../utils/logger";

export class PerformanceService {
    async getPerformance(studentId: string): Promise<PerformanceReport> {
        try {
            const { data, error } = await supabase
                .from("corrections")
                .select("score, topic_id")
                .eq("studentId", studentId);

            if (error) throw error;

            const topics: Record<string, number> = {};
            let totalScore = 0;
            data.forEach((correction: any) => {
                topics[correction.topic_id] = (topics[correction.topic_id] || 0) + correction.score;
                totalScore += correction.score;
            });

            const averageScore = totalScore / (data.length || 1);
            return { studentId, topics, averageScore };
        } catch (error) {
            Logger.error("Erro ao gerar relatório de desempenho", error);
            throw error;
        }
    }
}

export default new PerformanceService();