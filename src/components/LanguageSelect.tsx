import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/data/languages";
import { LanguageCode } from "@/lib/types";
import { Languages } from "lucide-react";

interface LanguageSelectProps {
  value: LanguageCode;
  onValueChange: (value: LanguageCode) => void;
  label: string;
  excludeLanguage?: LanguageCode;
}

export function LanguageSelect({ value, onValueChange, label, excludeLanguage }: LanguageSelectProps) {
  const availableLanguages = excludeLanguage
    ? languages.filter(lang => lang.code !== excludeLanguage)
    : languages;

  return (
    <Select value={value} onValueChange={(val) => onValueChange(val as LanguageCode)}>
      <SelectTrigger className="w-full sm:w-[200px] glass-card border-2">
        <Languages className="mr-2 h-4 w-4" />
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="glass-card">
        {availableLanguages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="cursor-pointer hover:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              <span className="text-muted-foreground text-sm">({lang.nativeName})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
