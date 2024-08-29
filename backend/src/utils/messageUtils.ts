export const createInteractiveMessage = (
  type: string,
  title: string,
  options: { title: string; value: string }[],
) => {
  return {
    content_type: type,
    content: title,
    content_attributes: {
      items: options,
    },
  };
};

export const createTextMessage = (
  type: string,
  title: string,
  options: { title: string; value: string }[],
) => {
  return {
    content_type: type,
    content: title,
    content_attributes: {
      items: options,
    },
  };
};
