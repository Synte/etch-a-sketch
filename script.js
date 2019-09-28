function deleteGrid() {
    gridItems.forEach(gridItem => container.removeChild(gridItem));
}

function promptForReset() {
    let input = prompt("How large should the grid be? Enter a number between 1-80:");

    if (input == null) {
        msg.textContent = "Reset was cancelled.";
    } else if (input > 0 && input < 81) {
        deleteGrid();
        createGrid(input);
        msg.textContent = `New ${input}x${input} grid created.`;
    } else {
        msg.textContent = "Invalid input, grid was not reset.";
    }
}

function colorCell(e) {
    this.classList.add("colored");
}

function createGrid(gridSize) {
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < (gridSize * gridSize); i++) {
        container.appendChild(gridItem.cloneNode(false));
    }

    gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(gridItem => gridItem.addEventListener("mouseenter", colorCell));
}

const container = document.getElementById("container1");
const gridItem = document.createElement("div");
const msg = document.getElementById("msg");

gridItem.classList.add("grid", "grid-item");
let gridItems;

createGrid(16);