"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface EntryDialogProps {
  entry: {
    description?: string;
    id: string;
    title: string;
    image_url: string;
    fact_screenshot_url?: string;
    fact_url?: string;
    type: 'company' | 'person';
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EntryDialog({ entry, open, onOpenChange }: EntryDialogProps) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4 relative">
            <div className="relative">
              {entry.image_url && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full border-8 border-red-500/30 relative">
                      <div className="absolute top-1/2 left-1/2 w-[141%] h-[8px] bg-red-500/40 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    </div>
                  </div>
                  <img
                    src={entry.image_url}
                    alt={entry.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </>
              )}
            </div>
            <span>{entry.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">{entry.description}</p>

          {entry.fact_screenshot_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={entry.fact_screenshot_url}
                alt="Evidence"
                className="w-full"
              />
            </div>
          )}

          {entry.fact_url && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(entry.fact_url, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Fact
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}