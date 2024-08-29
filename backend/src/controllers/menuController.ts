import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import { CreatedChatProps } from "../interfaces";

export const menuController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("Webhook received:", JSON.stringify(req.body, null, 2));

    const data = req.body as CreatedChatProps;
    const messageContent = data.messages[0].content;
    const conversationId = data.id;

    console.log({ messageContent });

    // https://app.chatwoot.com/api/v1/accounts/{account_id}/conversations/{conversation_id}/messages

    axios.post(
      `${config.chatwootApiUrl}/${config.chatwootAccountId}/conversations/${conversationId}/messages`,
      {
        content: "Selecione uma opção a baixo.",
        content_type: "input_select",
        content_attributes: {
          items: [
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
        },
        private: false,
      },
      {
        headers: {
          api_access_token: config.chatwootApiToken,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(200).send("Mensagem enviada com sucesso");
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(500).send("Erro ao enviar mensagem");
  }
};
