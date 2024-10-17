const enumModes = {
  view: "view",
  draw: "draw",
};
let currentMode = enumModes.view;

const handleChangeModeDrawer = () => {
  const appRef = document.querySelector(".app");
  const changeButtonRef = document.querySelector("#change-mode");

  if (currentMode === enumModes.view) {
    appRef.classList.add("mode-draw");
    currentMode = enumModes.draw;
    enalbleDrawCanvas();
    changeButtonRef.textContent = "Desativar modo de desenho";
  } else {
    appRef.classList.remove("mode-draw");
    currentMode = enumModes.view;
    disableDrawCanvas();
    changeButtonRef.textContent = "Ativar modo de desenho";
  }
};