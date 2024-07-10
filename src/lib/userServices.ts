import { User } from "@/app/types/user";

const API_URL = process.env.API_URL;
const SECTOR = process.env.SECTOR;


export const getUsers = async (limit?: number, page?: number, paginate: boolean = true): Promise<UserResponse> => {
  let url = `${API_URL}?sector=${SECTOR}`;
  
  if (paginate && limit !== undefined && page !== undefined) {
    url += `&_limit=${limit}&_page=${page}`;
  }

  const response = await fetch(url, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const totalRecords = parseInt(response.headers.get('X-Total-Count'));
  const users = await response.json();

  return {
    users,
    totalRecords,
  };
};


export const getUser = async (userId?: number | string): Promise<UserResponse> => {
  let url = `${API_URL}/${userId}?sector=${SECTOR}`;
  
 

  const response = await fetch(url, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const totalRecords = parseInt(response.headers.get('X-Total-Count'));
  const users = await response.json();

  return {
    users,
    totalRecords,
  };
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
 
  console.log('FROM SERVICES POST USER RESPONSE', response)
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


   console.log('FROM SERVICES PUT USER RESPONSE', response)
  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return await response.json();
};