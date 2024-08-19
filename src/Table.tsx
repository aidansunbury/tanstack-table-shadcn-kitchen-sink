import {
	ColumnDef,
	type ColumnFiltersState,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type GroupingState,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { makeData } from "./makeData";

import styled from "@emotion/styled";
import { useSkipper } from "./hooks";
import {
	columns,
	defaultColumn,
	fuzzyFilter,
	getTableMeta,
} from "./tableModels";
import DebouncedInput from "./components/DebouncedInput";
import ActionButtons from "./components/ActionButtons";
import { faker } from "@faker-js/faker";
import CustomTable from "./components/CustomTable";

const Styles = styled.div`
  padding: 1rem;
  border: 1px solid black;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export const Table = ({
	data2: cols,
	gridInfo,
}: { data2: ColumnDef<any>[]; gridInfo: any[] }) => {
	const rerender = React.useReducer(() => ({}), {})[1];

	const [data, setData] = React.useState(makeData(1000));
	const refreshData = () => setData(makeData(1000));

	// const [columnVisibility, setColumnVisibility] = React.useState({});
	const [grouping, setGrouping] = React.useState<GroupingState>([]);
	const [isSplit, setIsSplit] = React.useState(false);
	// const [rowSelection, setRowSelection] = React.useState({});
	// const [columnPinning, setColumnPinning] = React.useState({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [globalFilter, setGlobalFilter] = React.useState("");

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

	// const generatedHeaders = makeHeaderData(10);
	// const generatedolumns = makeColumnData(1000, generatedHeaders);

	const table = useReactTable({
		data: gridInfo,
		columns: cols,
		// defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		// globalFilterFn: fuzzyFilter,
		autoResetPageIndex,
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		// onColumnVisibilityChange: setColumnVisibility,
		onGroupingChange: setGrouping,
		// onColumnPinningChange: setColumnPinning,
		// onRowSelectionChange: setRowSelection,
		// Provide our updateData function to our table meta
		// meta: getTableMeta(setData, skipAutoResetPageIndex),
		state: {
			grouping,
			columnFilters,
			globalFilter,
			// columnVisibility,
			// columnPinning,
			// rowSelection,
		},
		initialState: {
			columnPinning: {
				left: ["header-6"],
				right: [],
			},
			columnVisibility: {
				"header-5": false,
			},
		},
		// initialState: {
		// 	columnSizing: {
		// 		"header-3": 736,
		// 		"header-5": 500,
		// 	},
		// 	columnSizingInfo: {
		// 		startOffset: null,
		// 		startSize: null,
		// 		deltaOffset: null,
		// 		deltaPercentage: null,
		// 		isResizingColumn: false,
		// 		columnSizingStart: [],
		// 	},
		// 	rowSelection: {},
		// 	rowPinning: {
		// 		top: [],
		// 		bottom: [],
		// 	},
		// 	expanded: {},
		// 	grouping: [],
		// 	sorting: [],
		// 	globalFilter: "",
		// 	columnFilters: [],
		// 	columnPinning: {
		// 		left: ["header-6"],
		// 		right: [],
		// 	},
		// 	columnOrder: [
		// 		"header-5",
		// 		"header-6",
		// 		"header-0",
		// 		"header-3",
		// 		"header-7",
		// 		"header-9",
		// 		"header-1",
		// 		"header-4",
		// 		"header-2",
		// 		"header-8",
		// 	],
		// 	columnVisibility: {},
		// 	pagination: {
		// 		pageIndex: 0,
		// 		pageSize: 10,
		// 	},
		// },
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	React.useEffect(() => {
		if (table.getState().columnFilters[0]?.id === "fullName") {
			if (table.getState().sorting[0]?.id !== "fullName") {
				table.setSorting([{ id: "fullName", desc: false }]);
			}
		}
	}, [table.getState().columnFilters[0]?.id]);

	const randomizeColumns = () => {
		table.setColumnOrder(
			faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id)),
		);
	};

	return (
		<Styles>
			{JSON.stringify(cols)}
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
				<div className="p-2 inline-block border border-black shadow rounded">
					<div className="px-1 border-b border-black">
						<label>
							<input
								type="checkbox"
								checked={table.getIsAllColumnsVisible()}
								onChange={table.getToggleAllColumnsVisibilityHandler()}
								className="mr-1"
							/>
							Toggle All
						</label>
					</div>
					{table.getAllLeafColumns().map((column) => {
						return (
							<div key={column.id} className="px-1">
								<label>
									<input
										type="checkbox"
										checked={column.getIsVisible()}
										onChange={column.getToggleVisibilityHandler()}
										className="mr-1"
									/>
									{column.id}
								</label>
							</div>
						);
					})}
				</div>
				<div className="p-2">
					<div>
						<input
							type="checkbox"
							checked={isSplit}
							onChange={(e) => setIsSplit(e.target.checked)}
							className="mx-1"
						/>
						Split Mode
					</div>
					<button onClick={randomizeColumns} className="border rounded p-1">
						Shuffle Columns
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
				{/* <div className={`flex ${isSplit ? "gap-4" : ""}`}> */}
				{isSplit ? <CustomTable table={table} tableGroup="left" /> : null}
				<CustomTable
					table={table}
					tableGroup={isSplit ? "center" : undefined}
				/>
				{isSplit ? <CustomTable table={table} tableGroup="right" /> : null}
				{/* </div> */}
			</div>
			<div className="p-2" />

			<div className="p-2" />
			<pre>{JSON.stringify(table.getState(), null, 2)}</pre>
		</Styles>
	);
};

export default Table;

{
	/* <ActionButtons
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
				rowSelection={rowSelection}
				setPageIndex={table.setPageIndex}
				setPageSize={table.setPageSize}
				totalRows={table.getPrePaginationRowModel().rows.length}
			/> */
}
