"use client";

import { EntryDialog } from "@/components/entry-dialog";
import { useRouter } from "next/navigation";
import { Entry } from "@/lib/types";

interface EntryPageProps {
  entry: Entry;
}

export function EntryPage({ entry }: EntryPageProps) {
  const router = useRouter();

  return (
    <EntryDialog
      entry={entry}
      open={true}
      onOpenChange={(open) => !open && router.push('/')}
    />
  );
}