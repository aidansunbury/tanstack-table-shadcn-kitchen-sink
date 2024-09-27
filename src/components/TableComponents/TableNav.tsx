import React from "react";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Props<T> = {
    table: Table<T>;
    perPageOptions?: number[];
};

export function TableNav<T>({
    table,
    perPageOptions = [10, 25, 50, 100],
}: Props<T>) {
    return (
        <React.Fragment>
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => table.setPageIndex(0)}
                    variant="ghost"
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight />
                </Button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">| Go to page:</span>
                <Input
                    type="number"
                    min="1"
                    className="w-24"
                    max={table.getPageCount()}
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        table.setPageIndex(page);
                    }}
                />
                <Select
                    onValueChange={(value) => table.setPageSize(Number(value))}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={`Show ${table.getState().pagination.pageSize}`}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {perPageOptions.map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                                Show {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        </React.Fragment>
    );
}

export default TableNav;
