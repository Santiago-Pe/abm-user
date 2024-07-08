const API_URL = process.env.API_URL
const SECTOR = process.env.SECTOR

export const getUsers = async (limit: number, page: number) => {
  const response = await fetch(`${API_URL}?sector=${SECTOR}&_limit=${limit}&_page=${page}`, {cache: 'no-store'});
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};
