import "../styles/player.css";
import { VideoWithChapters } from "@/types/video";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { secondsToMinutes } from "@/utils";
import { useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  video: VideoWithChapters;
}

export default function YoutubeVideoPlayer({ video }: Props) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const handleJumpToChapter = (ms: number) => {
    playerRef.current?.seekTo(ms);
    setIsPlaying(true);
  };

  const hasChapters = video.chapters.length > 0;
  return (
    <>
      <div
        className={cn("grid grid-cols-1 border-t border-b", {
          "md:grid-cols-[1fr_20%]": hasChapters,
        })}
      >
        <div className="max-h-[80vh] border-r">
          <ReactPlayer
            ref={playerRef}
            playing={isPlaying}
            onReady={() => setIsVideoReady(true)}
            id={video.id}
            width={"100%"}
            height={"100%"}
            controls
            url={`https://vid.puffyan.us/latest_version?id=${video.id}`}
          />
        </div>
        {hasChapters && !isVideoReady && (
          <ScrollArea>
            <div className="max-h-[80vh]">
              <Skeleton className="h-[52px]" />
              <Separator />
              {video.chapters.map((chapter) => (
                <div key={chapter.id}>
                  <Skeleton className="h-[44px] mt-2" />
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {hasChapters && isVideoReady && (
          <ScrollArea>
            <div className="max-h-[80vh]">
              <h2 className="text-sm p-4 font-semibold">Chapters</h2>
              <Separator className="" />
              {video.chapters.map((chapter) => (
                <div key={chapter.id}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full flex justify-start text-xs truncate rounded-none"
                    onClick={() => handleJumpToChapter(chapter.startTime)}
                  >
                    <span className="w-12 justify-start">
                      {secondsToMinutes(chapter.startTime)}
                    </span>
                    {chapter.title}
                  </Button>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <div className="container mt-2">
        <h1 className="font-semibold text-lg">{video.title}</h1>
      </div>
    </>
  );
}
