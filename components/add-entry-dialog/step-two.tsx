"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageInput } from "@/components/ui/image-input";

export function StepTwo({ form }: { form: any }) {
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardItems = Array.from(event.clipboardData.items);

    for (const item of clipboardItems) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          form.setValue("fact_screenshot_file", file);
          form.setValue("fact_screenshot_url", "");
          return;
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="fact_screenshot_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fact Screenshot (Optional)</FormLabel>
            <FormControl>
              <div
                onPaste={handlePaste} // Attach clipboard paste handler
                className="relative"
              >
                <ImageInput
                  urlValue={field.value || ""}
                  fileValue={form.watch("fact_screenshot_file")}
                  onUrlChange={(value) => form.setValue("fact_screenshot_url", value)}
                  onFileChange={(file) => form.setValue("fact_screenshot_file", file)}
                  placeholder="Enter screenshot URL, drag and drop, or paste an image"
                  onRemoveFile={() => form.setValue("fact_screenshot_file", null)}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fact_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fact URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter URL of fact source" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}