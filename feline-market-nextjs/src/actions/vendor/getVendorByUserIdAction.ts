"use server"

import { VendorType } from '../../utils/type';

export const getVendorByUserId = async (userId: string): Promise<{success: boolean, message: string, data?: VendorType}> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/vendors/${userId}/user-id`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error((error as Error).message)
          }
          const responseJson = await response.json()
          const data = responseJson.data
          return {success: false, message: "fetch vendor by userId complete", data: data};
    } catch (error) {
        return {success: false, message: (error as Error).message}
        
    }
  };