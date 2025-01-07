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
import { VendorType } from "@/utils/type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  callBack: (
    vendorId: string,
    updateData: {
      name: string;
      description: string;
      logo_url: string;
    }
  ) => Promise<{ success: boolean; message: string }>;
  vendorId: string;
  vendorData: VendorType;
}
const formSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(5).max(100),
  logo_url: z.string(),
});

export default function VendorUpdateForm({
  callBack,
  vendorId,
  vendorData,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: vendorData.name,
      description: vendorData.description,
      logo_url: vendorData.logo_url,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const updateData = {
        ...values,
      };
      const result = await callBack(vendorId, updateData);
      if (result.success) {
        toast({
          variant: "default",
          title: "Vendor has updated successfully",
          description: "You can updated vendor many time as your want",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Fail to update the vendor",
          description: result.message,
        });
      }
    } finally {
      setIsLoading(false);
      setIsEditable(false);
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
                  disabled={!isEditable}
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
                <Input
                  placeholder="description"
                  type=""
                  {...field}
                  disabled={!isEditable}
                />
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
                <Input
                  placeholder="url"
                  type="text"
                  {...field}
                  disabled={!isEditable}
                />
              </FormControl>
              <FormDescription>URL to your logo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          {isLoading ? (
            <Button type="submit" disabled={true}>
              Loading
            </Button>
          ) : (
            <Button type="submit" disabled={!isEditable}>
              Update
            </Button>
          )}
          {isEditable ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditable(false);
              }}
            >
              Back
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditable(true);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
