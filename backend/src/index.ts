import express from "express";
import webhookRoutes from "./routes/webhook";
import { config } from "./config";
import { logger } from "./middleware/logger";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", webhookRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
