import { supabase } from "../config/supabase";
import { Simulation } from "../types/index";
import Logger from "../utils/logger";

export class SimulationService {
    async createSimulation(studentId: string, questionIds: string[]): Promise<Simulation> {
        try {
            const { data, error } = await supabase
                .from("simulations")
                .insert({ studentId, questionIds })
                .select()
                .single();

            if (error) throw error;
            return data as Simulation;
        } catch (error: Error | any) {
            Logger.error("Erro ao criar simulação", error);
            throw error;
        }
    }
}

export default new SimulationService();