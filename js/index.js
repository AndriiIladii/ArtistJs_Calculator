const numberBtns = document.querySelectorAll(".btn");
const operatorBtns = document.querySelectorAll(".operator");
const inputAnswer = document.querySelector(".result");
const values = document.querySelector(".values");
const clearAll = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equal = document.querySelector("#equal");

let operand1 = null;
let operator = null;

function clearDisplay() {
  values.style.visibility = "hidden";
  inputAnswer.textContent = "0";
  operand1 = null;
  operator = null;
  values.textContent = "0";
}

function appendNumber(value) {
  const clickedNumber = value.target;
  const inputValue = inputAnswer.textContent;

  if (inputValue === "0") {
    inputAnswer.textContent = clickedNumber.textContent;
  } else {
    inputAnswer.textContent += clickedNumber.textContent;
  }
}

function calculation() {
  const inputValue = inputAnswer.textContent;

  if (operand1 !== null && operator !== null) {
    let result;

    switch (operator) {
      case "+":
        result = operand1 + parseFloat(inputValue);
        break;
      case "-":
        result = operand1 - parseFloat(inputValue);
        break;
      case "x":
        result = operand1 * parseFloat(inputValue);
        break;
      case "÷":
        result = operand1 / parseFloat(inputValue);
        break;
      case "%":
        result = (operand1 / 100) * parseFloat(inputValue);
        break;
      default:
        break;
    }

    if (result % 1 === 0) {
      inputAnswer.textContent = result.toFixed(0);
    } else {
      inputAnswer.textContent = result.toFixed(2);
    }

    values.textContent = operand1 + " " + operator + " " + inputValue + " = ";

    operand1 = null;
    operator = null;
  }
}

function clearLast() {
  let inputValue = inputAnswer.textContent;
  if (inputValue.length > 1) {
    inputValue = inputValue.slice(0, -1);
    inputAnswer.textContent = inputValue;
  } else {
    inputAnswer.textContent = "0";
  }
}

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", () => {
    values.style.visibility = "visible";
    operand1 = parseFloat(inputAnswer.textContent);
    operatorBtn = operator.textContent;
    values.textContent = operand1 + " " + operatorBtn;
    inputAnswer.textContent = "0";
  });
});

numberBtns.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

equal.addEventListener("click", calculation);

clearAll.addEventListener("click", clearDisplay);

deleteBtn.addEventListener("click", clearLast);
