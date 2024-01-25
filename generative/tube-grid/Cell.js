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
