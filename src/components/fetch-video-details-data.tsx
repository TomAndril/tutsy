import { VideoDetails } from "@/types/video";
import { Icons } from "./icons";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  videoDetails: VideoDetails;
}

export default function FetchVideoDetailsData({ videoDetails }: Props) {
  return (
    <div className="mt-2 border-dashed border rounded p-4">
      <FetchVideoDetailsData.HasVideoChapters
        chapters={videoDetails.chapters}
      />
      <div className="grid md:grid-cols-12 gap-4 mt-2">
        <FetchVideoDetailsData.ThumbnailPreview
          thumbnails={videoDetails.thumbnails}
          alt={videoDetails.title}
        />
        <div className="border col-span-12 md:col-span-7 p-4 rounded">
          <FetchVideoDetailsData.VideoTitle title={videoDetails.title} />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button size="lg">Add</Button>
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
    <div className="border p-4 rounded text-sm">
      {hasChapters ? (
        <div className="flex items-center">
          <Icons.checkmark color="green" size={18} className="mr-2" />
          <span>This video has chapters</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Icons.off color="red" size={18} className="mr-2" />
          <span>This video has no chapters</span>
        </div>
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
        src={thumbnails[4].url}
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
  title,
}: {
  title: Props["videoDetails"]["title"];
}) {
  return <p className="text-sm">{title}</p>;
};
