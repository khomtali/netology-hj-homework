'use strict';
const canvas = document.querySelector('#draw'),
      ctx = canvas.getContext('2d');

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', () => {
  clearCanvas();
  setCanvasSize();
});
window.ondblclick = () => {
  clearCanvas();
};

const maxBrushRadius = 100, // set limits of brush parameters
      minBrushRadius = 5,
      maxBrushColor = 359,
      minBrushColor = 0;
let drawing = false, // set auxiliary variables
    needsRepaint = false,
    reverse = false,
    brushRadius = maxBrushRadius,
    brushColor = minBrushColor,
    increaseBrush = false,
    prevX, prevY;

function getHSL(color) { // convert color to HSL
  return `hsl(${color}, 100%, 50%)`;
}
function setBrushColor(color, reverse) { // change color depending on conditions
  if (reverse) {
    if (color > minBrushColor) {
      return --color;
    } else if (color === minBrushColor) {
      return color;
    }
  } else {
    if (color < maxBrushColor) {
      return ++color;
    } else if (color === maxBrushColor) {
      return color;
    }
  }
}
function setBrushRadius(radius) { // change radius depending on conditions
  if (radius === maxBrushRadius) {
    increaseBrush = false;
  } else if (radius === minBrushRadius) {
    increaseBrush = true;
  }
  return increaseBrush ? ++radius : --radius;
}
// curves and figures
function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = getHSL(brushColor);
  ctx.strokeStyle = getHSL(brushColor);
  ctx.arc(...point, brushRadius / 2, 0, 2 * Math.PI);
  ctx.fill();
}
function smoothCurve(point) {
  ctx.beginPath();
  ctx.lineWidth = brushRadius;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.fillStyle = getHSL(brushColor);
  ctx.strokeStyle = getHSL(brushColor);
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(...point);
  ctx.stroke();
  brushColor = setBrushColor(brushColor, reverse);
  brushRadius = setBrushRadius(brushRadius);
}
// events
canvas.addEventListener('mousedown', (event) => {
  drawing = true;
  circle([event.offsetX, event.offsetY]);
  prevX = event.offsetX;
  prevY = event.offsetY;
});
canvas.addEventListener('mouseup', () => {
  drawing = false;
});
canvas.addEventListener('mouseleave', () => {
  drawing = false;
});
canvas.addEventListener('mousemove', (event) => {
  reverse = event.shiftKey;
  if (drawing) {
    smoothCurve([event.offsetX, event.offsetY]);
    prevX = event.offsetX;
    prevY = event.offsetY;
  }
});
