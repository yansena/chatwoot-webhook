export interface CreatedChatProps {
  aditional_attributes: AdditionalAttributes;
  can_reply: boolean;
  channel: string;
  contact_inbox: ContactInbox;
  id: number;
  inbox_id: number;
  messages: Message[];
  labels: unknown[];
  meta: Meta;
  status: string;
  custom_attributes: Record<string, unknown>;
  snoozed_until: unknown;
  unread_count: number;
  first_reply_created_at: string;
  priority: string;
  waiting_since: BigInt;
  agent_last_seen_at: number | Date;
  contact_last_seen_at: number | Date;
  last_activity_at: number | Date;
  timestamp: number | Date;
  created_at: number | Date;
  events: string;
}

interface AdditionalAttributes {
  browser?: {
    device_name: string;
    browser_name: string;
    platform_name: string;
    browser_version: string;
    platform_version: string;
  };
  referer?: string | null;
  initiated_at?: {
    timestamp: string;
  };
  browser_language?: string;
}

interface ContactInbox {
  id: number;
  contact_id: number;
  inbox_id: number;
  source_id: string;
  created_at: string; // Formato ISO 8601
  updated_at: string; // Formato ISO 8601
  hmac_verified: boolean;
  pubsub_token: string;
}

interface MessageContentAttributes {
  attachment?: {
    file_type: string;
    url: string;
    thumb_url?: string;
  };
  emojis?: string[];
}

interface Message {
  id: number;
  content: string;
  account_id: number;
  inbox_id: number;
  conversation_id: number;
  message_type: number;
  created_at: number; // Timestamp em segundos
  updated_at: string; // Formato ISO 8601
  private: boolean;
  status: string;
  source_id: string | null;
  content_type: string;
  content_attributes: MessageContentAttributes;
  sender_type: string;
  sender_id: number;
  external_source_ids: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  additional_attributes: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  processed_message_content?: string;
  sentiment?: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  conversation?: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  sender?: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
}

interface SenderMeta {
  additional_attributes: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  custom_attributes: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
  email: string | null;
  id: number;
  identifier: string | null;
  name: string;
  phone_number: string | null;
  thumbnail: string;
  type: string;
}

interface Meta {
  sender: SenderMeta;
  assignee: unknown | null;
  team: unknown | null;
  hmac_verified: boolean;
}

// interface ConversationEvent {
//   additional_attributes: AdditionalAttributes;
//   can_reply: boolean;
//   channel: string;
//   contact_inbox: ContactInbox;
//   id: number;
//   inbox_id: number;
//   messages: Message[];
//   labels: unknown[]; // Array vazio ou com tipo desconhecido
//   meta: Meta;
//   status: string;
//   custom_attributes: Record<string, unknown>; // Dicionário vazio ou com chaves desconhecidas
//   snoozed_until: unknown | null;
//   unread_count: number;
//   first_reply_created_at: unknown | null;
//   priority: unknown | null;
//   waiting_since: number; // Timestamp em segundos
//   agent_last_seen_at: number; // Timestamp em segundos
//   contact_last_seen_at: number; // Timestamp em segundos
//   last_activity_at: number; // Timestamp em segundos
//   timestamp: number; // Timestamp em segundos
//   created_at: number; // Timestamp em segundos
//   event: string;
// }
