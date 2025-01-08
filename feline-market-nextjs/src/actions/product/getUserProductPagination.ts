"use server"

import { Product } from "@/utils/type";

export const getUserProductPagination = async (
  userId: string,
  page: number,
  limit: number
): Promise<{
  success: boolean;
  message: string;
  responseData?: {
    data: Product[];
    total: number;
    currentPage: number;
    totalPage: number;
  };
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products/search?userId=${userId}&page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const responseJson = await response.json();
    return {
      success: true,
      message: responseJson.message,
      responseData: responseJson.data,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
