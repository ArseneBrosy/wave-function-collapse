var canvas = document.getElementById("renderer");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 1500;

//#region CONSTANTES
const GRID_X = 20;
const GRID_Y = 20;

const margin = 0;

//#region SETS
const set_blacklines = [
    {
        sprite: new Image(),
        borders: [0, 0, 0, 0] 
    },
    {
        sprite: new Image(),
        borders: [1, 1, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 0, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [0, 1, 0, 1] 
    }
];
set_blacklines[0].sprite.src = "img/blacklines/blank.png";
set_blacklines[1].sprite.src = "img/blacklines/t.png";
set_blacklines[2].sprite.src = "img/blacklines/l.png";
set_blacklines[3].sprite.src = "img/blacklines/i.png";

const set_greenlines_mono = [
    {
        sprite: new Image(),
        borders: [0, 1, 1, 0] 
    },
    {
        sprite: new Image(),
        borders: [0, 1, 0, 1] 
    }
];
set_greenlines_mono[0].sprite.src = "img/greenlines_mono/l.png";
set_greenlines_mono[1].sprite.src = "img/greenlines_mono/i.png";

const set_greenlines_bridges = [
    {
        sprite: new Image(),
        borders: [0, 1, 1, 0] 
    },
    {
        sprite: new Image(),
        borders: [0, 1, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 1, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 1, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 0, 0, 0] 
    }
];
set_greenlines_bridges[0].sprite.src = "img/greenlines_bridges/l.png";
set_greenlines_bridges[1].sprite.src = "img/greenlines_bridges/i.png";
set_greenlines_bridges[2].sprite.src = "img/greenlines_bridges/x.png";
set_greenlines_bridges[3].sprite.src = "img/greenlines_bridges/t.png";
set_greenlines_bridges[4].sprite.src = "img/greenlines_bridges/end.png";

const set_circuit = [
    {
        sprite: new Image(),
        borders: [0, 0, 0, 0] 
    },
    {
        sprite: new Image(),
        borders: [1, 1, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 3, 1, 3] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 1, 0] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 1, 2] 
    },
    {
        sprite: new Image(),
        borders: [3, 2, 3, 2] 
    },
    {
        sprite: new Image(),
        borders: [3, 1, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [2, 2, 1, 2] 
    },
    {
        sprite: new Image(),
        borders: [2, 2, 2, 2] 
    },
    {
        sprite: new Image(),
        borders: [2, 2, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 1, 2] 
    }
];
set_circuit[0].sprite.src = "img/circuit/chip.png";
set_circuit[1].sprite.src = "img/circuit/board.png";
set_circuit[2].sprite.src = "img/circuit/dot-path-half.png";
set_circuit[3].sprite.src = "img/circuit/line.png";
set_circuit[4].sprite.src = "img/circuit/chip-path.png";
set_circuit[5].sprite.src = "img/circuit/path.png";
set_circuit[6].sprite.src = "img/circuit/path-line.png";
set_circuit[7].sprite.src = "img/circuit/dot-line.png";
set_circuit[8].sprite.src = "img/circuit/t-path.png";
set_circuit[9].sprite.src = "img/circuit/double-diagonal-path.png";
set_circuit[10].sprite.src = "img/circuit/diagonal-path.png";
set_circuit[11].sprite.src = "img/circuit/dot-path.png";

const set_blacklines_diagonal = [
    {
        sprite: new Image(),
        borders: [1, 0, 1, 0] 
    },
    {
        sprite: new Image(),
        borders: [0, 0, 1, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 1, 1, 1] 
    }
];
set_blacklines_diagonal[0].sprite.src = "img/blacklines_diagonal/straight.png";
set_blacklines_diagonal[1].sprite.src = "img/blacklines_diagonal/corner.png";
set_blacklines_diagonal[2].sprite.src = "img/blacklines_diagonal/2corner.png";
//#endregion

