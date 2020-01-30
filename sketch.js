
class test_class{

  constructor(x, y, y2, x2, r){
    this.vector = [x, y];
    this.x = x2;
    this.y = y2;
    this.r = r;
    this.history = [];
  }

  display(){

    circle(this.x, this.y, this.r);
    this.x += this.vector[0]; this.y += this.vector[1];
    this.history.unshift(createVector(this.x, this.y));
    arr = this.history.slice(0, 100); 
    arr.forEach((item, index) => {
      index < 15 ? square(item.x, item.y, 3): index < 30 ? square(item.x, item.y, 2.6): index < 45 ? square(item.x, item.y, 2.4): index < 60 ? square(item.x, item.y, 2.2): index < 75 ? square(item.x, item.y, 1.9): index < 85 ? square(item.x, item.y, 1.6): index < 95? square(item.x, item.y, 1.2): square(item.x, item.y, 0.8);
    })
  }
}

class star{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.rad = r;
  }
}
class object{

  constructor(rad, orbit, options, move, rot_chng, satellites){

    this.x = 0;
    this.y = 0; 
    this.history = [];
    this.rad = rad;
    this.angle = 0;
    this.orbit = orbit;
    this.img = options.img;
    this.col = options.col;
    this.rot = 0;
    this.move = move;
    this.rot_change = rot_chng;
    this.satellites = satellites || [];
  }

  display(xp, yp){
    
    this.x = xp + this.orbit * cos(this.angle);
    this.y = yp + this.orbit * sin(this.angle);
    this.history.unshift(createVector(this.x, this.y));
    arr = this.history.slice(0, 100); 
    arr.forEach((item, index) => {
      index < 15 ? square(item.x, item.y, 3): index < 30 ? square(item.x, item.y, 2.6): index < 45 ? square(item.x, item.y, 2.4): index < 60 ? square(item.x, item.y, 2.2): index < 75 ? square(item.x, item.y, 1.9): index < 85 ? square(item.x, item.y, 1.6): index < 95? square(item.x, item.y, 1.2): square(item.x, item.y, 0.8);
    })
    fill(255);
    push();
    translate(this.x, this.y);
      rotate(this.rot); this.rot += this.rot_change;
      if (this.col) fill(this.col[0], this.col[1], this.col[2]);
      this.img == null ? circle(0, 0, this.rad) :image(this.img, 0, 0, this.rad, this.rad);
      this.angle += this.move;
    pop();

    for(let i = 0; i < this.satellites.length; i++){
        this.satellites[i].display(this.x, this.y)}
  }
}


const stars = [];
const ast = [];
const objects = [
  moon = new object(8, 50, {col: 200}, 9, 0.6),
  wenus = new object(22, 200, {col: [40, 90, 240]}, 0.8, 0),
  merkury = new object(13, 115, {col: [230, 230, 230]}, 1.2, 2),
  earth = new object(40, 300, {img: "images/earth.png"}, 0.5, -1.5, [moon]),
  mars = new object(30, 420, {col: [243, 130, 53]}, 0.3, 0),
  sun = new object(100, 0, {col: [243, 190, 23]}, 0, 0, [earth, merkury, wenus, mars]),
  solar_system = new object(0, 0, {col: 0}, 0, 0, [sun])
];
let arr = [];


function preload(){
  for(let i = 0; i < objects.length; i++){
    if(objects[i].img != null){objects[i].img = loadImage(objects[i].img);}}
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES); 
  noStroke();

  for(let i = 0; i < 100; i++){
    stars.push(new star(random(0, 2100), random(0, 1200), random(1, 9)));
  }
  let rand = random(6, 60);
  for(let i = 0; i < rand; i++){
    ast.push(new test_class(random(2,4), random(1,3), random(-1000, -100), random(-1000, 1800), random(7, 22)));
  }

}


function draw() {

  stat();
  for(let i = 0; i < ast.length; i++){
    ast[i].display();
  }
  solar_system.display(width/2, height/2);

}

function stat(){
  background(10, 15, 27);
  
  fill(255);
  for(let i = 0; i < 100; i++){
    circle(stars[i].x, stars[i].y, stars[i].rad);
  }
}
