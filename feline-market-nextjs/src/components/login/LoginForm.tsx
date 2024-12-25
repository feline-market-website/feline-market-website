"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

interface ComponentProps {
  onSubmit: (
    values: z.infer<typeof loginSchema>
  ) => Promise<{ access_token: string }>;
}

const LoginForm: React.FC<ComponentProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const secondarySubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const data = await onSubmit(values);
      if (!data.access_token) {
        toast({
          variant: "destructive",
          title: "Login Fail",
          description: `Wrong Username or Password`,
        });
      } else {
        toast({
          title: "Login Successfully ✅",
          description: `You login with username: ${values.username}`,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while login in`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(secondarySubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-8 flex flex-col">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Login</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
