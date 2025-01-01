"use server";

export const requestUpdateProfile = async (values: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    phone_number?: string;
    shipping_address?: string
}, userProfileId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user-profiles/${userProfileId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: values.first_name,
                last_name: values.last_name,
                avatar_url: values.avatar_url,
                phone_number: values.phone_number,
                shipping_address: values.shipping_address,
            })
        })
        if (!response.ok) {
            throw new Error('An error occurred while updating profile')
        }
        return { success: true, message: 'Profile has updated successfully' }
    } catch {
        return { success: false, message: 'Profile has failed to update' }
    }
};
