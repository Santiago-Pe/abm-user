'use server'

import { User } from "@/app/types/user"
import { createUser, updateUser } from "@/lib/userServices"

export async function putUser(id: number, formData : Partial<User>) {
    console.log('FROM ACTION PUT USER',formData)
    const response = await updateUser(id, formData)
     console.log('FROM ACTION PUT USER RESPONSE', response)
    return response
    
}
export async function postUser(formData : Partial<User>) {
    console.log('POST USER',formData)
    const response = await createUser(formData)
   console.log('FROM ACTION POST USER RESPONSE', response)
    
    return response
    
}