import { config } from './config.js';

export const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== `Bearer ${config.openRouterApiKey}`) {
        return res.status(401).json({ success: false, error: 'Autenticação inválida' });
    }
    next();
};

export const standardizeResponse = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        return originalJson.call(this, { success: true, data });
    };
    next();
};