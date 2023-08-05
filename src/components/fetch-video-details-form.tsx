"use client";

import useFetchVideoDetails from "@/hooks/use-fetch-video-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVideoSchema, addVideoSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function FetchVideoDetailsForm() {
  const form = useForm<AddVideoSchema>({
    resolver: zodResolver(addVideoSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  const { data, isError, isLoading, refetch } = useFetchVideoDetails(
    form.getValues("videoUrl")
  );

  function onSubmit(values: AddVideoSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video url</FormLabel>
              <FormControl>
                <div className="flex w-full items-center">
                  <Input
                    className="rounded-tr-none rounded-br-none"
                    placeholder="Paste youtube URL"
                    {...field}
                  />
                  <Button
                    className="rounded-bl-none rounded-tl-none"
                    type="submit"
                    variant="secondary"
                  >
                    <Icons.search size={18} className="mr-2" />
                    Search
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                The youtube URL of the video you want to add
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
