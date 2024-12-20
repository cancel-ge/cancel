"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageInput } from "@/components/ui/image-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, User } from "lucide-react";
import { generateSlug } from "@/lib/utils";

export function StepOne({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Select Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="company" className="sr-only" />
                    </FormControl>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                      <Building2 className="w-6 h-6 mb-2" />
                      <div className="font-semibold">Company</div>
                    </div>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="person" className="sr-only" />
                    </FormControl>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                      <User className="w-6 h-6 mb-2" />
                      <div className="font-semibold">Person</div>
                    </div>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} />
            </FormControl>
            {field.value && (
              <p className="text-sm text-muted-foreground">
                URL: cancel.ge/{generateSlug(field.value)}
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Image</FormLabel>
            <FormControl>
              <ImageInput
                urlValue={field.value || ""}
                fileValue={form.watch("image_file")}
                onUrlChange={(value) => form.setValue("image_url", value)}
                onFileChange={(file) => form.setValue("image_file", file)}
                placeholder="Enter profile image URL or Upload"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}