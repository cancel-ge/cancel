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
import { ArrowUpDown, Plus, Shuffle } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  sortOrder: 'desc' | 'asc';
  onSortOrderChange: (value: 'desc' | 'asc') => void;
  onShuffle: () => void;
  onAddClick: () => void;
  companiesCount: number;
  peopleCount: number;
  pendingCount: number;
}

export function SearchBar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  sortOrder,
  onSortOrderChange,
  onShuffle,
  onAddClick,
  companiesCount,
  peopleCount,
  pendingCount
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
      <div className="flex flex-row justify-between gap-2 overflow-x-auto pb-2 -mb-2">
        <div className="flex flex-row gap-2 items-center">
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-[110px] flex-shrink-0">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="company">Companies</SelectItem>
              <SelectItem value="person">People</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => onSortOrderChange(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="w-[110px] flex-shrink-0"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
          </Button>
          <Button
            variant="outline"
            onClick={onShuffle}
            className="w-[110px] flex-shrink-0"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
        </div>

        <div className="flex flex-row gap-2">
          <Button
            variant="default"
            onClick={onAddClick}
            className="flex-shrink-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{companiesCount} Companies</span>
            <span className="mx-2 text-muted-foreground/30">|</span>
            <span>{peopleCount} People</span>
            <span className="mx-2 text-muted-foreground/30">|</span>
            <span>{pendingCount} Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}