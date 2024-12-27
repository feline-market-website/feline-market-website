"use server"

import { cookies } from 'next/headers'

export const logout = async (): Promise<{success:boolean, message: string}> => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('access_token')
        return {success: true, message: 'Logout successfully'}
    } catch {
        return {success: false, message: 'Logout fail'}
    }
}