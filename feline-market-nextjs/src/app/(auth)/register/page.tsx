import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/register/RegisterForm";

const onSubmit = async (values: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  "use server";
  console.log(values.email, values.username, values.password)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error
    }
    return { success: true, message: "Register successfully" };
  } catch {
    return { success: false, message: "An error occurred while register user" };
  }
};

export default function Register() {
  return (
    <div className="grid grid-cols-1 items-center h-screen md:grid-cols-2 sm:grid-cols-2">
      <div className="w-2/3 mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="mx-6">
            <CardDescription className="text-lg">
              Start your shopping
            </CardDescription>
            <CardTitle className="text-xl font-bold">
              Register to Feline Market
            </CardTitle>
          </div>
          <Image src="/logo.png" alt="feline" width={150} height={150} />
        </div>
        <CardContent>
          <RegisterForm callBack={onSubmit}/>
        </CardContent>
        <CardFooter>
          <p>
            have an account?
            <Link href="/login">
              <Button variant={"link"}>Login</Button>
            </Link>
          </p>
        </CardFooter>
      </div>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/25 to-transparent z-10" />
        <Image
          src="/register-cover.jpg"
          alt="bag"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
