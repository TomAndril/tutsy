"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerConfigSchema } from "@/lib/validations/player-config";
import { Checkbox } from "./ui/checkbox";
import { Config } from "@prisma/client";
import useUpdateUserConfig from "@/hooks/use-update-user-config";
import { Icons } from "./icons";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants";
import { getPlayerConfig } from "@/lib/user";

interface Props {
  config: Config;
}

export default function PlayerConfigForm({ config }: Props) {
  const { data } = useQuery({
    initialData: { config },
    queryKey: [QueryKeys.PLAYER_CONFIG],
    queryFn: () => getPlayerConfig(),
  });

  const form = useForm<{ userConfig: Pick<Config, "jumpToLastChapter"> }>({
    resolver: zodResolver(playerConfigSchema),
    defaultValues: {
      userConfig: {
        jumpToLastChapter: data?.config?.jumpToLastChapter ?? true,
      },
    },
  });

  const mutator = useUpdateUserConfig();

  return (
    <Form {...form}>
      <h2 className="text-lg">Player Settings</h2>
      <form className="border-dashed border rounded p-6 my-2">
        <FormField
          control={form.control}
          name="userConfig"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormControl>
                  <Checkbox
                    disabled={mutator.isPending}
                    checked={field.value.jumpToLastChapter}
                    onCheckedChange={async (checked) => {
                      await mutator.mutateAsync({
                        jumpToLastChapter: checked as boolean,
                      });
                      return checked
                        ? field.onChange({ jumpToLastChapter: true })
                        : field.onChange({ jumpToLastChapter: false });
                    }}
                    className="mr-2"
                  />
                </FormControl>
                <FormLabel>
                  Jump to the last completed chapter when the video starts
                </FormLabel>
                {mutator.isPending && (
                  <Icons.loader className="animate-spin ml-2" size={16} />
                )}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
