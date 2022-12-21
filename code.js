let rows = 100;
let cols = 100;
let playing = false;

const grid = new Array(rows);
const nextGrid = new Array(rows);

let timer;
let reproductionTime = 200;


// Initialize
function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
}

//Setup grid
function initializeGrids() {
    for (let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids() {
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

//Create the table
function createTable() {
    const gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        console.error("Problem: There is no div(container) for the table!")
    }
    const table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < cols; j++){
          const cell = document.createElement("td");
          cell.setAttribute("id", i + "_" + j);
          cell.setAttribute("class", "dead");
          cell.onclick = cellClickHandler;
          tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

//Click handler
function cellClickHandler() {
    const rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];

    const classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    }
    else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.getElementById(i + "_" + j);
            if (grid[i][j] === 0) {
                cell.setAttribute("class", "dead");
            }
            else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

//Setting up control buttons
function setupControlButtons() {
    //Start button
    const startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;
    
    //Clear the board button
    const clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;

    //Set random statate button
    const randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;

    const nextGenButton = document.getElementById("nextGen");
    nextGenButton.onclick = computeNextGen;

    const hideButton = document.getElementById("modalHide");
    hideButton.onclick = modalControl;
    
    const hideButtonModal = document.getElementById("modalClose");
    hideButtonModal.onclick = modalControl;

    const gliderGunButton = document.getElementById("gliderGun");
    gliderGunButton.onclick = cellPickerGliderGun;

    const pulsarButton = document.getElementById("pulsar");
    pulsarButton.onclick = cellPickerPulsar;
}

// Start/Pause/Continue the game
function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    }
    else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}

//Clear the board
function clearButtonHandler() {
    console.log("Clear the board: stop playing, clear grid")
    playing = false;

    const startButton = document.getElementById("start");
    startButton.innerHTML = "Start";
    clearTimeout(timer);

    const cellsList = document.getElementsByClassName("live");
    const cells = [];

    for (let i = 0; i < cellsList.length; i++){
        cells.push(cellsList[i]);
    }

    for (let i = 0; i < cells.length; i++){
        cells[i].setAttribute("class", "dead")
    }
    resetGrids();
}

// Set random live cells on the board
function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const isLive = Math.round(Math.random());
            if (isLive === 1) {
                const cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}
const pulsar = [
  "10_10",
  "10_11",
  "10_12",
  "11_12",
  "15_12",
  "16_12",
  "16_11",
  "16_10",
  "18_14",
  "18_15",
  "19_14",
  "20_14",
  "18_19",
  "18_20",
  "19_20",
  "20_20",
  "16_22",
  "15_22",
  "16_23",
  "16_24",
  "11_22",
  "10_22",
  "10_23",
  "10_24",
  "8_20",
  "7_20",
  "6_20",
  "8_19",
  "8_15",
  "8_14",
  "7_14",
  "6_14",
  "11_14",
  "12_14",
  "12_15",
  "10_15",
  "10_16",
  "11_16",
  "11_18",
  "10_18",
  "10_19",
  "12_19",
  "12_20",
  "11_20",
  "14_20",
  "15_20",
  "14_19",
  "16_18",
  "16_19",
  "15_18",
  "15_16",
  "16_16",
  "16_15",
  "15_14",
  "14_14",
  "14_15",
];

const gliderGun = [
  "15_10",
  "16_10",
  "15_11",
  "16_11",
  "15_20",
  "16_20",
  "17_20",
  "18_21",
  "14_21",
  "13_22",
  "13_23",
  "19_22",
  "19_23",
  "16_24",
  "18_25",
  "14_25",
  "15_26",
  "16_26",
  "17_26",
  "16_27",
  "15_30",
  "15_31",
  "14_30",
  "14_31",
  "13_30",
  "13_31",
  "12_32",
  "16_32",
  "16_34",
  "17_34",
  "12_34",
  "11_34",
  "13_44",
  "13_45",
  "14_44",
  "14_45",
];
 

function cellPickerGliderGun() {
  if (playing) return;
  clearButtonHandler();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(i + "_" + j);
      for (const arg of gliderGun) {
        if (cell.getAttribute("id") === arg) {
          cell.setAttribute("class", "live");
          grid[i][j] = 1;
        }
      }
    }
  }
}

function cellPickerPulsar() {
  if (playing) return;
  clearButtonHandler();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(i + "_" + j);
      for (const arg of pulsar) {
        if (cell.getAttribute("id") === arg) {
          cell.setAttribute("class", "live");
          grid[i][j] = 1;
        }
      }
    }
  }
}

//Modal control
function modalControl() {
    const modal = document.querySelector(".modal");    
    modal.classList.toggle("hidden");    
}

// Run the Game of Life
function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) { 
            applyRules(i, j);
        }
    }
    copyAndResetGrid();
    updateView();
}

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function applyRules(row, col) {
    const numNeighbors = countNeighbors(row, col);

    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
          nextGrid[row][col] = 0;
        }
        else if (numNeighbors === 2 || numNeighbors === 3) {
          nextGrid[row][col] = 1;
        }
        else if (numNeighbors > 3) {
          nextGrid[row][col] = 0;
        }
    }
    else if (grid[row][col] === 0) {
        if (numNeighbors === 3) {
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] === 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] === 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
       if (grid[row - 1][col + 1] === 1) count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] === 1) count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] === 1) count++;
    }
    if (row + 1 < rows) {
         if (grid[row + 1][col] === 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] === 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] === 1) count++;
    }    
    return count;
}


window.onload = initialize