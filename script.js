function deleteGrid() {
    gridItems.forEach(gridItem => container.removeChild(gridItem));
}

function promptForReset() {
    let input = prompt("How large should the grid be? Enter a number between 1-80:", 16);

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

function randRGB() {
    let r = Math.floor(Math.random() * Math.floor(256));
    let g = Math.floor(Math.random() * Math.floor(256));
    let b = Math.floor(Math.random() * Math.floor(256));
    return `rgb(${r},${g},${b})`;
}

function decreaseLightness(color) {
    let colors = color.substr(4, color.length - 5).split(", ");

    if (colors[0] == colors[1] && colors[0] == colors[2]) {
        num = Math.floor(100 * (colors[0] / 255));
        if (num % 10 === 0) {
            return `hsl(0,0%,${num - 10}%)`
        }
    }

    return "hsl(0,0%,90%)";
}

function colorCell(e) {
    switch (currentMode) {
        case ("regular"):
            this.style.backgroundColor = "black";
            break;
        case("party"):
            this.style.backgroundColor = randRGB();
            break;
        case("fade"):
            if (this.style.backgroundColor == "rgb(0, 0, 0)") return;

            this.style.backgroundColor = decreaseLightness(this.style.backgroundColor);
            break;
    }
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

function setMode(e) {
    if (currentMode == this.getAttribute("id")) return;

    document.getElementById(currentMode).classList.replace("active", "inactive");

    currentMode = this.getAttribute("id");
    this.classList.replace("inactive", "active");
}

let currentMode = "regular";
const modes = document.querySelectorAll(".mode");
modes.forEach(mode => mode.addEventListener("click", setMode));

const container = document.getElementById("container1");
const gridItem = document.createElement("div");
const msg = document.getElementById("msg");

gridItem.classList.add("grid", "grid-item");
let gridItems;

createGrid(16);