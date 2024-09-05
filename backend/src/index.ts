import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";

import { config } from "./config";
import { logger } from "./middleware/logger";
import { authenticateJWT } from "./middleware/auth";
import webhookRoutes from "./routes/webhook";
import menuRoutes from "./routes/menuRoutes";
import { AppDataSource } from "./data-source";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // the frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.use("/api", webhookRoutes);

app.use("/api/menu", menuRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    app.listen(config.port, () => {
      console.log(`Servidor rodando na porta ${config.port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco de dados:", error));

// app.listen(config.port, () => {
//   console.log(`Server is running on port ${config.port}`);
// });
