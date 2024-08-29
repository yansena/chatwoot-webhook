export const webhookService = {
  async processWebhook(data: any) {
    // Processa o webhook e retorna a resposta
    const messageContent = data.content;
    // Lógica de resposta do bot
    return { message: "Processed webhook successfully" };
  },
  // Outros métodos para outros tipos de processamento
};
