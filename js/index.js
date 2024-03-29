const numberBtns = document.querySelectorAll(".btn");
const operatorBtns = document.querySelectorAll(".operator");
const resultDisplay = document.querySelector(".result");
const values = document.querySelector(".values");
const clearAll = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equal = document.querySelector("#equal");
const decimalBtn = document.querySelector("#dot");
const sqrtBtn = document.querySelector("#sqrt");
const squareBtn = document.querySelector("#square");
const plusMinusBtn = document.querySelector("#plus-minus");
const trigonometryBtns = document.querySelectorAll(".trigonometry");
const HistoryBtn = document.querySelector(".history__btn");
const HistoryDisplay = document.querySelector(".history");

const history = [];
let operand1 = null;
let operator = null;
let dotPressed = false;

// Displaying numbers //

function appendNumber(value) {
  const clickedNumber = value.target;
  const inputValue = resultDisplay.textContent;

  if (inputValue === "0" || resultDisplay.textContent === "Error") {
    resultDisplay.textContent = clickedNumber.textContent;
  } else {
    resultDisplay.textContent += clickedNumber.textContent;
  }
}
// Displaying numbers //

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
  resultDisplay.textContent = "0";
  operand1 = null;
  operator = null;
  dotPressed = false;
  values.textContent = "0";
}

// Clear all elements on display //

// Calculation function //

function calculation() {
  let inputValue = parseFloat(resultDisplay.textContent);

  if (operand1 !== null && operator !== null) {
    let result;

    switch (operator) {
      case "+":
        result = PlusOperation(operand1, inputValue);
        break;
      case "-":
        result = MinusOperation(operand1, inputValue);
        break;
      case "x":
        result = MultiplyOperation(operand1, inputValue);
        break;
      case "÷":
        result = DivisionOperation(operand1, inputValue);
        if (inputValue !== 0) {
          result = operand1 / inputValue;
        } else {
          resultDisplay.textContent = "Error";
          return;
        }
        break;
      case "%":
        result = PercentOperation(operand1, inputValue);
        break;
      case "^":
        result = PowerOperation(operand1, inputValue);
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
    const calculationHistory = `${operand1} ${operator} ${inputValue} = ${result}`;
    history.push(calculationHistory);
    renderHistory(history);

    operand1 = result;
    operator = null;
  }

  dotPressed = false;
}

function PlusOperation(a, b) {
  return a + b;
}

function MinusOperation(a, b) {
  return a - b;
}

function DivisionOperation(a, b) {
  return a / b;
}

function MultiplyOperation(a, b) {
  return a * b;
}

function PercentOperation(a, b) {
  return (a / 100) * b;
}

function PowerOperation(a, b) {
  return Math.pow(a, b);
}

// Calculation function //

// Trigonometry calculation //
trigonometryBtns.forEach((trigonometryBtn) => {
  trigonometryBtn.addEventListener("click", () => {
    const trigFunction = trigonometryBtn.id;
    calculateTrigonometry(trigFunction);
  });
});

function calculateTrigonometry(trigFunction) {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (!isNaN(inputValue)) {
    let result;

    switch (trigFunction) {
      case "sin":
        result = Math.sin(inputValue);
        break;
      case "cos":
        result = Math.cos(inputValue);
        break;
      case "tan":
        result = Math.tan(inputValue);
        break;
      case "acos":
        result = Math.acos(inputValue);
        break;
      case "atan":
        result = Math.atan(inputValue);
        break;
      default:
        break;
    }

    if (Number.isInteger(result)) {
      resultDisplay.textContent = result.toFixed(0);
    } else {
      resultDisplay.textContent = result.toFixed(5);
    }

    const calculationHistory = `${trigFunction}(${inputValue}) = ${result}`;
    history.push(calculationHistory);
    renderHistory(history);

    operand1 = result;
    operator = null;
    dotPressed = false;

    values.textContent = trigFunction + "(" + inputValue + ") = ";
  } else {
    resultDisplay.textContent = "Error";
  }
}

// Trigonometry calculation //

// Calculation of square root //

function calculateSquareRoot() {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (!isNaN(inputValue) && inputValue >= 0) {
    const sqrtResult = Math.sqrt(inputValue);

    if (Number.isInteger(sqrtResult)) {
      resultDisplay.textContent = sqrtResult.toFixed(0);
    } else {
      resultDisplay.textContent = sqrtResult.toFixed(3);
    }

    values.textContent = "√" + inputValue + " = ";
    const calculationHistory = `√${inputValue} = ${sqrtResult}`;
    history.push(calculationHistory);
    renderHistory(history);
    operand1 = sqrtResult;
    dotPressed = false;
  } else {
    resultDisplay.textContent = "Error";
  }
}

// Calculation of square root //

// Calculation of square //

function calculateSquare() {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (!isNaN(inputValue)) {
    const squareResult = Math.pow(inputValue, 2);

    if (Number.isInteger(squareResult)) {
      resultDisplay.textContent = squareResult.toFixed(0);
    } else {
      resultDisplay.textContent = squareResult.toFixed(3);
    }

    values.textContent = inputValue + "² = ";
    const calculationHistory = `${inputValue}² = ${squareResult}`;
    history.push(calculationHistory);
    renderHistory(history);
    operand1 = squareResult;
    dotPressed = false;
  } else {
    resultDisplay.textContent = "Error";
    values.textContent = "";
  }
}

// Calculation of square //

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

  if (key === "Escape") {
    const history = document.querySelector(".history__active");
    if (history) {
      history.classList.remove("history__active");
    }
  }
});
// Keyboard support //

// History displaying and clicking functions //

function renderHistory(historyArr) {
  const historyBlock = document.querySelector(".history");
  historyBlock.innerHTML = "";

  historyArr.forEach((calculation) => {
    const historyItem = document.createElement("p");
    historyItem.textContent = calculation;
    historyItem.classList.add("history-item");
    historyBlock.appendChild(historyItem);
  });

  const historyItems = document.querySelectorAll(".history-item");

  historyItems.forEach((historyItem) => {
    historyItem.addEventListener("click", () => {
      const historyText = historyItem.textContent;
      const [expression, result] = historyText
        .split("=")
        .map((item) => item.trim());

      if (expression && result) {
        values.textContent = expression;
        resultDisplay.textContent = result;
        HistoryDisplay.classList.remove("history__active");
      }
    });
  });
}

// History displaying and clicking functions //

operatorBtns.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    values.style.visibility = "visible";
    if (operand1 !== null && operator !== null) {
      calculation();
    }
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

sqrtBtn.addEventListener("click", () => {
  calculation();
  calculateSquareRoot();
});

squareBtn.addEventListener("click", () => {
  calculation();
  calculateSquare();
});

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

HistoryBtn.addEventListener("click", () => {
  HistoryDisplay.classList.toggle("history__active");
});
