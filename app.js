let resolution = 16;
let currentColor = "#000";
let eraser = false;
let isMouseDown = false;

const gridContainer = document.querySelector(".grid-container");
const pencilBtn = document.getElementById("pencil-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = document.querySelectorAll(".color-option");
const resolutionSlider = document.getElementById("resolutionSlider");
const gridSizeDisplay = document.querySelector(".resolution-value");
const changeResolution = document.querySelector(".changeResolution");
const resetResolution = document.querySelector(".reset");

// functionality
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

createGrid(resolution);
gridContainer.classList.add("pencil-mode");
gridContainer.classList.remove("eraser-mode");

pencilBtn.addEventListener("click", () => {
  eraser = false;
  pencilBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  gridContainer.classList.add("pencil-mode");
  gridContainer.classList.remove("eraser-mode");
});

eraserBtn.addEventListener("click", () => {
  eraser = true;
  eraserBtn.classList.add("active");
  pencilBtn.classList.remove("active");
  gridContainer.classList.add("eraser-mode");
  gridContainer.classList.remove("pencil-mode");
});

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
    currentColor = option.dataset.color;
  });
});

document.querySelector('input[type="color"]').addEventListener("input", (e) => {
  currentColor = e.target.value;
  colorOptions.forEach((opt) => opt.classList.remove("selected"));
});

resolutionSlider.addEventListener("input", () => {
  resolution = resolutionSlider.value;
  gridSizeDisplay.textContent = `${resolution} x ${resolution}`;
  createGrid(resolution);
});

changeResolution.addEventListener("click", () => {
  let newResolution;
  do {
    newResolution = parseInt(prompt("Enter new resolution (8-100):"));
  } while (newResolution < 8 || newResolution > 100);
  createGrid(newResolution);
});

resetResolution.addEventListener("click", () => {
  createGrid(resolution);
});

function createGrid(resolution) {
  gridContainer.innerHTML = "";
  totalCells = resolution * resolution;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "square";
    cell.style.width = `${100 / resolution}%`;

    cell.addEventListener("mouseover", () => {
      if (isMouseDown) {
        cell.style.backgroundColor = eraser ? "#fff" : currentColor;
      }
    });
    gridContainer.appendChild(cell);
  }
}
