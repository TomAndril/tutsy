"use client";

import { Theme, themeSchema, themeValues } from "@/lib/validations/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useTheme } from "next-themes";

export default function ThemeSelectorForm() {
  const form = useForm<{ theme: Theme }>({
    resolver: zodResolver(themeSchema),
  });

  const { theme, setTheme } = useTheme();

  return (
    <Form {...form}>
      <form className="border-dashed border rounded p-6">
        <h2 className="text-md font-semibold mb-2">Visuals</h2>
        <FormField
          control={form.control}
          name="theme"
          render={() => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select
                onValueChange={(value) => setTheme(value)}
                defaultValue={theme}
              >
                <FormControl>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder={theme} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {themeValues.map((elem) => (
                    <SelectItem key={elem} value={elem}>
                      <span className="capitalize">{elem}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
