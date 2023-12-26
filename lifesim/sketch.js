const __WORLD_SIZE = 800;
const __CELL_SIZE = 8;
const __GRID_SIZE = __WORLD_SIZE / __CELL_SIZE;
let cnv;
let simBtn;
let currentLifeCycle;
let nextCellLifeCycle;
let cellColor = 20;
let backgroundColor = 220;
let cellStroke = 0;
let loopCounter = 0;

//P5 JS BASE FUNCTIONS
function setup() {
	frameRate(1);
	//Create the base canvas
	cnv = createCanvas(__WORLD_SIZE, __WORLD_SIZE);
	cnv.mousePressed(canvasPressed);
	cnv.class("baseCanvas");

	//Create simulation control button
	simBtn = createButton("Start Sim!");
	simBtn.mousePressed(controlSim);

	//Create test cell grid
	currentLifeCycle = createCellGrid(__GRID_SIZE);

	//Disable stroke to prevent cells subtly overlapping
	noStroke();

	//Prevent looping until the simulation is started.
	noLoop();
}

function draw() {
	background(backgroundColor);

	if (isLooping()) {
		//Create the grid for thee next generation
		currentLifeCycle = createNewLifeCycle();

		//Draw the next generation's
		currentLifeCycle.forEach((columns, row) => {
			columns.forEach((cell, column) => {
				console.log(
					`Cell value at row: ${row} and column: ${column} is: ${cell}`
				);
				if (cell) {
					fill(cellColor);
					square(row * __CELL_SIZE, column * __CELL_SIZE, __CELL_SIZE);
				}
			});
		});
		console.log(`Times looped: ${loopCounter++}`);
	}
}

//FUNCTIONS FOR MANAGING THE MODEL
// function createCellGrid(size) {}

function updateCell(x, y) {
	//Get the alive status of the current clicked cell
	//Y and X are switched or the model array does not match the same grid direction as the view
	let status = currentLifeCycle[x][y];

	//Toggle the living status of the cell
	//Y and X are switched or the model array does not match the same grid direction as the view
	currentLifeCycle[x][y] = !status;

	//Hide a living cell (kill it) or draw a new cell based on the previous status
	if (status) {
		hideDeadCell(x, y);
	} else {
		drawNewCell(x, y);
	}
}

//Creates and returns the next generation of cells based on the current life cycle. Returns a new array representing cell community to be drawn.
function createNewLifeCycle() {
	//The new grid which will hold the grid representing the next generation of cells
	let newCellGrid = [];
	//Loop through each of the rows
	currentLifeCycle.forEach((row, rowIndex) => {
		//A array to hold a new row of cells
		let newCellRow = [];
		//Loop through each of the cells in a row (each of the columns)
		row.forEach((currentGenCell, colIndex) => {
			//Determine the each cell's 'community' or neighbors in the current cell lifecycle
			let currentCellCommunity = getCellCommunity(rowIndex, colIndex);
			//Determine the survival score of each cell and put that value into the next generation grid
			newCellRow.push(determineSurvival(currentGenCell, currentCellCommunity));
		});
		newCellGrid.push(newCellRow);
	});
	return newCellGrid;
}

//Determines if a given cell will survive, die, or come alive based on the current generation
//Returns false if the cell dies (or stays dead) and true if the cell survives (or comes alive)
function determineSurvival(cell, neighbors) {
	let crowdingIndex = determineCrowding(neighbors);
	if (cell && crowdingIndex < 2) {
		//Live cell dies from under population
		return false;
	} else if (cell && crowdingIndex <= 3) {
		//Live cell stays alive for the next generation
		return true;
	} else if (cell && crowdingIndex > 3) {
		//Live cell dies from overcrowding
		return false;
	} else if (!cell && crowdingIndex === 3) {
		//Dead cell comes alive from reproduction
		return true;
	} else {
		//Catch all scenario.
		return false;
	}
}

//Counts the number of living neighbors of a cell.
function determineCrowding(neighbors) {
	let neighbor_count = 0;
	neighbors.forEach((neighbor) => {
		if (neighbor) neighbor_count++;
	});
	return neighbor_count;
}