const set_snakes = [
    {
        sprite: new Image(),
        borders: [0, 1, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [0, 2, 0, 2] 
    },
    {
        sprite: new Image(),
        borders: [0, 3, 0, 3] 
    },
    {
        sprite: new Image(),
        borders: [1, 0, 0, 1] 
    },
    {
        sprite: new Image(),
        borders: [2, 0, 0, 2] 
    },
    {
        sprite: new Image(),
        borders: [3, 0, 0, 3] 
    },
    {
        sprite: new Image(),
        borders: [0, 0, 0, 1] ,
        variation: {
            sprite: new Image(),
            probability: 0.15
        }
    },
    {
        sprite: new Image(),
        borders: [0, 0, 0, 2],
        variation: {
            sprite: new Image(),
            probability: 0.15
        } 
    },
    {
        sprite: new Image(),
        borders: [0, 0, 0, 3],
        variation: {
            sprite: new Image(),
            probability: 0.15
        } 
    },
    {
        sprite: new Image(),
        borders: [2, 1, 2, 1] 
    },
    {
        sprite: new Image(),
        borders: [1, 3, 1, 3] 
    },
    {
        sprite: new Image(),
        borders: [3, 2, 3, 2] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 1, 2] 
    },
    {
        sprite: new Image(),
        borders: [3, 1, 3, 1] 
    },
    {
        sprite: new Image(),
        borders: [2, 3, 2, 3] 
    },
    {
        sprite: new Image(),
        borders: [1, 2, 2, 1] 
    },
    {
        sprite: new Image(),
        borders: [3, 1, 1, 3] 
    },
    {
        sprite: new Image(),
        borders: [2, 3, 3, 2] 
    },
    {
        sprite: new Image(),
        borders: [2, 1, 1, 2] 
    },
    {
        sprite: new Image(),
        borders: [1, 3, 3, 1] 
    },
    {
        sprite: new Image(),
        borders: [3, 2, 2, 3] 
    },
];

set_snakes[0].sprite.src = "img/snakes/red-line.png";
set_snakes[1].sprite.src = "img/snakes/blue-line.png";
set_snakes[2].sprite.src = "img/snakes/green-line.png";
set_snakes[3].sprite.src = "img/snakes/red-l.png";
set_snakes[4].sprite.src = "img/snakes/blue-l.png";
set_snakes[5].sprite.src = "img/snakes/green-l.png";
set_snakes[6].sprite.src = "img/snakes/red-end.png";
set_snakes[6].variation.sprite.src = "img/snakes/red-end-variation.png";
set_snakes[7].sprite.src = "img/snakes/blue-end.png";
set_snakes[7].variation.sprite.src = "img/snakes/blue-end-variation.png";
set_snakes[8].sprite.src = "img/snakes/green-end.png";
set_snakes[8].variation.sprite.src = "img/snakes/green-end-variation.png";
set_snakes[9].sprite.src = "img/snakes/red-blue1.png";
set_snakes[10].sprite.src = "img/snakes/red-green1.png";
set_snakes[11].sprite.src = "img/snakes/green-blue1.png";
set_snakes[12].sprite.src = "img/snakes/red-blue2.png";
set_snakes[13].sprite.src = "img/snakes/red-green2.png";
set_snakes[14].sprite.src = "img/snakes/green-blue2.png";
set_snakes[15].sprite.src = "img/snakes/red-blue3.png";
set_snakes[16].sprite.src = "img/snakes/red-green3.png";
set_snakes[17].sprite.src = "img/snakes/green-blue3.png";
set_snakes[18].sprite.src = "img/snakes/red-blue4.png";
set_snakes[19].sprite.src = "img/snakes/red-green4.png";
set_snakes[20].sprite.src = "img/snakes/green-blue4.png";

const tiles = set_snakes;
//#endregion

//#region VARIABLES
let grid = [];
let _options = [];
let unpossibles = [];
for (let i = 0; i < tiles.length * 4; i++) {
    _options.push(i);
}
for (let y = 0; y < GRID_Y; y++) {
    let newRow = [];
    for(let x = 0; x < GRID_X; x++) {
        newRow.push(
            {
                options: _options,
                collapsed: false
            }
        );
    }
    grid.push(newRow);
}
//#endregion

