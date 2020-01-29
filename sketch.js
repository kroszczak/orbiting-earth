
class object{

  constructor(x, y, r, a, o, img){

    this.x = x;
    this.y = y; 
    this.history = [];
    this.rad = r;
    this.angle = a;
    this.orbit = o;
    this.img = img;
  }

}


const stars = [];
let earth = new object(0, 0, 80, 0, 400, null);
let moon = new object(0, 0, 20, 0, 100, null);

let x8 = 0;

function preload(){
  earth.img = loadImage('images/earth.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES); 

  for(let i = 0; i < 80; i++){
    stars.push(new object(random(0, 2100), random(0, 1200), random(1, 9), null));
  }
}


function draw() {

  stat();

  earth.x = width/2 + earth.orbit * cos(earth.angle); earth.y =  height/2 + earth.orbit * sin(earth.angle);

  push();
    translate(earth.x, earth.y);
    rotate(x8);
    x8 += 0.8;
    image(earth.img, 0, 0, earth.rad, earth.rad);//earth
    earth.angle += 0.664;
  pop();

  fill(200);
  circle(earth.x + moon.orbit * cos(moon.angle), earth.y + moon.orbit * sin(moon.angle), moon.rad);
  moon.angle += -2;
 
  
}


function stat(){
  background(10, 15, 27);
  
  fill(255);
  for(let i = 0; i < 80; i++){
    circle(stars[i].x, stars[i].y, stars[i].rad);
  }

  fill(250, 180, 0);
  circle(width/2, height/2, 200);
}