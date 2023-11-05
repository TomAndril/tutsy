import { calculatePercentage } from "@/utils";
import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface Props {
  chapters: Chapter[];
}

export default function VideoProgressBar({ chapters }: Props) {
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
  return (
    <>
      <span className="text-xs">
        {totalChapters
          ? `Watched ${chaptersWatched} out of ${totalChapters} chapters`
          : `This video has no chapters`}
      </span>
      <Progress value={progress} />
    </>
  );
}
