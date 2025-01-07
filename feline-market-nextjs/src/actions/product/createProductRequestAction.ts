"use server"
interface CreateData {
    name: string;
    description: string;
    price: number;
    stock: number;
}
export const createProductRequest = async (vendorId: string, data: CreateData): Promise<{success: boolean, message: string}> => {
    try {
        const bodyData = {
            vendor_id: vendorId,
            ...data
        }
        const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(bodyData)
        }
    )
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }
    return {success: true, message: "Your product has created successfully"}
    } catch (error) {
        return {success: false, message: (error as Error).message}
    }
}