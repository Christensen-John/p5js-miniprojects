function createCellGrid(size) {
	let cellGrid = [];

	for (let i = 0; i < size; i++) {
		// let row = [];
		let row = Array.from({ length: size }, () => false);
		cellGrid.push(row);
	}
	return cellGrid;
}
