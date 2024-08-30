import { Request, Response } from "express";
import { interactionService } from "../services/interactionService";

export const webhookController = {
  async handleWebhook(req: Request, res: Response) {
    try {
      const result = await interactionService.proccessInteracion(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
};
