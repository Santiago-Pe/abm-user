'use server'

import { User } from "@/app/types/user"
import { createUser, deleteUser, updateUser } from "@/lib/userServices"

export async function putUser(id: number, formData : Partial<User>) {
    const response = await updateUser(id, formData)

    return response
    
}
export async function postUser(formData : Partial<User>) {
    
    const response = await createUser(formData) 
    return response
    
}
export async function removeUser(id: number) {
 
    const response = await deleteUser(id)
    
    return response
    
}