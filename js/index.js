const result = document.querySelector("#result");
const expression = document.querySelector("#expression");
const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
  result.innerHTML = "";
  expression.innerHTML = "";
});
