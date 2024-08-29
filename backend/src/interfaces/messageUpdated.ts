export interface MessageUpdatedProps {
  account: { id: number; name: string };
  additional_attributes: {};
  content_attributes: {
    items: InputSelectItem[];
  };
  content_type: string;
  content: string;
  conversation: Conversation;
  created_at: string;
  id: number;
  inbox: { id: number; name: string };
  message_type: string;
  private: boolean;
  sender: {
    id: number;
    name: string;
    email: string;
    type: string;
  };
  source_id: null;
  event: string;
}

interface InputSelectItem {
  title: string;
  value: string;
  description?: string;
}

interface Conversation {
  additional_attributes: {
    browser: any; // Replace 'any' with a more specific type if you know its structure
    referer: null;
    initiated_at: any; // Replace 'any' with a more specific type if you know its structure
    browser_language: string;
  };
  can_reply: boolean;
  channel: string;
  contact_inbox: {
    id: number;
    contact_id: number;
    inbox_id: number;
    source_id: string;
    created_at: string;
    updated_at: string;
    hmac_verified: boolean;
    pubsub_token: string;
  };
  id: number;
  inbox_id: number;
  messages: any[]; // Replace 'any' with a more specific type if you know its structure
  labels: any[]; // Replace 'any' with a more specific type if you know its structure
  meta: {
    sender: any; // Replace 'any' with a more specific type if you know its structure
    assignee: null;
    team: null;
    hmac_verified: boolean;
  };
  status: string;
  custom_attributes: {};
  snoozed_until: null;
  unread_count: number;
  first_reply_created_at: string;
  priority: null;
  waiting_since: number;
  agent_last_seen_at: number;
  contact_last_seen_at: number;
  last_activity_at: number;
  timestamp: number;
  created_at: string;
}
