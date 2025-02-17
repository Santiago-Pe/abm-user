import { User, UsersResponse } from "@/app/types/user";

const API_URL = process.env.API_URL;
const SECTOR = process.env.SECTOR;


export const getUsers = async (limit?: number, page?: number, paginate: boolean = true): Promise<UsersResponse> => {
  let url = `${API_URL}?sector=${SECTOR}`;
  
  if (paginate && limit !== undefined && page !== undefined) {
    url += `&_limit=${limit}&_page=${page}`;
  }

  const response = await fetch(url, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const totalRecords = parseInt(response.headers.get('X-Total-Count') ?? '0', 10);
  const users = await response.json();

  return {
    users,
    totalRecords,
  };
};
export const getUser = async (userId: number | string): Promise<UsersResponse> => {
  let url = `${API_URL}/${userId}?sector=${SECTOR}`;
  
  const response = await fetch(url, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = await response.json();

  return users
};
export const createUser = async (userData: Partial<User>) => {

  let url = `${API_URL}?sector=${SECTOR}`
  const response = await fetch(url, {
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
  let url = `${API_URL}/${userId}?sector=${SECTOR}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });


  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return await response.json();
};
export const deleteUser = async (userId: number | string): Promise<void> => {
  let url = `${API_URL}/${userId}?sector=${SECTOR}`;
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return await response.json();
};