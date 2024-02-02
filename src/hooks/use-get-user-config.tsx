import { QueryKeys } from "@/constants";
import { getPlayerConfig } from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default function useGetUserConfig() {
  return useQuery({
    queryKey: [QueryKeys.PLAYER_CONFIG],
    queryFn: () => getPlayerConfig(cookies()),
  });
}
