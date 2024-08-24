import Table from "./Table";

import { makeHeaderData, makeColumnData } from "./makeData";
import IndeterminateCheckbox from "./components/InderterminateCheckbox";

export const App = () => {
	const headers = makeHeaderData(10);
	const columns = makeColumnData(100, headers);
	return (
		<Table
			data2={[
				...headers,
				{
					id: "select",
					header: ({ table }) => (
						<IndeterminateCheckbox
							checked={table.getIsAllRowsSelected()}
							indeterminate={table.getIsSomeRowsSelected()}
							onChange={table.getToggleAllRowsSelectedHandler()}
						/>
					),
					cell: ({ row }) => (
						<div className="px-1">
							<IndeterminateCheckbox
								checked={row.getIsSelected()}
								indeterminate={row.getIsSomeSelected()}
								onChange={row.getToggleSelectedHandler()}
							/>
						</div>
					),
				},
			]}
			gridInfo={columns}
		/>
	);
};

export default App;
