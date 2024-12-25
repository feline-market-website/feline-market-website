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
}): Promise<{ access_token: string }> => {
  "use server";

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
  const data = await response.json();
  return data;
};

export default function Login() {
  return (
    <div className="grid grid-cols-2 items-center h-screen">
      <div className="w-2/3 mx-auto">
        <Card className="py-5">
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
              Not have an account?
              <Button variant={"link"}>
                <Link href="/register">Register</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="relative w-full h-full">
        <Image src="/login-cover.jpg" alt="bag" fill className="object-cover" />
      </div>
    </div>
  );
}
