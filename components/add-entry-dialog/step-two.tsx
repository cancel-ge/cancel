"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageInput } from "@/components/ui/image-input";

export function StepTwo({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="fact_screenshot_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fact Screenshot (Optional)</FormLabel>
            <FormControl>
              <ImageInput
                urlValue={field.value || ""}
                fileValue={form.watch("fact_screenshot_file")}
                onUrlChange={(value) => form.setValue("fact_screenshot_url", value)}
                onFileChange={(file) => form.setValue("fact_screenshot_file", file)}
                placeholder="Enter screenshot URL or upload"
                onRemoveFile={() => form.setValue("fact_screenshot_file", null)}
              />
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