function getCellCommunity(x, y) {
	let neighbors = [];
	/**

//Top Left
neighbors.push(currentLifeCycle[x - 1][y - 1]);

//Top
neighbors.push(currentLifeCycle[x - 1][y]);

//Top Right
neighbors.push(currentLifeCycle[x - 1][y + 1]);

//Left
neighbors.push(currentLifeCycle[x][y - 1]);

//Right
neighbors.push(currentLifeCycle[x][y + 1]);

//Bottom Left
neighbors.push(currentLifeCycle[x + 1][y - 1]);

//Bottom
neighbors.push(currentLifeCycle[x + 1][y]);

//Bottom Right
neighbors.push(currentLifeCycle[x + 1][y + 1]);
 */
	if (x === 0) {
		//Cell is the top row
		if (y === 0) {
			//Cell is the top left corner
			//Right
			neighbors.push(currentLifeCycle[x][y + 1]);
			//Bottom
			neighbors.push(currentLifeCycle[x + 1][y]);
			//Bottom Right
			neighbors.push(currentLifeCycle[x + 1][y + 1]);
		} else if (y === __GRID_SIZE - 1) {
			//Cell is the top right corner
			//Left
			neighbors.push(currentLifeCycle[x][y - 1]);
			//Bottom Left
			neighbors.push(currentLifeCycle[x + 1][y - 1]);
			//Bottom
			neighbors.push(currentLifeCycle[x + 1][y]);
		} else {
			//Cell is in the inner columns
			//Left
			neighbors.push(currentLifeCycle[x][y - 1]);
			//Right
			neighbors.push(currentLifeCycle[x][y + 1]);
			//Bottom Left
			neighbors.push(currentLifeCycle[x + 1][y - 1]);
			//Bottom
			neighbors.push(currentLifeCycle[x + 1][y]);
			//Bottom Right
			neighbors.push(currentLifeCycle[x + 1][y + 1]);
		}
	} else if (x === __GRID_SIZE - 1) {
		//The cell is in the last row
		if (y === 0) {
			//Cell is the bottom left corner
			//Top
			neighbors.push(currentLifeCycle[x - 1][y]);
			//Top Right
			neighbors.push(currentLifeCycle[x - 1][y + 1]);
			//Right
			neighbors.push(currentLifeCycle[x][y + 1]);
		} else if (y === __GRID_SIZE - 1) {
			//Cell is the bottom right corner
			//Top Left
			neighbors.push(currentLifeCycle[x - 1][y - 1]);
			//Top
			neighbors.push(currentLifeCycle[x - 1][y]);
			//Left
			neighbors.push(currentLifeCycle[x][y - 1]);
		} else {
			//Cell is in the inner columns
			//Top Left
			neighbors.push(currentLifeCycle[x - 1][y - 1]);
			//Top
			neighbors.push(currentLifeCycle[x - 1][y]);
			//Top Right
			neighbors.push(currentLifeCycle[x - 1][y + 1]);
			//Left
			neighbors.push(currentLifeCycle[x][y - 1]);
			//Right
			neighbors.push(currentLifeCycle[x][y + 1]);
		}
	} else {
		//Cell is completely surrounded by other cells
		//Top Left
		neighbors.push(currentLifeCycle[x - 1][y - 1]);
		//Top
		neighbors.push(currentLifeCycle[x - 1][y]);
		//Top Right
		neighbors.push(currentLifeCycle[x - 1][y + 1]);
		//Left
		neighbors.push(currentLifeCycle[x][y - 1]);
		//Right
		neighbors.push(currentLifeCycle[x][y + 1]);
		//Bottom Left
		neighbors.push(currentLifeCycle[x + 1][y - 1]);
		//Bottom
		neighbors.push(currentLifeCycle[x + 1][y]);
		//Bottom Right
		neighbors.push(currentLifeCycle[x + 1][y + 1]);
	}
	return neighbors;
}

//FUNCTIONS FOR MANAGING USER CONTROL
function canvasPressed(event) {
	//Save the the cell that is clicked on and translate that to the corresponding arral location
	let petriXLoc = Math.floor(mouseX / __CELL_SIZE);
	let petriYLoc = Math.floor(mouseY / __CELL_SIZE);

	console.log("I was activated by the button?!");
	//Update the living or dead status of the clicked on cell
	updateCell(petriXLoc, petriYLoc);
}

//Handles user pressing the start button
function controlSim(event) {
	console.log("I am now supposed to start looping!");
	if (isLooping()) {
		simBtn.html("Start sim!");
		noLoop();
	} else {
		simBtn.html("Stop sim!");
		loop();
		draw();
	}
}

//FUNCTIONS FOR MANAGING THE VIEW
//draws a new alive cell at the current selected grid location
function drawNewCell(x, y) {
	fill(cellColor);
	square(x * __CELL_SIZE, y * __CELL_SIZE, __CELL_SIZE);
}

//draws a dead cell which hides an alive cell making the visual appear dead
function hideDeadCell(x, y) {
	fill(backgroundColor);
	square(x * __CELL_SIZE, y * __CELL_SIZE, __CELL_SIZE);
}

//Loops through the cell array and redraws all alive cells
function drawAllCells() {
	fill(cellColor);
	stroke(0);
	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length; j++) {
			if (currentLifeCycle[i][j]) {
				square(i * __CELL_SIZE, j * __CELL_SIZE, __CELL_SIZE, 2);
			}
		}
	}
}

// function updateGrid() {
// 	for (let i = 0; i < worldSize; i += __CELL_SIZE) {
// 		for (let j = 0; j < worldSize; j += __CELL_SIZE) {
// 			if (cells[i][j]) {
// 				fill(255);
// 				square(i, j, __CELL_SIZE, 2);
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
