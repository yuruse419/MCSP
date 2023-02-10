export default class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.red = random(255);
        this.green = random(255);
        this.blue = random(255);
        this.alpha = random(255);
    }

    show() {
        stroke(255);
        strokeWeight(0);
        fill(this.red, this.green, this.blue, this.alpha);
    }
}

export class DVD {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    strokeWeight(10); // Changes the thickness of each line
    noFill(); // Disables color filling of shapes
    
    beginShape();
      // First "D"
        line(this.x, this.y, this.x, this.y + 100); // To make the line of the "D"
        bezier(this.x, this.y, this.x + 50, this.y + 50, this.x + 50, this.y + 50, this.x, this.y + 100); // To make the curve of the "D"
          // parameters: bezier(first-x-anchor, first-y-anchor, first-x-control-point, first-y-control-point, second-x-control-point, second-y-control-point, second-x-anchor, second-y-anchor);

      // "V"
        line(this.x + 40, this.y, this.x + 65, this.y + 100);
        line(this.x + 65, this.y + 100, this.x + 90, this.y);

      // Second "D"
        line(this.x + 100, this.y, this.x + 100, this.y + 100); // To make the line of the "D"
        bezier(this.x + 100, this.y, this.x + 150, this.y + 50, this.x + 150, this.y + 50, this.x + 100, this.y + 100); // To make the curve of the "D"
    endShape();
  }

  transform() {
    // Do nothing.
  }
}

export class Circle extends Shape {
    constructor(x, y, r) {
      super(x, y, red, green, blue, alpha);
      this.r = r;
      this.speed = 3;
    }
  
    show() {
      super.show();
      circle(this.x, this.y, this.r * 2);
    }
  
    transform() {
      if (this.x > width) {
        this.speed = -3;
      }
  
      if (this.x < 0) {
        this.speed = 3;
      }
  
      this.x = this.x + this.speed;
      this.y = this.y + random(-2, 2);
    }
  }
  
  export class Ellipse extends Shape {
    constructor(x, y, ew, eh) {
        super(x, y, red, green, blue, alpha);
        this.ew = ew;
        this.eh = eh;
        this.pulse = 5;
    }
  
    show() {
        super.show();
        ellipse(this.x, this.y, this.ew, this.eh);
    }
  
    transform() {
      if (this.ew > 300) {
        this.pulse = -5;
      }
  
      if (this.ew < 100) {
        this.pulse = 5;
      }
  
      this.ew = this.ew + this.pulse;
      this.eh = this.eh + this.pulse;
    }
  }
  
  export class Rectangle extends Shape {
    constructor(obj) {
         super(red, green, blue, alpha);
         this.x = obj.x;
         this.y = obj.y;
         this.h = obj.h;
         this.w = obj.w;
    }
  
    show() {
        super.show();
        rect(this.x, this.y, this.w, this.h);
    }
  
    transform() {
      // Do nothing.
    }
  }