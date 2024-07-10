import { User } from "@/app/types/user";

const API_URL = process.env.API_URL
const SECTOR = process.env.SECTOR

export const getUsers = async (limit: number, page: number) => {
  const response = await fetch(`${API_URL}?sector=${SECTOR}&_limit=${limit}&_page=${page}`, {cache: 'no-store'});
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};
export const createUser = async (userData: Partial<User>) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return await response.json();
};
export const updateUser = async (userId: number, userData: Partial<User>) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  console.log(response)
  
  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return await response.json();
};