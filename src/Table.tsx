import {
    type ColumnDef,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getGroupedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { CheckboxList } from "./components/ui/checkbox-list";
import { loadData, saveData } from "../saveUtils";
import TableNav from "./components/TableComponents/TableNav";
import CustomTable from "./components/CustomTable";
import { Input } from "@/components/ui/input";

export const Table = ({
    columnDefs: cols,
    gridInfo: gridData,
}: { columnDefs: ColumnDef<any>[]; gridInfo: Record<string, any>[] }) => {
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data: gridData,
        columns: cols,
        defaultColumn: {
            minSize: 100, // This will make certain view expectations easier to enforce
        },
        // defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        // onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        // globalFilterFn: fuzzyFilter,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        state: {
            globalFilter,
        },
        initialState: loadData(cols.map((d) => d.id)),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <div>
            <div className="">
                <div className="p-2">
                    Search:
                    <Input
                        type="text"
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-48"
                        placeholder="Search all columns..."
                    />
                </div>

                {/* Checkbox list for toggling column visibility */}
                <CheckboxList columns={table.getAllLeafColumns()} />
                <br />
                <TableNav table={table} />

                <div className="p-2">
                    <button
                        onClick={() => saveData(table.getState())}
                        className="border rounded p-1"
                        type="button"
                    >
                        Save state
                    </button>
                </div>
            </div>
            <div>
                <CustomTable table={table} />
            </div>
            <div className="p-2" />

            <div className="p-2" />
            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
        </div>
    );
};

export default Table;
