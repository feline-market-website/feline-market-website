"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

interface ComponentProps {
  onSubmit: (values: z.infer<typeof loginSchema>) => Promise<Response>;
}

const LoginForm: React.FC<ComponentProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const secondarySubmit = async (values: z.infer<typeof loginSchema>) => {
    const response = await onSubmit(values);
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Login fail",
        description: `Wrong username or password`,
      });
    }
    toast({
        title: "Login successfully",
        description: `you login with username: ${values.username}`,
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(secondarySubmit)}>
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
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
