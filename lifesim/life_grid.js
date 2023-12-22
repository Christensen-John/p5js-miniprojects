class life_grid {
	//Instance property where the cells will be kept
	life_grid = [];
	grid_size = 0;

	constructor(size) {
		this.grid_size = size;
		this.life_grid = createGrid(grid_size);
	}

	//Creates and returns a 2d array of the size of the life grid. Every value in the array is a dead cell (false)
	createGrid(size) {
		//Create the array to hold the rows of cells
		let grid = [];
		//loop through the number of rows
		for (let i = 0; i < size; i++) {
			//Create an array to hold the array of cells
			let row = [];
			//Loop though the columns of cells
			for (let j = 0; j < size; j++) {
				//create a new cell for each location
				let cell = new life_cell(i, j, false);
				//Add the cell to the row
				row.push(cell);
			}
			//Add the row to the base grid array
			grid.push(row);
		}
		//return the created grid of cells
		return grid;
	}

	//Toggles the living status of the cell at location cellX, cellY. Returns the new living value
	toggleLifeStatusOfCell(cellX, cellY) {
		return this.life_grid[cellX][cellY].changeLifeStatus();
	}

	//Returns an array of life_cells representingi a row of the grid;
	getGridRow(row) {
		return this.life_grid[row];
	}

	getCell(x, y) {
		return this.life_grid[x][y];
	}

	//Generates a new grid of cells based on the previous generation
	getNextGeneration() {
		let nextGrid = createGrid(this.grid_size);
	}

	getCellNeighbors(cell) {
		let neighbors = [];
		if (cell.row() === 0) {
			//There is no row of cells above the current cell
			if (cell.column() === 0) {
				//Cell is the top left corner
				neighbors.push(getCell(cell.row(), cell.column() + 1));
				neighbors.push(getCell(cell.row() + 1, cell.column()));
				neighbors.push(getCell(cell.row() + 1, cell.column() + 1));
			} else if (cell.column() === this.grid_size - 1) {
				//Cell is the top right corner
				neighbors.push(getCell(cell.row(), cell.column() - 1));
				neighbors.push(getCell(cell.row() + 1, cell.column() - 1));
				neighbors.push(getCell(cell.row() + 1, cell.column()));
			} else {
				//Cell is in the inner columns
				neighbors.push(getCell(cell.row(), cell.column() - 1));
				neighbors.push(getCell(cell.row(), cell.column() + 1));
				neighbors.push(getCell(cell.row() + 1, cell.column() - 1));
				neighbors.push(getCell(cell.row() + 1, cell.column()));
				neighbors.push(getCell(cell.row() + 1, cell.column() + 1));
			}
		} else if (cell.row() === this.grid_size - 1) {
			//There are no cells below the current cell
			if (cell.column() === 0) {
				//Cell is the bottom left corner
				neighbors.push(getCell(cell.row(), cell.column() + 1));
				neighbors.push(getCell(cell.row() - 1, cell.column()));
				neighbors.push(getCell(cell.row() - 1, cell.column() + 1));
			} else if (cell.column() === this.grid_size - 1) {
				//Cell is the bottom right corner
				neighbors.push(getCell(cell.row(), cell.column() - 1));
				neighbors.push(getCell(cell.row() - 1, cell.column() - 1));
				neighbors.push(getCell(cell.row() - 1, cell.column()));
			} else {
				//Cell is in the inner columns
				neighbors.push(getCell(cell.row(), cell.column() - 1));
				neighbors.push(getCell(cell.row(), cell.column() + 1));
				neighbors.push(getCell(cell.row() - 1, cell.column() - 1));
				neighbors.push(getCell(cell.row() - 1, cell.column()));
				neighbors.push(getCell(cell.row() - 1, cell.column() + 1));
			}
		} else {
			//Cell is completely surrounded by other cells
			neighbors.push(getCell(cell.row(), cell.column() - 1)); //left
			neighbors.push(getCell(cell.row(), cell.column() + 1)); //right
			neighbors.push(getCell(cell.row() - 1, cell.column() - 1)); //top left
			neighbors.push(getCell(cell.row() - 1, cell.column())); //top
			neighbors.push(getCell(cell.row() - 1, cell.column() + 1)); //top right
			neighbors.push(getCell(cell.row() + 1, cell.column() - 1)); //bottom left
			neighbors.push(getCell(cell.row() + 1, cell.column())); //bottom
			neighbors.push(getCell(cell.row() + 1, cell.column() + 1)); //bottom right
		}
		return neighbors;
	}
}
/**
	,_,_,_,
	|_|_|_|
	|_|_|_|
	|_|_|_|
	|_|_|_|
 */
