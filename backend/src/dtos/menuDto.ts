export interface CreateMenuDTO {
  name: string;
  content: string;
  type?: string;
  options: { title: string; value: string; response: { responseType: string; content: any } }[];
}


export interface ReturnMenuDTO {
  content: string;
  content_type?: string;
  content_attributes: {
    items: { title: string; value: string }[];
  }
}
