'use strict';

const canvas = document.querySelector('#wall'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const minElements = 25,
      maxElements = 100,
      maxSize = 0.6,
      minSize = 0.1,
      minSpeed = -0.2,
      maxSpeed = 0.2,
      time = Date.now(),
      elements = [];
function getIntRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getDblRandom(min, max) {
  return (Math.random() * (max - min) + min);
}

const pointFunctions = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];

class Element {
  constructor() {
    this.x = getIntRandom(0, canvas.width);
    this.y = getIntRandom(0, canvas.height);
    this.size = getDblRandom(minSize, maxSize);
    this.nextPoint = pointFunctions[getIntRandom(0, pointFunctions.length - 1)];
  }
}
class Circle extends Element {
  constructor() {
    super();
  }
  draw(x, y) {
    ctx.beginPath();
    ctx.lineWidth = this.size * 5;
    ctx.strokeStyle = 'white';
    ctx.arc(x, y, 12 * this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
  move() {
    const newPoint = this.nextPoint(this.x, this.y, Date.now());
    this.draw(newPoint.x, newPoint.y);
  }
}
class Cross extends Element {
  constructor() {
    super();
    this.rotateAngle = getIntRandom(0, 360);
    this.rotateSpeed = getDblRandom(minSpeed, maxSpeed);
  }
  draw(x, y) {
    ctx.beginPath();
    ctx.lineWidth = this.size * 5;
    ctx.strokeStyle = 'white';
    ctx.translate(x, y);
    ctx.rotate(this.rotateAngle * Math.PI / 180);
    ctx.moveTo(20 * this.size / 2, 20 * this.size / 2);
    ctx.lineTo(-20 * this.size / 2, -20 * this.size / 2);
    ctx.moveTo(-20 * this.size / 2, 20 * this.size / 2);
    ctx.lineTo(20 * this.size / 2, -20 * this.size / 2);
    ctx.rotate(-this.rotateAngle * Math.PI / 180);
    ctx.translate(-x, -y);
    ctx.stroke();
    ctx.closePath();
  }
  move() {
    const newPoint = this.nextPoint(this.x, this.y, Date.now());
    this.draw(newPoint.x, newPoint.y);
    this.rotateAngle += this.rotateSpeed / Math.PI * 180;
  }
}

function drawBackground() {
  const numOfElements = getIntRandom(minElements, maxElements);
  for (let i = 0; i < numOfElements; i++) {
    const circle = new Circle();
    circle.draw(circle.x, circle.y);
    elements.push(circle);
    const cross = new Cross();
    cross.draw(cross.x, cross.y);
    elements.push(cross);
  }
}
document.addEventListener('DOMContentLoaded', drawBackground);
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  elements.forEach(element => element.move());
}, 50);
