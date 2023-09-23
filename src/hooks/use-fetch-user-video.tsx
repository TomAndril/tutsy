import { getUserVideoById } from "@/lib/videos";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUserVideo(id: string) {
  return useQuery({
    queryKey: ["user-video", id],
    queryFn: () => getUserVideoById(id),
  });
}
