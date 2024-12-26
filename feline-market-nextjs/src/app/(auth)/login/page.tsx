import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

const onSubmit = async (values: {
  username: string;
  password: string;
}): Promise<{ success: boolean, message: string }> => {
  "use server";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error
    }
    return {success: true, message: "Login successfully"};
  } catch {
    return {success: false, message: "Login fail"}
  }
};

export default function Login() {
  return (
    <div className="flex flex-col-reverse items-center h-screen md:flex-row sm:flex-row">
      <div className="relative w-full h-1/3 md:h-full md:flex-1">
        <Image
          src="/login-cover.jpg"
          alt="bag"
          fill
          className="object-cover md:object-left"
        />
      </div>
      <div className="mx-auto flex flex-col flex-1 p-6">
        <Card className="py-5 mx-auto max-w-md w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardDescription className="text-lg">
                Start your shopping
              </CardDescription>
              <CardTitle className="text-xl font-bold">
                Login to Feline Market
              </CardTitle>
            </div>
            <Image src="/logo.png" alt="feline" width={150} height={150} />
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={onSubmit} />
          </CardContent>
          <CardFooter>
            <p>
              Not have an account?{" "}
              <Link href="/register">
                <Button variant="link">Register</Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
