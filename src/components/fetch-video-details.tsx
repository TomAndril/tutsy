"use client";

import useFetchVideoDetails from "@/hooks/use-fetch-video-details";

import FetchVideoDetailsSkeleton from "./fetch-video-details-skeleton";
import FetchVideoDetailsData from "./fetch-video-details-data";
import { useForm } from "react-hook-form";
import {
  AddVideoSchema,
  addVideoSchema,
} from "@/lib/validations/youtube-video";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function FetchVideoDetails() {
  const form = useForm<AddVideoSchema>({
    resolver: zodResolver(addVideoSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  const { data, isFetching, refetch } = useFetchVideoDetails(
    form.watch("videoUrl")
  );

  const extractIdFromUrl = (url: string) => {
    const withVFormat = url.split("v=")[1];
    const withShortFormat = url.split("youtu.be/")[1]?.split("?")[0];

    if (withVFormat) {
      return withVFormat;
    } else {
      return withShortFormat;
    }
  };

  function onSubmit({ videoUrl }: AddVideoSchema) {
    const videoId = extractIdFromUrl(videoUrl);

    if (videoId === data?.videoId) return;

    refetch();
  }

  return (
    <>
      <div className="border p-4 border-dashed rounded">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video url</FormLabel>
                  <FormControl>
                    <div className="flex max-w-xl items-center">
                      <Input
                        data-testid="add-video-input"
                        disabled={isFetching}
                        className="rounded-tr-none rounded-br-none"
                        placeholder="Paste youtube URL"
                        {...field}
                      />
                      <Button
                        data-testid="search-video-button"
                        disabled={isFetching}
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
      </div>

      {isFetching && <FetchVideoDetailsSkeleton />}
      {data && !isFetching ? (
        <FetchVideoDetailsData videoDetails={data} />
      ) : null}
    </>
  );
}
