const numberBtns = document.querySelectorAll(".btn");
const operatorBtns = document.querySelectorAll(".operator");
const resultDisplay = document.querySelector(".result");
const values = document.querySelector(".values");
const clearAll = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equal = document.querySelector("#equal");
const decimalBtn = document.querySelector("#dot");
const sqrtBtn = document.querySelector("#sqrt");
const plusMinusBtn = document.querySelector("#plus-minus");

let operand1 = null;
let operator = null;
let dotPressed = false;

// Displaying numbers //

function appendNumber(value) {
  const clickedNumber = value.target;
  const inputValue = resultDisplay.textContent;

  if (inputValue === "0") {
    resultDisplay.textContent = clickedNumber.textContent;
  } else {
    resultDisplay.textContent += clickedNumber.textContent;
  }
}

// Displaying numbers //

// Calculation function //

function calculation() {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (operand1 !== null && operator !== null) {
    let result;

    switch (operator) {
      case "+":
        result = operand1 + inputValue;
        break;
      case "-":
        result = operand1 - inputValue;
        break;
      case "x":
        result = operand1 * inputValue;
        break;
      case "÷":
        result = operand1 / inputValue;
        if (inputValue !== 0) {
          result = operand1 / inputValue;
        } else {
          resultDisplay.textContent = "Error";
          return;
        }
        break;
      case "%":
        result = (operand1 / 100) * inputValue;
        break;
      default:
        break;
    }

    if (Number.isInteger(result)) {
      resultDisplay.textContent = result.toFixed(0);
    } else {
      resultDisplay.textContent = result.toFixed(1);
    }

    values.textContent = operand1 + " " + operator + " " + inputValue + " = ";

    operand1 = result;
    operator = null;
  }

  dotPressed = false;
}

// Calculation function //

// Calculation of square root //

sqrtBtn.addEventListener("click", () => {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (!isNaN(inputValue) && inputValue >= 0) {
    const sqrtResult = Math.sqrt(inputValue);

    if (Number.isInteger(sqrtResult)) {
      values.textContent = "√" + inputValue + " = " + sqrtResult.toFixed(0);
    } else {
      values.textContent = "√" + inputValue + " = " + sqrtResult.toFixed(3);
    }

    resultDisplay.textContent = "√" + inputValue + " = ";
    operand1 = sqrtResult;
    dotPressed = false;
  } else {
    resultDisplay.textContent = "Error";
  }
});

// Calculation of square root //

// Clear last integer or operator on display //

function clearLast() {
  let inputValue = resultDisplay.textContent;
  if (inputValue.length > 1) {
    inputValue = inputValue.slice(0, -1);
    resultDisplay.textContent = inputValue;
  } else {
    resultDisplay.textContent = "0";
  }
}

// Clear last integer or operator on display //

// Clear all elements on display //

function clearDisplay() {
  values.style.visibility = "hidden";
  resultDisplay.textContent = "0";
  operand1 = null;
  operator = null;
  dotPressed = false;
  values.textContent = "0";
}

// Clear all elements on display //

// Keyboard support //

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key === "Enter" || key === "=") {
    calculation();
  }
  if (key === "Backspace") {
    clearLast();
  }

  if (key === "Escape" || key === "c" || key === "C") {
    clearDisplay();
  }

  if (!isNaN(key) || key === ".") {
    appendNumber({ target: { textContent: key } });
  }

  if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
    const operatorButton = document.querySelector(`[data-value="${key}"]`);
    if (operatorButton) {
      operatorButton.click();
    }
  }
});
// Keyboard support //

operatorBtns.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    values.style.visibility = "visible";
    operand1 = Number(resultDisplay.textContent);
    operator = operatorButton.getAttribute("data-value");
    values.textContent = operand1 + " " + operator;
    resultDisplay.textContent = "0";
  });
});

numberBtns.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

equal.addEventListener("click", calculation);

clearAll.addEventListener("click", clearDisplay);

deleteBtn.addEventListener("click", clearLast);

decimalBtn.addEventListener("click", () => {
  const inputValue = resultDisplay.textContent;

  if (!inputValue.includes(".")) {
    resultDisplay.textContent += ".";
  }
});

plusMinusBtn.addEventListener("click", () => {
  const currentValue = parseFloat(resultDisplay.textContent);

  if (!isNaN(currentValue)) {
    const newValue = -currentValue;
    resultDisplay.textContent = newValue;
  }
});
