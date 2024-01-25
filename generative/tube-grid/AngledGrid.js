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
