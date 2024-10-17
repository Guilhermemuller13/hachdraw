const enumModes = {
  view: "view",
  draw: "draw",
};
let currentMode = enumModes.view;

const handleChangeModeDrawer = () => {
  const appRef = document.querySelector(".app");

  if (currentMode === enumModes.view) {
    appRef.classList.add("mode-draw");
    currentMode = enumModes.draw;
    enalbleDrawCanvas();
  } else {
    appRef.classList.remove("mode-draw");
    currentMode = enumModes.view;
    disableDrawCanvas();
  }
};
