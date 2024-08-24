export const saveData = (data: any) => {
	const dataStr = JSON.stringify(data, null, 2);
	localStorage.setItem("data", dataStr);
	console.log("saved data to local storage");
};

export const loadData = () => {
	const dataStr = localStorage.getItem("data");
	if (!dataStr) {
		return {};
	}
	console.log("loaded data from local storage");
	return JSON.parse(dataStr);
};
