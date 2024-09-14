import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    type Column,
    type RowData,
    type Table as TanstackTable,
    flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import Filter from "./Filter";
import { HeaderActions } from "./HeaderActions/HeaderActions";

type TableProps<T extends RowData> = {
    table: TanstackTable<T>;
};

export function CustomTable<T extends RowData>({ table }: TableProps<T>) {
    const [headerGroups, footerGroup] = [
        table.getHeaderGroups(),
        table.getFooterGroups(),
    ];

    const getCommonPinningStylesTailwind = (column: Column<T>) => {
        const isPinned = column.getIsPinned();
        const isLastLeftPinnedColumn =
            isPinned === "left" && column.getIsLastColumn("left");
        const isFirstRightPinnedColumn =
            isPinned === "right" && column.getIsFirstColumn("right");

        return clsx(
            // Box shadow
            isLastLeftPinnedColumn && "shadow-[-4px_0_4px_-4px_gray_inset]",
            isFirstRightPinnedColumn && "shadow-[4px_0_4px_-4px_gray_inset]",

            // Position
            isPinned === "left" && `left-[${column.getStart("left")}px]`,
            isPinned === "right" && `right-[${column.getAfter("right")}px]`,

            // Opacity
            isPinned && "opacity-95",
            !isPinned && "opacity-100",

            // Position
            isPinned ? "sticky" : "relative",

            // Background color
            // isPinned && "bg-white",
            isPinned && "bg-gray-300",

            // Width
            `w-[${column.getSize()}px]`,

            // Z-index
            isPinned ? "z-[1]" : "z-0",
            "border-b border-r border-lightgray px-1 py-0.5",
        );
    };

    return (
        <div className="border border-lightgray overflow-x-scroll w-full max-w-full relative">
            <Table
                style={{
                    width: table.getTotalSize(),
                }}
                className="border border-lightgray border-separate"
            >
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const { column } = header;

                                return (
                                    <TableHead
                                        className={getCommonPinningStylesTailwind(
                                            column,
                                        )}
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}{" "}
                                                </div>

                                                {/* Search Filter */}
                                                {/* {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter
                                                            column={
                                                                header.column
                                                            }
                                                            table={table}
                                                        />
                                                    </div>
                                                ) : null} */}
                                            </>
                                        )}
                                        {/* Get column width */}
                                        {column.getSize()}

                                        {/* //!Fix resize Todo */}
                                        <div
                                            className="absolute right-0 top-0 h-full w-1 bg-blue-300 select-none touch-none hover:bg-blue-500 cursor-col-resize"
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                        />

                                        <HeaderActions
                                            column={header.column}
                                            table={table}
                                        />
                                    </TableHead>
                                );
                            })}
                        </tr>
                    ))}
                </TableHeader>
                <TableBody className="border-b border-lightgray">
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                const { column } = cell;

                                return (
                                    <TableCell
                                        key={cell.id}
                                        className={getCommonPinningStylesTailwind(
                                            column,
                                        )}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CustomTable;
