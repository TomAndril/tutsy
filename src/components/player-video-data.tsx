import { VideoWithChapters } from "@/types/video";
import { Icons } from "./icons";

export default function PlayerVideoData(data: VideoWithChapters) {
  return (
    <div className="container mt-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-sm md:text-base font-semibold">{data.title}</h1>
          <p className="text-xs md:text-sm text-slate-400 font-semibold">
            {data.author}
          </p>
        </div>
        <a
          href={data.youtubeURL}
          target="_blank"
          className="text-xs flex items-center hover:underline"
        >
          Open in YouTube <Icons.extenalLink size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
}
