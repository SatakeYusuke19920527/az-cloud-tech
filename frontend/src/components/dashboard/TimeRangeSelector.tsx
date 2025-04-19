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
  customStartDate: string | null;
  onCustomDateChange: (value: string) => void;
}

export function TimeRangeSelector({
  value,
  onValueChange,
  customStartDate,
  onCustomDateChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="month">Last Month</SelectItem>
          <SelectItem value="custom">From Date…</SelectItem>
        </SelectContent>
      </Select>

      {value === 'custom' && (
        <input
          type="date"
          value={customStartDate ?? ''}
          onChange={(e) => onCustomDateChange(e.target.value)}
          className="border rounded px-2 py-1 h-10"
        />
      )}
    </div>
  );
}
