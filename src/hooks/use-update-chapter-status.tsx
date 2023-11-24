import { QueryKeys } from "@/constants";
import { updateChapterStatus } from "@/lib/videos";
import { VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateChapterStatus(video: VideoWithChapters) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chapter: Chapter) => updateChapterStatus(chapter),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [QueryKeys.VIDEO, video.youtubeId],
      });
    },
  });
}
