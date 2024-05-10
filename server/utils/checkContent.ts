const url = "https://vector.profanity.dev";

export const checkContent = async (content: string): Promise<boolean> => {
  const res = await $fetch(url, {
    method: "POST",
    body: content,
  });

  if (!res) return true;
  console.log((res as { isProfanity: boolean }).isProfanity);
  return (res as { isProfanity: boolean }).isProfanity;
};
