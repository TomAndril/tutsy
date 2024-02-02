import axios from "axios";
import { getHost } from "./env";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Config, User } from "@prisma/client";
import { UserConfig } from "./validations/user-config";

export async function getPlayerConfig(cookies?: ReadonlyRequestCookies) {
  const { data } = await axios.get(getHost() + "/api/config", {
    headers: {
      // required for next-auth to work
      cookie: cookies as any,
    },
  });
  return data as { config: Config };
}

export async function updatePlayerConfig(
  config: Omit<Config, "id" | "userId">
) {
  const { data } = await axios.patch(getHost() + "/api/config", { config });
  return data as { config: Config };
}

export async function updateUserDetails(userDetails: UserConfig) {
  const { data } = await axios.patch(getHost() + "/api/user", { userDetails });
  return data as User
}
