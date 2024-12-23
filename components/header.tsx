"use client"

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import GitHubButton from 'react-github-btn'
import { Github, Coffee, Facebook, Instagram, Twitter } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <span className="text-3xl" role="img" aria-label="Cancel logo">🚫</span>
            <h1 className="text-2xl font-bold">Cancel.ge</h1>
          </Link>


          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">

              <div className="h-5 w-20 text-sm">
                <GitHubButton
                  href="https://github.com/cancel-ge/cancel"
                  data-color-scheme="no-preference: light; light: light; dark: light;"
                  data-size="small"
                  data-show-count="true"
                  aria-label="Star cancel.ge on GitHub"
                  data-text="Star"
                >
                  Github
                </GitHubButton>
              </div>

              <a href="https://buymeacoffee.com/dsha256" target="_blank" title="Buy me a coffee">
                <Coffee className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>

              {/* <a href="https://facebook.com/cancel.ge" target="_blank">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://instagram.com/cancel.ge" target="_blank">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://x.com/cancelge" target="_blank">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a> */}
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}