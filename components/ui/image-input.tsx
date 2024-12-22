"use client";

import { useState, useEffect } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"

interface ImageInputProps {
  urlValue: string;
  fileValue: File | null;
  onUrlChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  placeholder?: string;
}

export function ImageInput({
  urlValue,
  fileValue,
  onUrlChange,
  onFileChange,
  placeholder
}: ImageInputProps) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (fileValue) {
      const objectUrl = URL.createObjectURL(fileValue);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (urlValue) {
      setPreview(urlValue);
    } else {
      setPreview("");
    }
  }, [fileValue, urlValue]);

  const handleRemoveImage = () => {
    onUrlChange("");
    onFileChange(null);
    setPreview("");
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Input
          type="text"
          placeholder={placeholder}
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
        />
        <div className="flex flex-col items-center gap-1">
          <Separator orientation="vertical" className="h-8" />
          <span className="text-xs text-muted-foreground font-medium">OR</span>
          <Separator orientation="vertical" className="h-8" />
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileChange(file);
            }
          }}
        />
      </div>
      {preview && (
        <div className="relative w-32 h-32 group">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}