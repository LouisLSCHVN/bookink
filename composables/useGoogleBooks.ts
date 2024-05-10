const API_KEY = "AIzaSyB8aAhBXHhMpzeGDhFcRXJJJh5OwM_RttQ";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

/**
 * Check if KEY is defined
 * @memberof Book
 */
function checkKey(): void {
  console.log(API_KEY);
  if (!API_KEY) throw new Error("KEY is not defined");
}

function useURL(params: string): string {
  return `${BASE_URL}${params}&hl=en&lang=en&key=${API_KEY}`;
}

const getBookByISBN = async (isbn: string) => {
  checkKey();
  const res = await $fetch(useURL(`isbn:${isbn}`));
  return res;
};

const getBookByTitle = async (title: string) => {
  checkKey();
  const res = await $fetch(useURL(`intitle:${title}&orderBy=relevance`));
  return res;
};

const getBookById = async (id: string) => {
  checkKey();
  const res = await $fetch(`${BASE_URL}/${id}&key=${API_KEY}`);
  return res;
};

export const useGoogleBooks = () => {
  return {
    useURL,
    checkKey,
    getBookByISBN,
    getBookByTitle,
    getBookById,
  };
};
