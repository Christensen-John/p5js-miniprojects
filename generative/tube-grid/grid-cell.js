const worldSize = 1000;
const lineColor = 255;
const cellsInGrid = 50;
const randomLimit = 50;
const lineStrokeWeight = 10;

function setup() {
  createCanvas(1000, 1000);
  background(200);
  noLoop();
}

function draw() {
  let firstGrid = AngledGrid(worldSize, cellsInGrid, lineColor);
  firstGrid.drawGrid();
}
