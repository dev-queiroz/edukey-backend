import fetch from 'node-fetch';
import { config } from './config.js';

const DEEPSEEK_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const sendMessageToDeepSeek = async (messages, model = 'deepseek/deepseek-chat') => {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.openRouterApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model, messages }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Erro na comunicação com a IA.');
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Erro em DeepSeek:', error);
        throw error;
    }
};