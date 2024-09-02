export interface ReturnMenuResponseDTO {
  content: string;
  content_type: string;
  content_attributes?: {
    items: { title: string; description: string, link: string }[];
  }
}
