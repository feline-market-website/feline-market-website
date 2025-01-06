"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  callBack: (data: {
    user_id: string;
    name: string;
    description: string;
    logo_url: string;
  }) => Promise<{ success: boolean; message: string }>;
  userId: string;
}
const formSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(5).max(100),
  logo_url: z.string(),
});

export default function VendorCreateForm({ callBack, userId }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        ...values,
        user_id: userId,
      };
      const result = await callBack(data);
      if (result.success) {
        toast({
          variant: "default",
          title: "Vendor has created successfully",
          description: "You can manage your vendor and products now",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Fail to create the vendor",
          description: result.message,
        });
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Vendor name ex. Tiktok shop"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public vendor name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" type="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="url" type="text" {...field} />
              </FormControl>
              <FormDescription>URL to your logo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button type="submit" disabled={true}>Loading</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
