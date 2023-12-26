function createCellGrid(size) {
	//ORIGINAL CODE WITH A BASIC FORLOOP
	let cellGrid = [];
	for (let i = 0; i < size; i++) {
		let row = [];
		for (let j = 0; j < size; j++) {
			row.push(false);
		}
		cellGrid.push(row);
	}

	//return the  cell grid
	return cellGrid;
}
