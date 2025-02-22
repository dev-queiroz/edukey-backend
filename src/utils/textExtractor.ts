import Tesseract from "tesseract.js";

// Interface para opções de extração
interface ExtractOptions {
    lang?: string; // Idioma para OCR (padrão: português)
}

// Função para extrair texto de diferentes tipos de entrada
export async function extractText(input: string | Buffer, options: ExtractOptions = {}): Promise<string> {
    const { lang = "por" } = options;

    try {
        // Caso o input seja uma string (texto puro)
        if (typeof input === "string") {
            return input;
        }

        // Caso o input seja um Buffer (imagem)
        if (input instanceof Buffer) {
            const { data: { text } } = await Tesseract.recognize(input, lang);
            return text;
        }

        throw new Error("Formato de entrada não suportado");
    } catch (error) {
        console.error("Erro ao extrair texto:", error);
        throw error;
    }
}