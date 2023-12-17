const display = document.querySelector(".calc__screen");
const equals = document.querySelector("#equal");
const buttons = document.querySelectorAll(".btn");
const deleteButton = document.querySelector("#delete");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let itemText = event.target.textContent;

    if (itemText === "*") {
      itemText = "*";
    }

    if (itemText === "/") {
      itemText = "/";
    }

    if (itemText === "Ac") {
      display.value = "";
    }

    if (button.id === "delete") {
      display.value = display.value.toString().slice(0, -1);
    }

    if (button.id !== "delete" && itemText !== "Ac" && itemText !== "=") {
      display.value += itemText;
    }

    if (itemText === "=") {
      display.value = eval(display.value);
    }
  });
});
