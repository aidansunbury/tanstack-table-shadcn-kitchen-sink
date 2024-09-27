// Given an array of column ids, a given column id, and a direction, reorder the array of column ids.

type Direction = "left" | "right";
import type { TableState } from "@tanstack/react-table";

// Todo account for pinned columns as well
export function reorder(
    tableState: TableState,
    source: string,
    direction: Direction,
): string[] {
    const {
        columnOrder: columnIds,
        columnPinning, // Todo
        columnVisibility,
    } = tableState;
    let destinationIndex = 0;
    const sourceIndex = columnIds.indexOf(source);
    if (sourceIndex === -1) {
        return columnIds;
    }
    const increment = direction === "left" ? -1 : 1;
    destinationIndex = sourceIndex + increment;
    while (columnVisibility[columnIds[destinationIndex]] === false) {
        destinationIndex += increment;
    }

    if (destinationIndex < 0 || destinationIndex >= columnIds.length) {
        return columnIds;
    }

    const newColumnIds = [...columnIds];
    newColumnIds.splice(sourceIndex, 1);
    newColumnIds.splice(destinationIndex, 0, source);

    return newColumnIds;
}
