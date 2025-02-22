import * as dotenv from "dotenv";
import Logger from "../utils/logger";

dotenv.config();

function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name];
  if (!value && required) {
    Logger.error(`Variavel de ambiente ${name} nao encontrada`);
    throw new Error(`Variavel de ambiente ${name} a obrigataria`);
  }
  return value || "";
}

export const SUPABASE_URL = getEnvVar("SUPABASE_URL");
export const SUPABASE_KEY = getEnvVar("SUPABASE_KEY");
export const PORT = getEnvVar("PORT", false) || "3000";

Logger.info("Variaveis de ambiente carregadas com sucesso");
