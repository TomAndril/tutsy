import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Config, User } from "@prisma/client";
import { UserConfig } from "./validations/user-config";
import API from "./axios";

export async function getPlayerConfig(cookies?: ReadonlyRequestCookies) {
  const { data } = await API.get("config", {
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
  const { data } = await API.patch("config", { config });
  return data as { config: Config };
}

export async function updateUserDetails(userDetails: UserConfig) {
  const { data } = await API.patch("user", { userDetails });
  return data as User;
}
