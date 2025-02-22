import { supabase } from "../config/supabase";
import { LessonPlan } from "../types/index";
import aiService from "./aiService";
import Logger from "../utils/logger";
import PDFDocument from "pdfkit";

export class LessonPlanService {
    async generateLessonPlan(
        teacherId: string,
        topic: string,
        grade: string, // Ex.: "7º ano Fundamental" ou "1º ano Médio"
        duration: number // Duração em minutos
    ): Promise<{ lessonPlan: LessonPlan; pdfUrl: string }> {
        try {
            // Prompt ajustado para a série
            const prompt = `
        Crie um plano de aula em português para o tema "${topic}" voltado para o ${grade}.
        Inclua:
        - Tema
        - Objetivo específico para o nível escolar
        - Resumo (máximo 100 palavras)
        - Atividades detalhadas (o que será feito na aula, ajustado à série)
        Formate a resposta em JSON com as chaves: "theme", "objective", "summary", "activities".
      `;

            const content = await aiService.generateMaterial(prompt, "plano de aula");
            const parsedContent = JSON.parse(content);

            // Salvar no Supabase
            const { data, error } = await supabase
                .from("lesson_plans")
                .insert({ teacherId, content: JSON.stringify(parsedContent) })
                .select()
                .single();

            if (error) throw error;
            const lessonPlan = data as LessonPlan;

            // Gerar PDF
            const pdfBuffer = await this.createPDF(parsedContent, grade, duration);
            const pdfFileName = `lesson_plan_${lessonPlan.id}.pdf`;

            // Upload do PDF para o Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("lesson_plans")
                .upload(pdfFileName, pdfBuffer, { contentType: "application/pdf" });

            if (uploadError) throw uploadError;

            // Obter URL pública do PDF
            const { data: publicUrlData } = supabase.storage
                .from("lesson_plans")
                .getPublicUrl(pdfFileName);

            return { lessonPlan, pdfUrl: publicUrlData.publicUrl };
        } catch (error) {
            Logger.error("Erro ao gerar plano de aula", error);
            throw error;
        }
    }

    private async createPDF(content: any, grade: string, duration: number): Promise<Buffer> {
        return new Promise((resolve) => {
            const doc = new PDFDocument({ size: "A4", margin: 50 });
            const buffers: Buffer[] = [];

            doc.on("data", (chunk) => buffers.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffers)));

            // Estilização do PDF
            doc.fontSize(20).text("Plano de Aula", { align: "center" });
            doc.fontSize(12).text(`Série: ${grade} | Duração: ${duration} minutos`, { align: "center" });
            doc.moveDown();

            doc.fontSize(16).text("Tema", { underline: true });
            doc.fontSize(12).text(content.theme, { align: "justify" });
            doc.moveDown();

            doc.fontSize(16).text("Objetivo", { underline: true });
            doc.fontSize(12).text(content.objective, { align: "justify" });
            doc.moveDown();

            doc.fontSize(16).text("Resumo", { underline: true });
            doc.fontSize(12).text(content.summary, { align: "justify" });
            doc.moveDown();

            doc.fontSize(16).text("Atividades", { underline: true });
            doc.fontSize(12).text(content.activities, { align: "justify" });

            doc.end();
        });
    }
}

export default new LessonPlanService();