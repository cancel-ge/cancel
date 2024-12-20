"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Plus } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { AddEntryDialog } from "@/components/add-entry-dialog";
import { useState } from "react";

export function Header() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl" role="img" aria-label="Cancel logo">🚫</span>
            <h1 className="text-2xl font-bold">Cancel.ge</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
            <Button 
              variant="default"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
      
      <AddEntryDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />
    </header>
  );
}