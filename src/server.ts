import express, { Express } from "express";
import apiRoutes from "./routes/api";
import { PORT } from "./config/env";
import Logger from "./utils/logger";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api", apiRoutes);

// Rota de saúde (health check)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Servidor rodando" });
});

// Iniciar o servidor
app.listen(PORT, () => {
    Logger.info(`Servidor iniciado na porta ${PORT}`);
});

// Tratamento de erros globais
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.error("Erro não tratado", err);
    res.status(500).json({ error: "Erro interno do servidor" });
});