import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Label } from "./label";

interface TagInputProps {
  hasError: string;
  label: string;
  predefinedTags: string[];
  onChange: (selectedTags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  predefinedTags,
  onChange,
  hasError,
  label,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    onChange(selectedTags);
    if (predefinedTags.length === selectedTags.length) {
      setDropdownOpen(false);
    }
  }, [selectedTags, onChange, predefinedTags.length]);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag],
    );
  };

  return (
    <div className="relative w-full">
      <Label
        htmlFor="tags"
        className="text-md font-normal text-black dark:text-white"
      >
        {label}
      </Label>
      <div className="mt-2 flex flex-wrap min-h-12 gap-2 overflow-hidden overflow-x-auto rounded border border-gray-200 dark:border-gray-800 p-2">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-white shadow-sm"
            >
            {tag.toLocaleLowerCase()}
            <span
              onClick={() => toggleTag(tag)}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-1 text-sm font-bold text-gray-600 hover:bg-gray-200 shadow-sm"
            >
              <span className="block h-3 w-3 text-center leading-none">
                <X size={12} className="text-gray-900 font-bolder"/>
              </span>
            </span>
          </div>
        ))}
        <input
          id="tags"
          className="w-full flex-shrink-0 outline-none bg-transparent"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-destructive dark:text-red-800">
        {hasError}
      </p>
      {dropdownOpen && (
        <ul className="absolute left-0 right-0 z-10 max-h-60 overflow-auto rounded border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 p-1">
          {predefinedTags
            .filter((tag) => !selectedTags.includes(tag))
            .map((tag, index) => (
              <li
                key={index}
                className="cursor-pointer rounded px-4 py-2 hover:bg-muted dark:hover:bg-[#1e1e23]"
                onClick={() => toggleTag(tag)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {tag.toLowerCase()}
              </li>
            ))}
        </ul>
      )}
      
    </div>
  );
};

export default TagInput;
