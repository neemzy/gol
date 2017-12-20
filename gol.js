function getNeighbours(table, x, y) {
  const up = y > 0;
  const right = x < table.length - 1;
  const down = y < table[x].length - 1;
  const left = x > 0;

  return [
    up && left && table[x - 1][y - 1],
    up && table[x][y - 1],
    up && right && table[x + 1][y - 1],
    right && table[x + 1][y],
    down && right && table[x + 1][y + 1],
    down && table[x][y + 1],
    down && left && table[x - 1][y + 1],
    left && table[x - 1][y]
  ].filter(c => c);
}

function getNextCellState(table, x, y) {
  const aliveNeighbours = getNeighbours(table, x, y).length;

  return !((table[x][y] && (aliveNeighbours < 2 || aliveNeighbours > 3))
    || (!table[x][y] && aliveNeighbours !== 3)
  );
};

function getNextState(table) {
  return table.reduce((newTable, row, x) => [
    ...newTable,
    row.map((cell, y) => getNextCellState(table, x, y))
  ], []);
}

function displayTable(table) {
  for (let x = 0; x < table.length; x++) {
    for (let y = 0; y < table.length; y++) {
      process.stdout.write(table[x][y] ? '#' : ' ');
    }

    process.stdout.write('\n');
  }
}

function clearScreen() {
  if (typeof process !== 'undefined') {
    process.stdout.write('\033c');
  }
}

let table = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const interval = (typeof process !== 'undefined' && process.argv[2])
  ? process.argv[2]
  : (typeof window !== 'undefined' && window.interval)
    ? window.interval
    : 100;

setInterval(function() {
  clearScreen();
  displayTable(table);

  table = getNextState(table);
}, interval);
