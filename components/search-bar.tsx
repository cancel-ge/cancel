"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Shuffle } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  sortOrder: 'desc' | 'asc';
  onSortOrderChange: (value: 'desc' | 'asc') => void;
  onShuffle: () => void;
}

export function SearchBar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  sortOrder,
  onSortOrderChange,
  onShuffle
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="company">Companies</SelectItem>
          <SelectItem value="person">People</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={onShuffle}
        className="w-[180px]"
      >
        <Shuffle className="mr-2 h-4 w-4" />
        Shuffle
      </Button>
      <Button
        variant="outline"
        onClick={() => onSortOrderChange(sortOrder === 'desc' ? 'asc' : 'desc')}
        className="w-[180px]"
      >
        <ArrowUpDown className="mr-2 h-4 w-4" />
        {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
      </Button>
    </div>
  );
}