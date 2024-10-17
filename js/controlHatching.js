const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = new Image();
let hachuras = [];
let zoomLevel = 1;
let isDrawing = false;
let startX, startY, currentX, currentY;
let offsetX = 0;
let offsetY = 0;
let hachuraIndex = 0;

const drawCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(zoomLevel, zoomLevel);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  hachuras.sort((a, b) => a.index - b.index);
  hachuras.forEach((h) => {
    ctx.fillStyle = h.color;
    ctx.fillRect(h.x, h.y, h.width, h.height);
  });

  if (isDrawing) {
    const rect = calculateRect(startX, startY, currentX, currentY);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  ctx.restore();
};

const setBackgroundCanvas = (src) => {
  image.src = src;
  image.onload = async () => {
    drawCanvas();
    removeAllHachuras();

    const pageId = await generateImageHash(src);

    const storedHachuras = getHachsFromStore(pageId);
    if (storedHachuras) {
      hachuras = JSON.parse(storedHachuras);
      hachuraIndex =
        hachuras.length > 0 ? Math.max(...hachuras.map((h) => h.index)) + 1 : 0;
      drawCanvas();
    }
  };
};

const getMousePosition = (e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left - offsetX) / zoomLevel,
    y: (e.clientY - rect.top - offsetY) / zoomLevel,
  };
};

const calculateRect = (startX, startY, endX, endY) => {
  const width = endX - startX;
  const height = endY - startY;

  return {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: Math.abs(width),
    height: Math.abs(height),
  };
};

const startDrawing = (e) => {
  e.preventDefault();

  const button = e.button;

  if (button === 2 || button === 1) {
    const pos = getMousePosition(e);
    startX = pos.x;
    startY = pos.y;
    isDrawing = true;
  }
};

const endDrawing = (e) => {
  if (!isDrawing) return;

  const rect = calculateRect(startX, startY, currentX, currentY);

  hachuras.push({
    index: hachuraIndex++, // Incrementa o índice para cada nova hachura
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    color: "rgba(0, 0, 0, 0.5)", // Cor do quadrado de hachura
  });

  saveHachsOnStore(hachuras);
  drawCanvas();
  isDrawing = false;
};

const draw = (e) => {
  if (!isDrawing) return;

  const pos = getMousePosition(e);
  currentX = pos.x;
  currentY = pos.y;
  drawCanvas();
};

const isHachuraClicked = (hachura, x, y) => {
  return (
    x >= hachura.x &&
    x <= hachura.x + hachura.width &&
    y >= hachura.y &&
    y <= hachura.y + hachura.height
  );
};

const disableDrawCanvas = () => {
  canvas.removeEventListener("mousedown", startDrawing, false);
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mouseup", endDrawing, false);
};

const enalbleDrawCanvas = () => {
  canvas.addEventListener("mousedown", startDrawing, false);
  canvas.addEventListener("mousemove", draw, false);
  canvas.addEventListener("mouseup", endDrawing, false);
};

const removeAllHachuras = () => {
  hachuras = [];
  drawCanvas();
};

const generateImageHash = async (base64String) => {
  const base64Data = base64String.split(",")[1];
  const binary = atob(base64Data);
  const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

canvas.addEventListener("click", function (e) {
  if (currentMode === enumModes.draw) {
    const pos = getMousePosition(e);
    const x = pos.x;
    const y = pos.y;

    const clickedHachura = hachuras.findIndex((h) => isHachuraClicked(h, x, y));
    if (clickedHachura !== -1) {
      hachuras.splice(clickedHachura, 1);
      saveHachsOnStore(hachuras);
      drawCanvas();
    }
  }
});

canvas.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

canvas.addEventListener("wheel", function (e) {
  e.preventDefault();

  const zoomAmount = 0.1;
  const rect = canvas.getBoundingClientRect();

  // Posição do mouse relativa ao canvas considerando o zoom atual e os offsets
  const mouseX = (e.clientX - rect.left - offsetX) / zoomLevel;
  const mouseY = (e.clientY - rect.top - offsetY) / zoomLevel;

  // Armazena o zoom anterior
  const prevZoomLevel = zoomLevel;

  if (e.deltaY < 0) {
    // Zoom in
    zoomLevel += zoomAmount;
  } else {
    // Zoom out, mas limitado ao zoom inicial (1)
    zoomLevel = Math.max(1, zoomLevel - zoomAmount);
  }

  // Ajusta os offsets para garantir que o zoom seja centralizado no ponto do mouse
  offsetX -= mouseX * (zoomLevel - prevZoomLevel);
  offsetY -= mouseY * (zoomLevel - prevZoomLevel);

  // Redesenha o canvas com o novo zoom e offsets
  drawCanvas();
});
