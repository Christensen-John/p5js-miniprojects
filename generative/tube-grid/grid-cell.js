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

//factory function for a cell in a grid
/**
 *
 * @param {int} row The row of the cell
 * @param {int} column The column of the cell
 * @param {int} size The width and height of the cell
 * @param {int} color The color of the cell 0 - 255
 * @param {int} rotChance The rotational chance of the cell 0 - 100;
 * @returns
 */
function Cell(row = 0, column = 0, size, color) {
  //The cell X and Y location will represent the top left corner of the cell
  let cellXLocation = row;
  let cellYLocation = column;
  let cellSize = size;
  let cellColor = color;

  const getColor = () => cellColor;

  const getRow = () => cellXLocation;

  const getColumn = () => cellYLocation;

  const getSize = () => cellSize;

  const drawCellLine = () => {
    let startX = cellXLocation;
    let startY = cellYLocation;
    let endX = cellXLocation + cellSize;
    let endY = cellYLocation + cellSize;
    let interference = Math.round(Math.random() * 100);
    if (interference > randomLimit) {
      startX += cellSize;
      endX -= cellSize;
    }

    stroke(getColor());
    strokeWeight(lineStrokeWeight);
    line(startX, startY, endX, endY);
    stroke(0);
  };

  return { getColor, getRow, getColumn, getSize, drawCellLine };
}

function AngledGrid(worldSize, gridSize, color) {
  let gridCellSize = worldSize / gridSize;
  let lineColor = color;
  let grid = [];

  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(
        Cell(i * gridCellSize, j * gridCellSize, gridCellSize, lineColor)
      );
    }
    grid.push(row);
  }

  const getGrid = () => grid;

  const printGrid = () => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        console.log(`Cell @ ${cell.getRow()}:${cell.getColumn()}`);
      });
    });
  };

  const getGridRow = (row) => grid[row];

  const getGridCellSize = () => gridCellSize;

  const drawGrid = () => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.drawCellLine();
      });
    });
  };

  return { getGrid, getGridRow, getGridCellSize, drawGrid, printGrid };
}
