export const parseJsonString = (jsonString: string | null | undefined) => {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch {
    return null;
  }
};
