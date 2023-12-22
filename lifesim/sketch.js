let worldSize = 800;
let cellSize = 8;
let cells;
let firstRun = 1;
let cellColor = 20;
let backgroundColor = 220;

//P5 JS BASE FUNCTIONS
function setup() {
	//Create the base canvas
	let cnv = createCanvas(worldSize, worldSize);
	cnv.class("baseCanvas");

	//Create simulation control button
	let simBtn = createButton("Start Sim!");
	simBtn.mousePressed(controlSim);

	// Set up the data array to hold life tracking data
	createPetriDish();

	//Prevent looping until the simulation is started.
	noLoop();
}

function draw() {
	background(backgroundColor);
}

//FUNCTIONS FOR MANAGING THE MODEL
function createPetriDish() {
	//Create the base array of the grid of values
	cells = [];

	// Start loop to create each row
	for (let i = 0; i < worldSize; i += cellSize) {
		//create array to hold each column for a given row
		let row = [];

		//Loot through the columns
		for (let j = 0; j < worldSize; j += cellSize) {
			//Add the base value for the petri dish, false represents dead, all cells start as dead
			row.push(false);
		}

		//The completed set of columns is added the the row array
		cells.push(row);
	}
}

function updateCell(x, y) {
	//Get the alive status of the current clicked cell
	let status = cells[x][y];

	//Toggle the living status of the cell
	cells[x][y] = !status;

	//Hide a living cell (kill it) or draw a new cell based on the previous status
	if (status) {
		hideDeadCell(x, y);
	} else {
		drawNewCell(x, y);
	}
}

//FUNCTIONS FOR MANAGING USER CONTROL
function mousePressed(event) {
	//Save the the cell that is clicked on and translate that to the corresponding arral location
	let petriXLoc = Math.floor(mouseX / cellSize);
	let petriYLoc = Math.floor(mouseY / cellSize);

	//Update the living or dead status of the clicked on cell
	updateCell(petriXLoc, petriYLoc);
}

//Handles user pressing the start button
function controlSim(event) {}

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
			if (cells[i][j]) {
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
