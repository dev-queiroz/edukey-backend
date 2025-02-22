import axios from "axios";
import Logger from "../utils/logger";

export class AIService {
  private apiUrl: string = "http://localhost:11434/api/generate";

  async correctExam(text: string): Promise<{ score: number; feedback: string }> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: "llama2",
        prompt: `Corrija esta prova ou redação e forneça feedback detalhado em português: ${text}`,
        stream: false,
        max_tokens: 500,
      });
      const result = JSON.parse(response.data.response);
      return {
        score: result.score || 85,
        feedback: result.feedback || "Bom trabalho, mas revise a gramática.",
      };
    } catch (error: Error | any) {
      Logger.error("Erro ao corrigir prova com Ollama", error);
      throw error;
    }
  }

  async generateQuestions(
    material: string,
    type: string,
    difficulty: string,
    count: number
  ): Promise<string[]> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: "llama2",
        prompt: `Gere ${count} questões de ${type} com dificuldade ${difficulty} baseadas neste material em português: ${material}`,
        stream: false,
        max_tokens: 1000,
      });
      const result = response.data.response.split("\n").filter((q: string) => q.trim());
      return result.length ? result : ["Questão padrão"];
    } catch (error: Error | any) {
      Logger.error("Erro ao gerar questões com Ollama", error);
      throw error;
    }
  }

  async chatResponse(question: string, context: string): Promise<string> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: "llama2",
        prompt: `Responda como tutor educacional em português: ${question}. Contexto: ${context}`,
        stream: false,
        max_tokens: 300,
      });
      return response.data.response || "Desculpe, não entendi sua dvida.";
    } catch (error: Error | any) {
      Logger.error("Erro ao responder chat com Ollama", error);
      throw error;
    }
  }

  async checkPlagiarism(text: string): Promise<{ isPlagiarized: boolean; source?: string }> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: "llama2",
        prompt: `Verifique se este texto contém plágio em português: ${text}`,
        stream: false,
        max_tokens: 200,
      });
      const result = JSON.parse(response.data.response || "{}");
      return {
        isPlagiarized: result.isPlagiarized || false,
        source: result.source || undefined,
      };
    } catch (error: Error | any) {
      Logger.error("Erro ao verificar plágio com Ollama", error);
      throw error;
    }
  }

  async generateMaterial(content: string, type: string): Promise<string> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: "llama2",
        prompt: `Crie um ${type} baseado neste conteúdo em português: ${content}`,
        stream: false,
        max_tokens: 500,
      });
      return response.data.response || "Resumo padrão";
    } catch (error: Error | any) {
      Logger.error("Erro ao gerar material com Ollama", error);
      throw error;
    }
  }
}

export default new AIService();