//#region FONCTIONS
function draw() {
    const cell_w = canvas.width / GRID_X;
    const cell_h = canvas.height / GRID_Y;
    for (let y = 0; y < GRID_Y; y++) {
        for(let x = 0; x < GRID_X; x++) {
            if (grid[x][y].collapsed) {
                let isUnpossible = false;
                for (var i = 0; i < unpossibles.length; i++) {
                    if (unpossibles[i][0] === x && unpossibles[i][1] === y) {
                        isUnpossible = true;
                    }
                }
                ctx.translate((x + .5) * cell_w, (y + .5) * cell_h);
                ctx.rotate((grid[x][y].options[0] % 4) * 90 * (Math.PI/180));
                ctx.drawImage(grid[x][y].variation ? tiles[parseInt(grid[x][y].options[0] / 4)].variation.sprite : tiles[parseInt(grid[x][y].options[0] / 4)].sprite, -cell_w / 2, -cell_h / 2, cell_w, cell_h);
                ctx.rotate(-(grid[x][y].options[0] % 4) * 90 * (Math.PI/180));
                ctx.translate(-(x + .5) * cell_w, -(y + .5) * cell_h);
                if (isUnpossible) {
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(x * cell_w, y * cell_h, cell_w, cell_h);
                    ctx.strokeStyle = "white";
                }
            } else {
                ctx.strokeRect(x * cell_w, y * cell_h, cell_w, cell_h);
            }
        }
    }
}

function calcOptions(x, y) {
    let possibles = [];
    for (let i = 0; i < tiles.length * 4; i++) {
        possibles.push(i);
    };
    // top
    if (y > 0 && grid[x][y - 1].collapsed) {
        const borderIndex = (3 - grid[x][y - 1].options[0] % 4 + 3) % 4;
        const border = tiles[parseInt(grid[x][y - 1].options[0] / 4)].borders[borderIndex];
        for (let i = 0; i < tiles.length * 4; i++) {
            const myBorderIndex = (3 - i % 4 + 1) % 4;
            if (Math.abs(tiles[parseInt(i / 4)].borders[myBorderIndex] - border) > margin) {
                possibles = possibles.filter(function(e) { return e !== i });
            }
        }
    }
    // bottom
    if (y < GRID_Y - 1 && grid[x][y + 1].collapsed) {
        const borderIndex = (3 - grid[x][y + 1].options[0] % 4 + 1) % 4;
        const border = tiles[parseInt(grid[x][y + 1].options[0] / 4)].borders[borderIndex];
        for (let i = 0; i < tiles.length * 4; i++) {
            const myBorderIndex = (3 - i % 4 + 3) % 4;
            if (Math.abs(tiles[parseInt(i / 4)].borders[myBorderIndex] - border) > margin) {
                possibles = possibles.filter(function(e) { return e !== i });
            }
        }
    }
    // left
    if (x > 0 && grid[x - 1][y].collapsed) {
        const borderIndex = (3 - grid[x - 1][y].options[0] % 4 + 2) % 4;
        const border = tiles[parseInt(grid[x - 1][y].options[0] / 4)].borders[borderIndex];
        for (let i = 0; i < tiles.length * 4; i++) {
            const myBorderIndex = (3 - i % 4) % 4;
            if (Math.abs(tiles[parseInt(i / 4)].borders[myBorderIndex] - border) > margin) {
                possibles = possibles.filter(function(e) { return e !== i });
            }
        }
    }
    // right
    if (x < GRID_X - 1 && grid[x + 1][y].collapsed) {
        const borderIndex = (3 - grid[x + 1][y].options[0] % 4) % 4;
        const border = tiles[parseInt(grid[x + 1][y].options[0] / 4)].borders[borderIndex];
        for (let i = 0; i < tiles.length * 4; i++) {
            const myBorderIndex = (3 - i % 4 + 2) % 4;
            if (Math.abs(tiles[parseInt(i / 4)].borders[myBorderIndex] - border) > margin) {
                possibles = possibles.filter(function(e) { return e !== i });
            }
        }
    }
    if (possibles.length === 0) {
        for (let i = 0; i < tiles.length * 4; i++) {
            possibles.push(i);
        };
        unpossibles.push([x, y]);
    }
    grid[x][y].options = possibles;
}

