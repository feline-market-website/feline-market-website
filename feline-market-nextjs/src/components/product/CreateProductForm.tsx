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
import { createProductRequest } from "@/actions/product/createProductRequestAction";
import getMe from "@/actions/auth/getMeAction";
import { getVendorByUserId } from "@/actions/vendor/getVendorByUserIdAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string(),
  price: z
    .string()
    .min(1)
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Price must be a valid number greater than or equal to 0",
    }),
  stock: z
    .string()
    .min(1)
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Stock must be a valid number greater than or equal to 0",
    }),
});

export default function CreateProductForm() {
  const router = useRouter()
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        description: "",
        price: 0,
        stock: 0,
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await getMe();

    if (!user) {
      throw new Error("User not found")
    }
    const vendor = await getVendorByUserId(user.id)

    if (!vendor.data) {
      throw new Error("Vendor not found")
    }
    console.log(values)
    const response = await createProductRequest(vendor.data.id, values)
    if (!response.success) {
      toast({
        variant:"destructive",
        title: "Product has created fail",
        description: response.message,
      })
    } else {
      toast({
        variant:"default",
        title: "Product has created successfully",
        description: "You can complete your product images later",
      })
    }
    } catch (error) {
      toast({
        variant:"destructive",
        title: "Product has created fail",
        description: (error as Error).message,
      })
      router.push('/login')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public your product name
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
                <Input placeholder="description" type="text" {...field} />
              </FormControl>
              <FormDescription>Your product Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public product price
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="Stock" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public product stock
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
