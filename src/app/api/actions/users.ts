'use server'

import { updateUser } from "@/lib/userServices"

export async function putUser(id: number , formData) {
    const response = await updateUser(id, formData.formData)
    console.log(response);
    return response
    
}