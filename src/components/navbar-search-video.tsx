"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useForm } from "react-hook-form";
import {
  addVideoSchema,
  AddVideoSchema,
} from "@/lib/validations/youtube-video";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { extractIdFromUrl } from "@/utils";
import { cn } from "@/lib/utils";

interface Props {
  isMobileSearch?: boolean;
  closeModal?: () => void;
}

export default function NavbarSearchVideo({
  isMobileSearch,
  closeModal,
}: Props) {
  const form = useForm<AddVideoSchema>({
    resolver: zodResolver(addVideoSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  const router = useRouter();

  function onSubmit({ videoUrl }: AddVideoSchema) {
    const videoId = extractIdFromUrl(videoUrl);

    closeModal?.();

    if (videoId) {
      router.push(`/add/${videoId}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(isMobileSearch ? "md:hidden" : "hidden md:block")}
      >
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center max-w-xs md:max-w-2xl mx-auto mt-2 bg-gradient-to-r bg-slate-900 dark:from-slate-600 dark:to-slate-700 p-1 rounded-md animate-border">
                  <Input
                    className="rounded-r-none w-[16em] md:w-[32em] pl-6 focus:ring-1 ring-in focus:ring-slate-100 dark:focus:ring-slate-800"
                    placeholder="Paste YouTube Link"
                    type="search"
                    {...field}
                  />
                  <Button
                    type="submit"
                    className="bg-slate-900 mx-auto dark:bg-slate-900 rounded-l-none p-[11px] px-8 cursor-pointer text-white"
                  >
                    <Icons.search size={16} />
                  </Button>
                </div>
              </FormControl>
              <div className="max-w-2xl mx-auto flex items-center relative">
                <FormMessage className="absolute top-0 p-2 bg-red-200 dark:bg-red-400 left-[35%] rounded" />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
