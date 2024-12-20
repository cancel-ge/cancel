"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Upload, X } from "lucide-react";

interface ImageInputProps {
  urlValue: string;
  fileValue?: File;
  onUrlChange: (value: string) => void;
  onFileChange: (file: File | undefined) => void;
  placeholder?: string;
}

export function ImageInput({
  urlValue,
  fileValue,
  onUrlChange,
  onFileChange,
  placeholder
}: ImageInputProps) {
  const [preview, setPreview] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileChange(file);
      onUrlChange(""); // Clear URL when file is uploaded
    }
  };

  const handleRemoveFile = () => {
    setPreview(undefined);
    onFileChange(undefined);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={urlValue}
          onChange={(e) => {
            onUrlChange(e.target.value);
            if (fileValue) {
              handleRemoveFile();
            }
          }}
          disabled={!!fileValue}
        />
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className="relative"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {(preview || fileValue) && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-16 w-16 object-cover rounded"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}