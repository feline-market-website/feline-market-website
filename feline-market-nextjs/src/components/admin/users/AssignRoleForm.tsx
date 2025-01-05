"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/utils/type";
import { updateUserRole } from "@/actions/user-profile/updateUserRoleAction";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const items = [
  {
    id: "admin",
    label: "Admin",
  },
  {
    id: "customer",
    label: "Customer",
  },
  {
    id: "vendor",
    label: "Vendor",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface Props {
  roles: UserRole[];
  userId: string;
}

export const AssignRoleForm: React.FC<Props> = ({ roles, userId }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const userRoles = roles.map((item) => item.role);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: userRoles,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const beforeUpdate = userRoles;
      const afterUpdate = data.items;
      const response = await updateUserRole(userId, beforeUpdate, afterUpdate);
      if (response.success) {
        toast({
          title: "Update role successfully✅",
          description: `Roles have updated to user`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update role fail",
          description: response.message,
        });
      }
    } finally {
      setIsLoading(false);
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Roles</FormLabel>
                <FormDescription>
                  Select the roles you want to assign to the user.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </form>
    </Form>
  );
};
