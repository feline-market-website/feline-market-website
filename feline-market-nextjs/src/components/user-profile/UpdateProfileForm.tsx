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
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/utils/type";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
    first_name: z.string().min(2).max(50).optional(),
    last_name: z.string().min(2).max(50).optional(),
    avatar_url: z.string().url().optional(),
    phone_number: z.string().regex(phoneRegex, "Invalid Number!").optional(),
    shipping_address: z.string().optional(),
});

interface Props {
    userProfile: UserProfile;
    callBack: (
        values: z.infer<typeof formSchema>,
        userProfileId: string
    ) => Promise<{ success: boolean; message: string }>;
}

export default function UpdateProfileForm({ userProfile, callBack }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: userProfile.first_name || "",
            last_name: userProfile.last_name || "",
            avatar_url: userProfile.avatar_url || "",
            phone_number: userProfile.phone_number || "",
            shipping_address: userProfile.shipping_address || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const data = await callBack(values, userProfile.id);
            if (!data.success) {
                toast({
                    variant: "destructive",
                    title: "Update profile fail",
                    description: `An error occurred while updating profile`,
                });
            } else {
                toast({
                    title: "Updated profile Successfully ✅",
                    description: `You updated profile with username: ${userProfile.user.id}`,
                });
            }
        } finally {
            setIsLoading(false)
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
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input placeholder="First name" type="text" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last name" type="text" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="avatar_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>AvatarURL</FormLabel>
                            <FormControl>
                                <Input placeholder="AvatarURL" type="text" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone number" type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Phone number start with (+CountryCode) Ex. +6694025xxxx
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="shipping_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Shipping address"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isLoading ? (<Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button>) : (<Button type="submit">Save</Button>)}
            </form>
        </Form>
    );
}
