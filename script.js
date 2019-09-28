function colorCell(e) {
    this.classList.add("colored");
}

const container = document.getElementById("container1");
const gridItem = document.createElement("div");

gridItem.classList.add("grid", "grid-item");

let rowCount = 16;
let colCount = 16;
let totalCells = rowCount * colCount;

container.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;

for (let i = 0; i < totalCells; i++) {
    container.appendChild(gridItem.cloneNode(false));
}

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach(gridItem => gridItem.addEventListener("mouseenter", colorCell));