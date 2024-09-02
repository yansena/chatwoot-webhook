import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import { menuResponseService } from "../services/menuResponseService";

export const menuResponseController = {


  async getResponse(req: Request, res: Response) {
    try {
      const value = req.params.value;
      const response = await menuResponseService.getResponse(value);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'Response not found' });
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
