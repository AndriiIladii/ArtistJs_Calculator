const display = document.querySelector(".display");
const calculate = document.querySelector("#equal");
const numberBtns = document.querySelectorAll(".btn");
const clearAll = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const operatorBtns = document.querySelectorAll(".operator");

let currentDisplay = "0";
let result = false;

function updateDisplay() {
  display.textContent = currentDisplay;
}

function clearDisplay() {
  currentDisplay = "0";
  updateDisplay();
}

function appendNumber(value) {
  if (currentDisplay === "0" || result) {
    currentDisplay = value;
  } else {
    currentDisplay += value;
  }

  result = false;

  updateDisplay();
}

function calculateResult() {}

function clearLast() {
  currentDisplay = currentDisplay.slice(0, -1);
  if (currentDisplay === "") {
    currentDisplay = "0";
  }
  updateDisplay();
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.id);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.id);
  });
});

clearAll.addEventListener("click", clearDisplay);

deleteBtn.addEventListener("click", clearLast);

calculate.addEventListener("click", calculateResult);
