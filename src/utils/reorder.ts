// Given an array of column ids, a given column id, and a direction, reorder the array of column ids.

type Direction = "left" | "right";
import type { TableState } from "@tanstack/react-table";

// Also should move it past all invisible columns / pinned columns

export function reorder(
	tableState: TableState,
	source: string,
	direction: Direction,
): string[] {
	const { columnOrder: columnIds, columnPinning } = tableState;
	let destinationIndex = 0;
	const sourceIndex = columnIds.indexOf(source);
	if (sourceIndex === -1) {
		return columnIds;
	}
	if (direction === "left") {
		destinationIndex = sourceIndex - 1;
	}
	if (direction === "right") {
		destinationIndex = sourceIndex + 1;
	}
	if (destinationIndex < 0 || destinationIndex >= columnIds.length) {
		return columnIds;
	}

	const newColumnIds = [...columnIds];
	newColumnIds.splice(sourceIndex, 1);
	newColumnIds.splice(destinationIndex, 0, source);

	return newColumnIds;
}
