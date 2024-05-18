import { VideoSearchResult } from "@/types/video";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { secondsToHoursAndMinutes, secondsToMinutes } from "@/utils";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import useAddVideoToAccount from "@/hooks/use-add-video-to-account";

interface Props {
  video: VideoSearchResult;
}

export default function SearchItemCard({ video }: Props) {
  const duration =
    Number(video.lengthSeconds) < 3600
      ? secondsToMinutes(Number(video.lengthSeconds))
      : secondsToHoursAndMinutes(Number(video.lengthSeconds));

  const publishedDate = formatDistance(
    new Date(video.publishDate),
    new Date(),
    { addSuffix: true }
  );

  const chaptersCount = video.chapters?.length ?? null;

  const { mutate, isPending } = useAddVideoToAccount();

  return (
    <Card className="shadow">
      <Image
        src={video.thumbnails?.[4]?.url ?? video.thumbnails?.[3]?.url}
        alt={video.title}
        className="w-full rounded-t-lg "
        height={160}
        width={320}
      />
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <CardDescription className="mt-8">
          <div className="flex items-center justify-between flex-wrap">
            <h3>{video.author.user ?? video.author.name}</h3>
            <Badge variant="secondary">{video.category}</Badge>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              {video.viewCount} views • {duration}
            </p>
            <span>{chaptersCount} chapters</span>
            <p>{publishedDate}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mb-auto">
        <Button
          disabled={isPending}
          className="w-full"
          onClick={() => mutate(video.videoId)}
        >
          <Icons.plus size={16} />
          <span className="ml-2 flex items-center">
            Add to account
            {isPending && (
              <Icons.loader size={16} className="animate-spin ml-2" />
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
