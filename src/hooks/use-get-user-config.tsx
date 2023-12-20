import { QueryKeys } from "@/constants";
import { getUserConfiguration } from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default function useGetUserConfig() {
  return useQuery({
    queryKey: [QueryKeys.USER_CONFIG],
    queryFn: () => getUserConfiguration(cookies()),
  });
}
