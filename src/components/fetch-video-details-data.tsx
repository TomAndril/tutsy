import { VideoDetails } from "@/types/video";
import { Icons } from "./icons";
import Image from "next/image";
import AddVideoToAccount from "./add-video-to-account";
import { cn } from "@/lib/utils";
import { formatDistance, secondsToMinutes } from "date-fns";
import numeral from "numeral";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface Props {
  videoDetails: VideoDetails;
}

export default function FetchVideoDetailsData({ videoDetails }: Props) {
  return (
    <div className="mt-2" data-testid="add-video-fetched-data">
      <FetchVideoDetailsData.HasVideoChapters
        chapters={videoDetails.chapters}
      />
      <div className="grid md:grid-cols-12 gap-4 mt-2">
        <FetchVideoDetailsData.ThumbnailPreview
          thumbnails={videoDetails.thumbnails}
          alt={videoDetails.title}
        />
        <div className="col-span-12 md:col-span-6 lg:col-span-4 md:grid rounded">
          <FetchVideoDetailsData.VideoData videoDetails={videoDetails} />
        </div>
      </div>
    </div>
  );
}

FetchVideoDetailsData.HasVideoChapters = function HasVideoChapters({
  chapters,
}: {
  chapters: Props["videoDetails"]["chapters"];
}) {
  const hasChapters = chapters.length > 0;

  return (
    <div
      className={cn("border p-4 rounded text-sm", {
        "border-red-300": !hasChapters,
        "border-green-300": hasChapters,
      })}
    >
      {hasChapters ? (
        <>
          <div className="flex items-center">
            <Icons.checkmark size={16} className="mr-2 text-green-500" />
            <span>This video has chapters</span>
          </div>
          <ul className="list-disc px-8 text-xs md:text-sm">
            <li className="mt-2">The best way to use Tutsy</li>
            <li className="mt-2">Track your progress</li>
            <li className="mt-2">
              Use the player to jump to specific parts of the video
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className="flex items-center text-sm md:text-base">
            <Icons.info size={16} className="mr-2 text-red-500" />
            <span className="font-semibold">This video has no chapters</span>
          </div>
          <ul className="mt-2 text-xs md:text-sm list-disc px-8">
            <li className="mt-2">
              You can&apos;t use the player to jump to specific parts of the
              video.
            </li>
            <li className="mt-2">
              You can still use the player to play the video, but you&apos;ll
              have to manually skip to the parts you want to watch.
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

FetchVideoDetailsData.ThumbnailPreview = function ThumbnailPreview({
  thumbnails,
  alt,
}: {
  thumbnails: Props["videoDetails"]["thumbnails"];
  alt: string;
}) {
  const getThumbnailUrl = () => {
    if (thumbnails[4].url) {
      return thumbnails[4].url;
    }

    if (thumbnails[3].url) {
      return thumbnails[3].url;
    }

    if (thumbnails[2].url) {
      return thumbnails[2].url;
    }

    if (thumbnails[1].url) {
      return thumbnails[1].url;
    }

    return thumbnails[0].url;
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-8">
      <Image
        className="rounded border w-full"
        src={getThumbnailUrl()}
        alt={alt}
        width={720}
        height={480}
        placeholder="blur"
        blurDataURL={getThumbnailUrl()}
      />
    </div>
  );
};

FetchVideoDetailsData.VideoDescription = function VideoDescription({
  description,
}: {
  description: Props["videoDetails"]["description"];
}) {
  return <div className="border p-4 rounded">{description}</div>;
};

FetchVideoDetailsData.VideoData = function VideoData({
  videoDetails,
}: {
  videoDetails: Props["videoDetails"];
}) {
  const publishedAt = formatDistance(
    new Date(videoDetails.publishDate),
    new Date(),
    {
      addSuffix: true,
    }
  );

  const hasChapters = videoDetails.chapters.length > 0;

  return (
    <div className="flex flex-col justify-between">
      <div>
        <p className="font-semibold text-sm md:text-base">
          {videoDetails.title}
        </p>
        <div className="text-sm">
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={videoDetails.author.thumbnails?.[0].url} />
                <AvatarFallback>
                  {videoDetails.ownerChannelName?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 text-xs">
                <p>Author</p>
                <p className="font-semibold text-sm">
                  {videoDetails.author.name}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Icons.clock size={14} className="mr-1" />
              <span>
                {secondsToMinutes(Number(videoDetails.lengthSeconds))}m
              </span>
            </div>
            {hasChapters && (
              <div className="flex items-center">
                <Icons.tv size={14} className="mr-1" />
                <span>{videoDetails.chapters.length} Chapters</span>
              </div>
            )}
          </div>
          <div className="flex items-center mt-2 gap-4">
            <div className="flex items-center ml-2">
              <Icons.calendar size={14} className="mr-1" />
              <span>{publishedAt}</span>
            </div>
            <div className="flex items-center">
              <Icons.eye size={14} className="mr-1" />
              <span>{numeral(videoDetails.viewCount).format("0a")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <AddVideoToAccount videoId={videoDetails.videoId} />
      </div>
    </div>
  );
};
