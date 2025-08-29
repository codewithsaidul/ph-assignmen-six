import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sortOptions } from "@/constants";
import type { Dispatch, SetStateAction } from "react";

interface IFilterIncomingRequest {
  min: string;
  max: string;
  sortValue: string;
  setFareRange: Dispatch<SetStateAction<{
      min: string;
      max: string;
    }>
  >;
  setSortValue: Dispatch<SetStateAction<string>>;
  handleResetFilterr: () => void
}

export default function FilterIncomingRequest( { min, max, sortValue, setFareRange, setSortValue, handleResetFilterr }: IFilterIncomingRequest ) {
  return (
    <div className="mb-10 flex items-center flex-wrap gap-5">
      <div className="flex items-center h-8 max-w-52 bg-card w-fit p-0 rounded border">
        <Input
          placeholder="Min Fare"
          value={min}
          onChange={(e) =>
            setFareRange((prev) => ({ ...prev, min: e.target.value }))
          }
          className="border-0 rounded-0! bg-transparent! outline-0 focus-visible:focus-ring-0! focus:ring-0!  focus:outline-0!"
        />

        <Separator orientation="vertical" color="#fff" />

        <Input
          placeholder="Max Fare"
          value={max}
          onChange={(e) =>
            setFareRange((prev) => ({ ...prev, max: e.target.value }))
          }
          className="border-0 rounded-0! bg-transparent! outline-0 focus-visible:focus-ring-0! focus:ring-0! focus:outline-0!"
        />
      </div>
      <Select value={sortValue} onValueChange={setSortValue}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleResetFilterr} size="lg" className="cursor-pointer">
        Reset
      </Button>
    </div>
  );
}
