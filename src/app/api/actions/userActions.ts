'use server'

import { User } from "@/app/types/user"
import { createUser, updateUser } from "@/lib/userServices"

export async function putUser(id: number, formData : Partial<User>) {
  
    const response = await updateUser(id, formData)
    console.log('respuesta del put', response)
    return response
    
}
export async function postUser(formData : Partial<User>) {
   
    const response = await createUser(formData)
    
    return response
    
}