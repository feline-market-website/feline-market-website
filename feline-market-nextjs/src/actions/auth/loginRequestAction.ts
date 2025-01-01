"use server";

import { cookies } from "next/headers";

export const loginRequest = async (values: {
  username: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error;
    }

    const cookieString = response.headers.get("Set-Cookie");
    if (cookieString) {
      const [cookieNameAndValue] = cookieString.split(";");
      const [cookieName, cookieValue] = cookieNameAndValue.split("=");
      (await cookies()).set(cookieName, cookieValue, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 36000,
      });
    }

    return { success: true, message: "Login successfully" };
  } catch{
    return { success: false, message: "Login failed" };
  }
};
