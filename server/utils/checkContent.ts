const url = "https://vector.profanity.dev";

export const checkContent = async (message: string): Promise<boolean> => {
  const res = await $fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { message },
  });

  console.log(res);
  if (!res) return true;
  console.log((res as { isProfanity: boolean }).isProfanity);
  return !(res as { isProfanity: boolean }).isProfanity;
};
