
"use server"

export interface InputInterface {
    user_id: string;
    name: string;
    description: string;
    logo_url: string;
}
export const createVendorRequest = async (data: InputInterface) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/vendors` , {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        })
        if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message;
            throw new Error(errorMessage)
        }
        return {success: true, message: "Vendor has created successfully"}
    } catch (error) {
        return {success: false, message: `Internal error: ${(error as Error).message}`}
    }
}