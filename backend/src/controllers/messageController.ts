import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import { MessageUpdatedProps } from "../interfaces";

export const messageController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // console.log(JSON.stringify(req.body, null, 2));

  const data = req.body;
  const messageContent = data.conversation.messages[0].content;
  const conversationId = data.conversation.id;

  // axios.post(
  //   `${config.chatwootApiUrl}/${config.chatwootAccountId}/conversations/${conversationId}/messages`,
  //   {},
  // );
};
