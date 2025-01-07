"use server"

import { Product } from "@/utils/type";

export const getUserProducts = async (userId: string): Promise<{success: boolean, data?:Product[]}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products/${userId}/user-id`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        const responseJson = await response.json()
        return {success: true, data: responseJson.data}
    } catch (error) {
        console.error("An error occurred while fetch user's products", (error as Error).message)
        return {success: false}
    }
}