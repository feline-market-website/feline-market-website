"use server"

interface UpdateData {
    name: string;
    description: string;
    logo_url: string;
}

export const updateVendorRequest = async (vendorId: string, updateData: UpdateData ): Promise<{success: boolean, message: string}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/vendors/${vendorId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(updateData)
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        return {success: true, message: "Vendor has updated successfully"}
    } catch (error) {
        return {success: false, message: (error as Error).message}
    }
}