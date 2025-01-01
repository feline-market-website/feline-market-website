"use server"

import { User } from "@/utils/type";
import { cookies } from "next/headers"

export default async function getMe(): Promise<User | null> {
    try {
        const cookieString = (await cookies()).toString();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/me`, {
            cache: 'no-store',
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: cookieString,
            }
        });
        if (!response.ok) {
            throw new Error
        }
        const data = await response.json();
        return data;
    } catch {
        return null
    }
}
