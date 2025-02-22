import dotenv from 'dotenv';

dotenv.config();

export const config = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    mamboApiUrl: process.env.MAMBO_API_URL,
    mamboApiKey: process.env.MAMBO_API_KEY,
    port: process.env.PORT || 3000,
};