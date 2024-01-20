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

function clearDisplay() {
  values.style.visibility = "hidden";
  resultDisplay.textContent = "0";
  operand1 = null;
  operator = null;
  dotPressed = false;
  values.textContent = "0";
}

sqrtBtn.addEventListener("click", () => {
  const inputValue = parseFloat(resultDisplay.textContent);

  if (inputValue >= 0) {
    const sqrtResult = Math.sqrt(inputValue);

    if (Number.isInteger(sqrtResult)) {
      resultDisplay.textContent = sqrtResult.toFixed(0);
    } else {
      resultDisplay.textContent = sqrtResult.toFixed(3);
    }

    values.textContent = "√" + inputValue + " = ";
    operand1 = null;
    operator = null;
    dotPressed = false;
  } else {
    resultDisplay.textContent = "Error";
  }
});

function appendNumber(value) {
  const clickedNumber = value.target;
  const inputValue = resultDisplay.textContent;

  if (inputValue === "0") {
    resultDisplay.textContent = clickedNumber.textContent;
  } else {
    resultDisplay.textContent += clickedNumber.textContent;
  }
}

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

    operand1 = null;
    operator = null;
  }

  dotPressed = false;
}

function clearLast() {
  let inputValue = resultDisplay.textContent;
  if (inputValue.length > 1) {
    inputValue = inputValue.slice(0, -1);
    resultDisplay.textContent = inputValue;
  } else {
    resultDisplay.textContent = "0";
  }
}

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
