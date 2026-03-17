import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ALL = "__all__";

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
};

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "すべて",
  className,
}: FilterSelectProps) {
  return (
    <Select
      value={value === "" ? ALL : value}
      onValueChange={(v) => onChange(v === ALL ? "" : v)}
    >
      <SelectTrigger className={cn("w-36", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>すべて</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
