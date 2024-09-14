import type { TableState } from "@tanstack/react-table";

export const saveData = (data: any) => {
	const dataStr = JSON.stringify(data, null, 2);
	localStorage.setItem("data", dataStr);
	console.log("saved data to local storage");
};

// This needs to set a default ordering
export const loadData = (defaultOrdering: string[]) => {
	const dataStr = localStorage.getItem("data");
	console.log(dataStr);
	if (!dataStr) {
		return {
			columnOrder: defaultOrdering,
		};
	}
	console.log("loaded data from local storage");
	return JSON.parse(dataStr) as TableState

};
