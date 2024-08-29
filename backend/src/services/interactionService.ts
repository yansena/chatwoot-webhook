import axios from "axios";
import { config } from "../config";
import { createInteractiveMessage } from "../utils/messageUtils";

export const interactionService = {
  async proccessInteracion(payload: any) {
    const event = payload.event;
    const conversationId = event.conversation_id;
  },
};
