enum MessageType {
  "input_email",
  "cards",
  "input_select",
  "form",
  "article",
}
export interface MenuProps {
  id: number;
  name: string;
  content: string;
  type: MessageType | "input_select"; // Assumindo que o tipo é sempre "input_select"
  options: Option[];
}

interface Option {
  id: number;
  title: string;
  value: string;
  menuResponse: MenuResponse;
}

interface MenuResponse {
  id: number;
  responseType: string;
  content:
    | string
    | { items: { title: string; description: string; link: string }[] };
  value: string;
}
