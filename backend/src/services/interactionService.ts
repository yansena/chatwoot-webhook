import axios from "axios";
import { config } from "../config";
import { createInteractiveMessage } from "../utils/messageUtils";

export const interactionService = {
  async proccessInteracion(payload: any) {
    const event = payload.event;

    if (event === "conversation_created") {
      const conversationId = payload.id;
      const initialMessage = payload.messages[0].content;

      const menu = createInteractiveMessage(
        "input_select",
        "Bem-vindo! Como posso ajudar?",
        [
          { title: "Bonus Roll-over Cassino/Indicação", value: "bonus" },
          { title: "Roll-over Primeiro Deposito", value: "rollover_saldo" },
        ],
      );

      return await this.sendMessage(conversationId, menu);
    }

    if (
      event === "message_updated" &&
      payload.content_type === "input_select"
    ) {
      const selectedOption =
        payload.content_attributes.submitted_values[0].value;
      const conversationId = payload.conversation.id;

      if (selectedOption === "rollover") {
      }
      switch (selectedOption) {
        case "bonus":
          return await this.sendMessage(conversationId, {
            content: "O bonus é...",
          });
        case "rollover_saldo":
          return await this.sendMessage(conversationId, {
            content: "O rollover é...",
          });
        case "saldo":
          return await this.sendMessage(conversationId, {
            content: "O saldo é...",
          });
          break;
        default:
          return await this.sendMessage(conversationId, {
            content: "Não entendi, pode repetir?",
          });
      }
    }
  },

  async sendMessage(conversationId: number, message: any) {
    try {
      const response = await axios.post(
        `${config.chatwootApiUrl}/${config.chatwootAccountId}/conversations/${conversationId}/messages`,
        message,
        {
          headers: {
            api_access_token: config.chatwootApiToken,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  },
};
