const gridContainer = document.getElementById('grid-container');
const previousLevelBtn = document.getElementById('previous-level');
previousLevelBtn.addEventListener('click', previousLevel);
const nextLevelBtn = document.getElementById('next-level');
const restartLevelBtn = document.getElementById('restart-level');
restartLevelBtn.addEventListener('click', restartLevel);
let gridRows = 2; // Initial grid rows
let gridCols = 2; // Initial grid columns
let level = 1;

// Function to create the grid
function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateRows = `repeat(${gridRows}, 80px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridCols}, 80px)`;

    for (let i = 0; i < gridRows * gridCols; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.state = 'off';
        box.addEventListener('click', toggleBox);
        gridContainer.appendChild(box);
    }
}
function toggleBox(event) {
    const clickedBox = event.target;
    const row = Math.floor(Array.from(gridContainer.children).indexOf(clickedBox) / gridCols);
    const col = Array.from(gridContainer.children).indexOf(clickedBox) % gridCols;

    const directions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: -1, col: 0 },
    ];

    toggleBoxState(clickedBox);

    directions.forEach((dir) => {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        if (newRow >= 0 && newRow < gridRows && newCol >= 0 && newCol < gridCols) {
            const adjacentBox = gridContainer.children[newRow * gridCols + newCol];
            toggleBoxState(adjacentBox);
        }
    });
    toggleBoxState(clickedBox);
    // Check if all boxes are turned on
    if (Array.from(gridContainer.children).every(box => box.dataset.state === 'on')) {
        alert(`Level ${level} Completed! Click Next Level to continue.`);
        gridRows += 1;
        gridCols += 1;
        level++;
        createGrid();
    }
}

function toggleBoxState(box) {
    if (box.dataset.state === 'on') {
        box.dataset.state = 'off';
        box.style.backgroundColor = '#fff';
        box.style.color = '#4CAF50';
    } else {
        box.dataset.state = 'on';
        box.style.backgroundColor = '#4CAF50';
        box.style.color = '#fff';
    }
}

nextLevelBtn.addEventListener('click', () => {
    gridRows += 1;
    gridCols += 1;
    level++;
    createGrid();
});

function restartLevel() {
    createGrid();
}

function previousLevel() {
    if (level > 1) {
        gridRows -= 1;
        gridCols -= 1;
        level--;
        createGrid();
    } else {
        alert("You are already on the first level.");
    }
}

createGrid();