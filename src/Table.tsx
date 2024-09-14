import {
    type ColumnDef,
    type ColumnFiltersState,
    type GroupingState,
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
import { makeData } from "./makeData";

import { SearchableCheckboxDropdown } from "@/components/ui/checkboxList";
import { faker } from "@faker-js/faker";
import { loadData, saveData } from "../saveUtils";
import ActionButtons from "./components/ActionButtons";
import CustomTable from "./components/CustomTable";
import DebouncedInput from "./components/DebouncedInput";
import { useSkipper } from "./hooks";
import {
    columns,
    defaultColumn,
    fuzzyFilter,
    getTableMeta,
} from "./tableModels";

export const Table = ({
    columnDefs: cols,
    gridInfo: gridData,
}: { columnDefs: ColumnDef<any>[]; gridInfo: Record<string, any>[] }) => {
    const rerender = React.useReducer(() => ({}), {})[1];

    const [data, setData] = React.useState(makeData(1000));
    const refreshData = () => setData(makeData(1000));

    const [globalFilter, setGlobalFilter] = React.useState("");

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const table = useReactTable({
        data: gridData,
        columns: cols,
        defaultColumn: {
            minSize: 150, // This will make certain view expectations easier to enforce
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
        autoResetPageIndex,
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

    const randomizeColumns = () => {
        table.setColumnOrder(
            faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id)),
        );
    };

    return (
        <div>
            <div className="p-2 grid grid-cols-4 gap-4">
                <div className="p-2">
                    Search:
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="mx-1 p-2 font-lg shadow border border-block"
                        placeholder="Search all columns..."
                    />
                </div>

                <SearchableCheckboxDropdown
                    columns={table.getAllLeafColumns()}
                />

                <div className="p-2">
                    <button
                        onClick={randomizeColumns}
                        className="border rounded p-1"
                        type="button"
                    >
                        Shuffle Columns
                    </button>
                </div>
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
            <div
            //! This fucks up the resizing
            // style={{
            // 	overflowX: "scroll",
            // 	// width: "1000px",
            // }}
            >
                <CustomTable table={table} />
            </div>
            <div className="p-2" />

            <ActionButtons
                getSelectedRowModel={table.getSelectedRowModel}
                hasNextPage={table.getCanNextPage()}
                hasPreviousPage={table.getCanPreviousPage()}
                nextPage={table.nextPage}
                pageCount={table.getPageCount()}
                pageIndex={table.getState().pagination.pageIndex}
                pageSize={table.getState().pagination.pageSize}
                previousPage={table.previousPage}
                refreshData={refreshData}
                rerender={rerender}
                rowSelection={table.getSelectedRowModel()}
                setPageIndex={table.setPageIndex}
                setPageSize={table.setPageSize}
                totalRows={table.getPrePaginationRowModel().rows.length}
            />

            <div className="p-2" />
            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
        </div>
    );
};

export default Table;