function collapse(x, y) {
    let pick = grid[x][y].options[Math.floor(Math.random() * grid[x][y].options.length)];
    const variate = tiles[parseInt(pick / 4)].hasOwnProperty("variation") ? Math.random() < tiles[parseInt(pick / 4)].variation.probability : false;
    grid[x][y]= {
        collapsed: true,
        options: [pick],
        variation: variate
    };
    if (x > 0) { if (!grid[x - 1][y].collapsed) { calcOptions (x - 1, y); } }
    if (x < GRID_X - 1) { if (!grid[x + 1][y].collapsed) { calcOptions (x + 1, y); } }
    if (y > 0) { if (!grid[x][y - 1].collapsed) { calcOptions (x, y - 1); } }
    if (y < GRID_Y - 1) { if (!grid[x][y + 1].collapsed) { calcOptions (x, y + 1); } }
}

function findNextCell() {
    let lowestEntropy = tiles.length * 4;
    let candidates = [];
    for (let y = 0; y < GRID_Y; y++) {
        for(let x = 0; x < GRID_X; x++) {
            if (grid[x][y].options.length < lowestEntropy && !grid[x][y].collapsed) {
                lowestEntropy = grid[x][y].options.length;
                candidates = [];
            }
            if (grid[x][y].options.length === lowestEntropy && !grid[x][y].collapsed) {
                candidates.push([x, y]);
            };
        }
    }
    return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : [0, 0];
}
//#endregion

ctx.fillStyle = "black";
ctx.strokeStyle = "white";
let cellsCollapsed = 0;
let removedCells = 0;
function loop() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (cellsCollapsed < GRID_X * GRID_Y) {
        if (cellsCollapsed % 20 === 0) {
            console.log(parseInt(cellsCollapsed / (GRID_X * GRID_Y) * 10000) / 100 + "%");
        }
        let nextCell = findNextCell();
        collapse(nextCell[0], nextCell[1]);
        cellsCollapsed ++;
    } else {
        for (let i = 0; i < unpossibles.length; i++) {
            grid[unpossibles[i][0]][unpossibles[i][1]].collapsed = false;
            removedCells ++;
            if (unpossibles[i][0] > 0) {
                if (grid[unpossibles[i][0] - 1][unpossibles[i][1]].collapsed) {
                    grid[unpossibles[i][0] - 1][unpossibles[i][1]].collapsed = false;
                    removedCells ++;
                }
            }
            if (unpossibles[i][0] < GRID_X - 1) {
                if (grid[unpossibles[i][0] + 1][unpossibles[i][1]].collapsed) {
                    grid[unpossibles[i][0] + 1][unpossibles[i][1]].collapsed = false;
                    removedCells ++;
                }
            }
            if (unpossibles[i][1] > 0) {
                if (grid[unpossibles[i][0]][unpossibles[i][1] - 1].collapsed) {
                    grid[unpossibles[i][0]][unpossibles[i][1] - 1].collapsed = false;
                    removedCells ++;
                }
            }
            if (unpossibles[i][1] < GRID_Y - 1) {
                if (grid[unpossibles[i][0]][unpossibles[i][1] + 1].collapsed) {
                    grid[unpossibles[i][0]][unpossibles[i][1] + 1].collapsed = false;
                    removedCells ++;
                }
            }
        }
        cellsCollapsed -= removedCells;
        removedCells = 0;
        unpossibles = [];

        if (cellsCollapsed === GRID_X * GRID_Y) {
            console.log('done');
            draw();
            clearInterval(interval);
        }
    }
    draw();
}
let interval = setInterval(loop, 0);
