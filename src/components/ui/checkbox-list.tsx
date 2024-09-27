import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import type { Column } from "@tanstack/react-table";
import { Check, ChevronDown } from "lucide-react";
import React, { useState, useMemo } from "react";

type SearchableCheckboxDropdownProps = {
    columns: Column<any, any>[];
};

export function CheckboxList({ columns }: SearchableCheckboxDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [checkedItems, setCheckedItems] = useState({});

    const filteredOptions = useMemo(() => {
        return columns.filter((option) =>
            option.id.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                    {selectedCount > 0
                        ? `${selectedCount} selected`
                        : "Toggle Visible Columns"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <div className="p-2">
                    <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-2"
                    />
                    <div className="max-h-[200px] overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2 p-1"
                            >
                                <Checkbox
                                    id={option.id}
                                    checked={option.getIsVisible()}
                                    onCheckedChange={() =>
                                        option.toggleVisibility()
                                    }
                                />
                                <label
                                    htmlFor={option.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {option.id}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
