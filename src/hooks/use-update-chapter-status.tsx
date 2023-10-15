import { updateChapterStatus } from "@/lib/videos";
import { VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateChapterStatus(video: VideoWithChapters) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chapter: Chapter) => updateChapterStatus(chapter),
    onMutate: async (chapter) => {
      await queryClient.cancelQueries({
        queryKey: [["user-video", video.id]],
      });

      const previousVideo = queryClient.getQueryData<VideoWithChapters>([
        "user-video",
        video.id,
      ]);

      console.log("called");

      queryClient.setQueryData<VideoWithChapters>(["user-video", video.id], {
        ...video,
        chapters: video.chapters.map((c) =>
          c.id === chapter.id
            ? {
                ...c,
                completed: true,
              }
            : c
        ),
      });

      return { previousVideo };
    },
  });
}
