"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageInput } from "@/components/ui/image-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, User } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function StepOne({ form, onSlugExistsChange }: { 
  form: any; 
  onSlugExistsChange: (exists: boolean) => void;
}) {
  const [slugExists, setSlugExists] = useState(false);

  const checkSlugExists = async (slug: string) => {
    try {
      const response = await fetch(`/api/check-slug?slug=${slug}`);
      const { exists } = await response.json();
      setSlugExists(exists);
      onSlugExistsChange(exists);
      
      if (exists) {
        form.setError("title", {
          type: "manual",
          message: "This entry already exists"
        });
      } else {
        form.clearErrors("title");
      }
    } catch (error) {
      console.error('Error checking slug:', error);
    }
  };

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
              <Input 
                placeholder="Enter name" 
                {...field} 
                className={slugExists ? "border-red-500" : ""}
                onChange={(e) => {
                  field.onChange(e);
                  const newSlug = generateSlug(e.target.value);
                  form.setValue("page_slug", newSlug);
                  if (e.target.value) {
                    checkSlugExists(newSlug);
                  }
                }}
              />
            </FormControl>
            {field.value && (
              <p className={cn(
                "text-sm",
                slugExists ? "text-red-500" : "text-muted-foreground"
              )}>
                URL: cancel.ge/{generateSlug(field.value)}
                {slugExists && <span className="ml-1">- This entry already exists</span>}
              </p>
            )}
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
                onUrlChange={(value) => {
                  form.setValue("image_url", value);
                  if (value) {
                    form.setValue("image_file", null);
                  }
                }}
                onFileChange={(file) => {
                  form.setValue("image_file", file);
                  if (file) {
                    form.setValue("image_url", "");
                  }
                }}
                placeholder="Enter profile image URL or upload"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}