export interface MenuItem {
  name: string;
  content: string;
  type: "input_select"; // Assumindo que o tipo é sempre "input_select"
  options: Option[];
}

interface Option {
  title: string;
  value: string;
  response: Response;
}

interface Response {
  responseType: "text" | "articles"; // Tipos de resposta possíveis
  content: string;
}
