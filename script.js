let init = 0;
let width = 500;
let height = 500;
let sizeSlider;
let xSlider;
let ySlider;
let redrawButton;
let xPos = 0;
let yPos = 0;

function setup(x, y) {
	if (init === 0) {
		let thisCanvas = createCanvas(width, height);
		thisCanvas.parent("sketchParent");
		init = 1;
	} else {
		createCanvas(x, y);
	}

	setupSizeSlider();
	setupPosSliders();
	// setupRedrawButton();
	redrawButton = createButton("Redraw!");
	redrawButton.id("redrawBtn");
	// redrawButton.mousePressed(draw);
	noLoop();
}

function setupSizeSlider() {
	sizeSlider = createSlider(1, 255, 10);
	sizeSlider.size(80);
	sizeSlider.id("sizeSlider");
}

function setupPosSliders() {
	xSlider = createSlider(0, width, 1);
	xSlider.id("xPosSlider");
	ySlider = createSlider(0, height, 1);
	ySlider.id("yPosSlider");
}

function mouseReleased(e) {
	switch (e.target.id) {
		case "redrawBtn":
			redraw();
			break;
		case "xPosSlider":
			xPos = xSlider.value();
			break;
		case "yPosSlider":
			yPos = xSlider.value();
			break;
		default:
			break;
	}
}

function keyPressed(e) {
	switch (keyCode) {
		case UP_ARROW:
			yPos = (yPos % height) - 5;
			redraw();
			break;
		case DOWN_ARROW:
			yPos = (yPos % height) + 5;
			redraw();
			break;
		case LEFT_ARROW:
			xPos = (xPos % width) - 5;
			redraw();
			break;
		case RIGHT_ARROW:
			xPos = (xPos % width) + 5;
			redraw();
			break;

		default:
			break;
	}
	return false; //Safety line. Prevents unexpected behavior from some browsers.
}

function draw() {
	let brushSize = sizeSlider.value();
	// if (mouseIsPressed) {
	// 	fill(0);
	// } else {
	// 	fill(255);
	// }
	ellipse(xPos, yPos, brushSize, brushSize);
}

/**
 * 
function drawSquare() {}

function drawLine(xStart, xEnd, yStart, yEnd) {
	let length = 0;
	if (xStart === xEnd) {
		//Vertical line
		length = yEnd - yStart;
	} else if (yStart === yEnd) {
		//Horizontal line
		length = xEnd - xStart;
	} else {
		//Calculate with trig
	}
}

// function setupRedrawButton() {
// 	redrawButton = createButton("Redraw!");
// }
 */
