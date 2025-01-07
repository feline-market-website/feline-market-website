import { Product } from "@/utils/type";

export const getUserProductByName = async (
  userId: string,
  name: string
): Promise<{ success: boolean; message: string; data?: Product[] }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products/${userId}/user-id/${name}/name`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const responseJson = await response.json();
    return {
      success: true,
      message: responseJson.message,
      data: responseJson.data,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
