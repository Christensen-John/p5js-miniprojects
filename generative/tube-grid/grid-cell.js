let worldSize = 1000;
let lineColor = 255;
let cellsInGrid = 50;
let randomLimit = 50;
let lineStrokeWeight = 10;

function setup() {
  const cnv = createCanvas(750, 750);
  cnv.parent("canvas-container");
  background(200);
  noLoop();
}

function draw() {
  let firstGrid = AngledGrid(worldSize, cellsInGrid, lineColor);
  firstGrid.drawGrid();
}

// function ProgramSettings() {

//   const setWorldSize = (wrldSize) => (worldSize = wrldSize);
//   const setLineColor = (newColor) => (lineColor = newColor);
//   const setNumCellsInGrid = (newNumOfCells) => (cellsInGrid = newNumOfCells);
//   const setRandomLimit = (newLimit) => (randomLimit = newLimit);
//   const setStrokeWeight = (newStrokeWt) => (lineStrokeWeight = newStrokeWt);

//   const getWorldSize() => worldSize;
//   const getLineColor() => lineColor;
//   const getCellsInGrid() => cellsInGrid;
//   const getRandomLimit() => worldSize;
//   const getWorldSize() => worldSize;
// }
