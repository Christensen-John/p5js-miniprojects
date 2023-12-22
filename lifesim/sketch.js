let __WORLD_SIZE = 800;
let __CELL_SIZE = 8;
let current_life_cycle;
let next_life_cycle;
let cell_color = 20;
let background_color = 220;

//P5 JS BASE FUNCTIONS
function setup() {
	//Create the base canvas
	let cnv = createCanvas(worldSize, worldSize);
	cnv.class("baseCanvas");

	//Create simulation control button
	let simBtn = createButton("Start Sim!");
	simBtn.mousePressed(controlSim);

	// Set up the data array to hold life tracking data
	createCellGrid();

	//Prevent looping until the simulation is started.
	noLoop();
}

function draw() {
	background(backgroundColor);
}

//FUNCTIONS FOR MANAGING THE MODEL
function createCellGrid(size) {}

function updateCell(x, y) {
	//Get the alive status of the current clicked cell
	//Y and X are switched or the model array does not match the same grid direction as the view
	let status = currentLifeCycle[y][x];

	//Toggle the living status of the cell
	//Y and X are switched or the model array does not match the same grid direction as the view
	currentLifeCycle[y][x] = !status;

	//Hide a living cell (kill it) or draw a new cell based on the previous status
	if (status) {
		hideDeadCell(x, y);
	} else {
		drawNewCell(x, y);
	}
}

function createNewLifeCycle() {}

//FUNCTIONS FOR MANAGING USER CONTROL
function mousePressed(event) {
	//Save the the cell that is clicked on and translate that to the corresponding arral location
	let petriXLoc = Math.floor(mouseX / cellSize);
	let petriYLoc = Math.floor(mouseY / cellSize);

	//Update the living or dead status of the clicked on cell
	updateCell(petriXLoc, petriYLoc);
}

//Handles user pressing the start button
function controlSim(event) {
	if (isLooping()) {
		noLoop();
	} else {
		loop();
		draw();
	}
}

//FUNCTIONS FOR MANAGING THE VIEW
//draws a new alive cell at the current selected grid location
function drawNewCell(x, y) {
	fill(cellColor);
	stroke(0);
	square(x * cellSize, y * cellSize, cellSize, 2);
}

//draws a dead cell which hides an alive cell making the visual appear dead
function hideDeadCell(x, y) {
	fill(backgroundColor);
	stroke(backgroundColor);
	square(x * cellSize, y * cellSize, cellSize, 2);
}

//Loops through the cell array and redraws all alive cells
function drawAllCells() {
	fill(cellColor);
	stroke(0);
	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length; j++) {
			if (currentLifeCycle[i][j]) {
				square(i * cellSize, j * cellSize, cellSize, 2);
			}
		}
	}
}

// function updateGrid() {
// 	for (let i = 0; i < worldSize; i += cellSize) {
// 		for (let j = 0; j < worldSize; j += cellSize) {
// 			if (cells[i][j]) {
// 				fill(255);
// 				square(i, j, cellSize, 2);
// 			} else {
// 						fill(10);
// 			}
// 		}
// 	}
// }

/**
 * Pseudocode:
 * 1. Create starting setup (requires mouse input)
 * 2. Start sim (requires button or button press)
 * 3. For each cell, look at surrounding cells, calculate life state
 * 4. redraw grid with updated status
 */

/**
 * TODO:
 * 1. Create clearAll button
 */

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

	//Generates a new grid of cells based on the previous generation
	getNextGeneration() {
		let nextGrid = createGrid(this.grid_size);
	}
}

class life_cell {
	x_location = 0;
	y_location = 0;
	living = false;

	//Creates a new life_cell that has coordinates in a life_grid. Has a life status that defaults to false
	constructor(x, y, startAlive = false) {
		this.x_location = x;
		this.y_location = y;
		this.living = startAlive;
	}

	//Returns the life status of the cell
	get isAlive() {
		return this.living;
	}

	//Returns the location of the cell in the life_grid
	get location() {
		return [this.x_location, this.y_location];
	}

	//Toggles the life status of the cell. Returns the new life value
	changeLifeStatus() {
		this.living = !this.living;
		return this.living;
	}
}
