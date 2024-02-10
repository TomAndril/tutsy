import { calculatePercentage } from "@/utils";
import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface Props {
  chapters: Chapter[];
  withLabel?: boolean;
}

export default function VideoProgressBar({
  chapters,
  withLabel = true,
}: Props) {
  const chaptersWatched = chapters.reduce((acc, curr) => {
    if (curr.completed) {
      acc = acc + 1;
    }
    return acc;
  }, 0);

  const [progress, setProgress] = useState(0);

  const totalChapters = chapters.length;

  useEffect(() => {
    const timer = setTimeout(() =>
      setProgress(calculatePercentage(chaptersWatched, totalChapters))
    );
    return () => clearTimeout(timer);
  }, [chaptersWatched, totalChapters]);

  if (totalChapters) {
    return (
      <div className="w-full">
        {withLabel && (
          <span className="text-xs">
            {chaptersWatched} of {totalChapters} chapters watched
          </span>
        )}
        <Progress value={progress} />
      </div>
    );
  }

  return <span className="text-xs">This video has no chapters</span>;
}
