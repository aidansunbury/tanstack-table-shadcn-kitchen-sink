import Table from "./Table";

import { TooltipProvider } from "@/components/ui/tooltip";
import IndeterminateCheckbox from "./components/InderterminateCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { makeColumnData, makeHeaderData } from "./makeData";

export const App = () => {
    const headers = makeHeaderData(10);
    const columns = makeColumnData(100, headers);
    return (
        <TooltipProvider>
            <Table
                columnDefs={[
                    {
                        id: "select",
                        header: ({ table }) => (
                            <IndeterminateCheckbox
                                checked={table.getIsAllRowsSelected()}
                                onChange={table.getToggleAllRowsSelectedHandler()}
                                indeterminate={table.getIsSomeRowsSelected()}
                            />
                        ),
                        cell: ({ row }) => (
                            <div className="px-1">
                                {/* <IndeterminateCheckbox
                                    checked={row.getIsSelected()}
                                    indeterminate={row.getIsSomeSelected()}
                                    onChange={row.getToggleSelectedHandler()}
                                /> */}
                                <Checkbox
                                    checked={row.getIsSelected()}
                                    // onChange={table.getToggleAllRowsSelectedHandler()}
                                    onCheckedChange={row.getToggleSelectedHandler()}
                                />
                            </div>
                        ),
                    },
                    ...headers,
                ]}
                gridInfo={columns}
            />
        </TooltipProvider>
    );
};

export default App;
