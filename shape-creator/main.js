import {DVD, Circle, Ellipse, Rectangle} from './shapes.js';

const circ = document.querySelector("#circ");
const inputForm = document.querySelector("#inputForm");
const ellip = document.querySelector("#ellip");
const reset = document.querySelector("#reset");
const rectWidth = document.querySelector("#rectWidth");
const rectHeight = document.querySelector("#rectHeight");
const rectX = document.querySelector("#rectX");
const rectY = document.querySelector("#rectY");

let shapes = [];

createDVD();

function createDVD() {
  const shape = new DVD(100, 100);
  shapes.push(shape);
}

function createRectangle(e) {
  e.preventDefault();
  const rectObj = {
    w: rectWidth.value,
    h: rectHeight.value,
    x: rectX.value,
    y: rectY.value,
  };

  const shape = new Rectangle(rectObj);
  shapes.push(shape);
  rectHeight.value = "";
  rectWidth.value = "";
  rectX.value = "";
  rectY.value = "";
}

function createEllipse() {
  let x = random(width);
  let y = random(height);
  let ew = random(100, 200);
  let eh = random(100, 200);
  let shape = new Ellipse(x, y, ew, eh);
  shapes.push(shape);
}

function createCircle() {
  let x = random(width);
  let y = random(height);
  let r = random(20, 150);
  let shape = new Circle(x, y, r);
  shapes.push(shape);
}

function resetCanvas() {
  shapes = [];
}

function loadEventListeners() {
  circ.addEventListener("click", createCircle);
  ellip.addEventListener("click", createEllipse);
  reset.addEventListener("click", resetCanvas);
  inputForm.addEventListener("submit", createRectangle);
}

loadEventListeners();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#f4f4f4");
  for (let shape of shapes) {
    shape.show();
    shape.transform();
  }
}

// Classes
// class Circle {
//   constructor(x, y, r) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.red = random(255);
//     this.green = random(255);
//     this.blue = random(255);
//     this.alpha = random(255);
//     this.speed = 3;
//   }

//   show() {
//     stroke(255);
//     strokeWeight(0);
//     fill(this.red, this.green, this.blue, this.alpha);
//     circle(this.x, this.y, this.r * 2);
//   }

//   transform() {
//     if (this.x > width) {
//       this.speed = -3;
//     }

//     if (this.x < 0) {
//       this.speed = 3;
//     }

//     this.x = this.x + this.speed;
//     this.y = this.y + random(-2, 2);
//   }
// }

// class Ellipse {
//   constructor(x, y, ew, eh) {
//     this.x = x;
//     this.y = y;
//     this.ew = ew;
//     this.eh = eh;
//     this.red = random(255);
//     this.green = random(255);
//     this.blue = random(255);
//     this.alpha = random(255);
//     this.pulse = 5;
//   }

//   show() {
//     stroke(255);
//     strokeWeight(0);
//     fill(this.red, this.green, this.blue, this.alpha);
//     ellipse(this.x, this.y, this.ew, this.eh);
//   }

//   transform() {
//     if (this.ew > 300) {
//       this.pulse = -5;
//     }

//     if (this.ew < 100) {
//       this.pulse = 5;
//     }

//     this.ew = this.ew + this.pulse;
//     this.eh = this.eh + this.pulse;
//   }
// }

// class Rectangle {
//   constructor(obj) {
//     this.x = obj.x;
//     this.y = obj.y;
//     this.h = obj.h;
//     this.w = obj.w;
//     this.red = random(255);
//     this.green = random(255);
//     this.blue = random(255);
//     this.alpha = random(255);
//   }

//   show() {
//     stroke(255);
//     strokeWeight(0);
//     fill(this.red, this.green, this.blue, this.alpha);
//     rect(this.x, this.y, this.w, this.h);
//   }

//   transform() {
//     // Do nothing.
//   }
// }

window.setup = setup;
window.draw = draw;
