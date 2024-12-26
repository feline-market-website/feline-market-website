import { cookies } from "next/headers";

export default async function Home() {
    const response = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookies()).toString(),
        },
      });
      const data = await response.json()
      console.log(data)
    return(
        <div>
            Home
        </div>
    )
}
