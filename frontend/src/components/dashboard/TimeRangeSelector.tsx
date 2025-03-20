'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimeRange } from '@/types/types';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onValueChange: (value: TimeRange) => void;
}

export function TimeRangeSelector({
  value,
  onValueChange,
}: TimeRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Time</SelectItem>
        <SelectItem value="month">Last Month</SelectItem>
      </SelectContent>
    </Select>
  );
}
