import { ModeToggle } from "@/components/mode-toggle";
import { Github, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

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
              <a href="https://github.com/cancel-ge/cancel" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              {/* <a href="https://facebook.com/cancel.ge" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://instagram.com/cancel.ge" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a href="https://x.com/cancelge" target="_blank" rel="noopener noreferrer">
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