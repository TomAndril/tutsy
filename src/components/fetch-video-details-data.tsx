import { VideoDetails } from "@/types/video";
import { Icons } from "./icons";
import Image from "next/image";
import AddVideoToAccount from "./add-video-to-account";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { secondsToHoursAndMinutes } from "@/utils";
import { Badge } from "./ui/badge";

interface Props {
  videoDetails: VideoDetails;
}

export default function FetchVideoDetailsData({ videoDetails }: Props) {
  return (
    <div
      className="mt-2 border-dashed border rounded p-4"
      data-testid="add-video-fetched-data"
    >
      <FetchVideoDetailsData.HasVideoChapters
        chapters={videoDetails.chapters}
      />
      <div className="grid md:grid-cols-12 gap-4 mt-2">
        <FetchVideoDetailsData.ThumbnailPreview
          thumbnails={videoDetails.thumbnails}
          alt={videoDetails.title}
        />
        <div className="col-span-12 md:col-span-7 md:grid md:items-center rounded">
          <FetchVideoDetailsData.VideoTitle videoDetails={videoDetails} />
        </div>
      </div>
      <div className="mt-4">
        <AddVideoToAccount videoId={videoDetails.videoId} />
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
        <div className="flex items-center">
          <Icons.checkmark size={16} className="mr-2 text-green-500" />
          <span>This video has chapters</span>
        </div>
      ) : (
        <>
          <div className="flex items-center text-sm md:text-base">
            <Icons.info size={16} className="mr-2 text-red-500" />
            <span>This video has no chapters</span>
          </div>
          <ul className="mt-2 text-xs md:text-sm list-disc px-4">
            <li>
              This video has no chapters so you can&apos;t use the player to
              jump to specific parts of the video.
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
  return (
    <div className="col-span-12 md:col-span-5">
      <Image
        className="rounded border w-full"
        src={thumbnails[3].url}
        alt={alt}
        width={480}
        height={240}
        placeholder="blur"
        blurDataURL={thumbnails[2].url}
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

FetchVideoDetailsData.VideoTitle = function VideoTitle({
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

  const duration = secondsToHoursAndMinutes(Number(videoDetails.lengthSeconds));

  return (
    <div>
      <p className="font-semibold text-sm md:text-base">{videoDetails.title}</p>
      <div className="flex justify-between items-center text-xs md:text-sm mt-2">
        <p className=" text-slate-400">
          {videoDetails.author.user ?? videoDetails.author.name}
        </p>
        <p className="flex items-center">
          <Icons.history size={16} className="mr-1" />
          {publishedAt}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs md:text-sm mt-2">
        <p>
          {duration} • {videoDetails.viewCount} Views
        </p>
        <Badge>{videoDetails.category}</Badge>
      </div>
    </div>
  );
};
