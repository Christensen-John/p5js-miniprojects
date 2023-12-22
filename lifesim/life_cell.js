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

	//Returns the row of the cell
	get row() {
		return this.x_location;
	}

	//Returns the column of the cell
	get column() {
		return this.y_location;
	}

	//Toggles the life status of the cell. Returns the new life value
	changeLifeStatus() {
		this.living = !this.living;
		return this.living;
	}
}
