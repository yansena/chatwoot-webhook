import axios from "axios";
import { config } from "../config";
import { createInteractiveMessage } from "../utils/messageUtils";

export const interactionService = {
  async proccessInteracion(payload: any) {
    const event = payload.event;

    if (event === "conversation_created") {
      const conversationId = payload.id;

      const menu = createInteractiveMessage(
        "input_select",
        "Bem-vindo! Como posso ajudar?",
        [
          { title: "Bonus Roll-over Cassino/Indicação", value: "bonus" },
          { title: "Roll-over Primeiro Deposito", value: "rollover_saldo" },
          { title: "Roll-over Primeiro Deposito", value: "rollover_saldo" },
          {
            title: "Bonus Roll-over Apostas esportivas",
            value: "rollover_apostas",
          },
          { title: "O que é roll-over", value: "rollover" },
          { title: "Limite de deposito/saque", value: "limite_deposito" },
          { title: "Nossos Eventos", value: "eventos" },
        ],
      );

      return await this.sendMessage(conversationId, menu);
    }

    if (
      event === "message_updated" &&
      payload.content_type === "input_select" &&
      payload.content_attributes.submitted_values
    ) {
      const selectedOption =
        payload.content_attributes.submitted_values[0].value;
      const conversationId = payload.conversation.id;

      if (selectedOption === "rollover") {
      }
      switch (selectedOption) {
        case "bonus":
          await this.sendMessage(conversationId, {
            content: "O bonus é...",
          });
          return await this.secondMenu(conversationId);
        case "rollover_saldo":
          await this.sendMessage(conversationId, {
            content: "O rollover é...",
          });
          return await this.secondMenu(conversationId);
        case "saldo":
          await this.sendMessage(conversationId, {
            content: "O saldo é...",
          });
          return await this.secondMenu(conversationId);
        case "falar_atendente":
          return await this.assignToTeam(conversationId);

        case "duvida_resolvida":
          return await this.closeConversation(conversationId);

        case "retornar_menu":
          const menu = createInteractiveMessage(
            "input_select",
            "Como posso ajudar?",
            [
              { title: "Bonus Roll-over Cassino/Indicação", value: "bonus" },
              { title: "Roll-over Primeiro Deposito", value: "rollover_saldo" },
              {
                title: "Bonus Roll-over Apostas esportivas",
                value: "rollover_apostas",
              },
              { title: "O que é roll-over", value: "rollover" },
              { title: "Limite de deposito/saque", value: "limite_deposito" },
              { title: "Nossos Eventos", value: "eventos" },
            ],
          );
          return await this.sendMessage(conversationId, menu);
        default:
          return await this.sendMessage(conversationId, {
            content: "Não entendi, pode repetir?",
          });
      }
    }
  },

  async secondMenu(conversationId: number) {
    const menu = createInteractiveMessage(
      "input_select",
      "Essa resposta resolveu a sua dúvida?",
      [
        { title: "Sim, resolveu minha duvida", value: "duvida_resolvida" },
        { title: "Não, quero falar com atendente", value: "falar_atendente" },
        { title: "Retornar ao Menu Inicial", value: "retornar_menu" },
      ],
    );

    return await this.sendMessage(conversationId, menu);
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
      console.error("Error sending message:", error);
      throw error;
    }
  },

  //https://app.chatwoot.com/api/v1/accounts/{account_id}/conversations/{conversation_id}/toggle_status

  async assignToTeam(conversationId: number) {
    try {
      const response = await axios.post(
        `${config.chatwootApiUrl}/${config.chatwootAccountId}/conversations/${conversationId}/assignments`,
        { team_id: 1 },
        {
          headers: {
            api_access_token: config.chatwootApiToken,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning to team:", error);
      throw error;
    }
  },
  //https://app.chatwoot.com/api/v1/accounts/{account_id}/conversations/{conversation_id}/assignments

  async closeConversation(conversationId: number) {
    try {
      const response = await axios.post(
        `${config.chatwootApiUrl}/${config.chatwootAccountId}/conversations/${conversationId}/toggle_status`,
        { status: "resolved" },
        {
          headers: {
            api_access_token: config.chatwootApiToken,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error closing conversation:", error);
      throw error;
    }
  },
};
