"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserConfig, userConfigSchema } from "@/lib/validations/user-config";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useUpdateUserDetails from "@/hooks/use-update-user-details";
import { Icons } from "./icons";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default function UserConfigForm({ session }: Props) {
  const form = useForm<UserConfig>({
    resolver: zodResolver(userConfigSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
    },
  });

  const { update, data } = useSession();

  const mutator = useUpdateUserDetails();

  const onSubmit = async (values: UserConfig) => {
    mutator.mutate(values);
    await update({
      ...data,
      user: {
        ...data?.user,
        name: values.name,
      },
    });
  };

  return (
    <Form {...form}>
      <h2 className="text-lg">User Settings</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-dashed border rounded p-6 my-2 mb-8"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your public display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Submit
          {mutator.isPending && (
            <Icons.loader size={14} className="animate-spin ml-2" />
          )}
        </Button>
        <p className='text-xs mt-4 text-right font-light'>ID: {session.user.id}</p>
      </form>
    </Form>
  );
}
