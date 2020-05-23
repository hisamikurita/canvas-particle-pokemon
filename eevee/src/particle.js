import { Utils } from './util';

const mouse = {};
// const colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

export class Particle {
  constructor(x, y, color) {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext("2d");
    this.color = color;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.x2 = x;
    this.y2 = y;
    this.vx = 0;
    this.vy = 0;
    this.dx = 0;
    this.dy = 0;
    this.ax = (Math.random() - 0.5);
    this.ay = (Math.random() - 0.5);
    this.radius = 2;
    this.friction = Math.random() * 0.05 + 0.94;
    this.speed = 20;
  }
  update() {
    this.dist = Utils.distanceXY(this.x, this.y, mouse.x, mouse.y);
    if (this.dist < this.radius * 20) {
      this.dx += this.ax * mouse.x / 300;
      this.dy += this.ay * mouse.y / 300;
    }
    this.vx = (this.x2 - this.x) / this.speed;
    this.vy = (this.y2 - this.y) / this.speed;
    this.x += this.vx;
    this.y += this.vy;
    this.dx *= this.friction;
    this.dy *= this.friction;
    this.x += this.dx;
    this.y += this.dy;
  }
  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill()
    this.ctx.restore();
  }
}