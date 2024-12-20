"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface SocialLinkButtonProps {
  url: string;
}

export function SocialLinkButton({ url }: SocialLinkButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => window.open(url, '_blank')}
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      View Original Post
    </Button>
  );
}