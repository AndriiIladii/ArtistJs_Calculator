const calculate = () => {
  const firstNumber = parseInt(document.getElementById("firstNumber").value);
  const secondNumber = parseInt(document.getElementById("secondNumber").value);
  const operator = document.getElementById("operator").value;

  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;

    case "/":
      result = firstNumber / secondNumber;
      break;
  }

  document.getElementById("output").innerHTML = `Result: ${result}`;
};
