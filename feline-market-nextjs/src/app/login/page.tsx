import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "@/components/login/LoginForm";

const onSubmit = async (values: { username: string; password: string }) => {
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
  return response.json();
};

export default function Login() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription>Start your shopping</CardDescription>
          <CardTitle>Login to Feline Market</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
