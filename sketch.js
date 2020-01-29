
class object{

  constructor(x, y, rad, angle, orbit, img, col, move, rot_chng){

    this.x = x;
    this.y = y; 
    this.history = [];
    this.rad = rad;
    this.angle = angle;
    this.orbit = orbit;
    this.img = img;
    this.col = col;
    this.rotation = 0.1;
    this.move = move;
    this.rot_change = rot_chng;
  }

}


const stars = [];

const objects = [
  earth = new object(0, 0, 80, 0, 400, "images/earth.png", 200 ,0.664, 0.1),
  moon = new object(0, 0, 20, 0, 100, null, 200, -2, 0.6)
];


function preload(){
  for(let i = 0; i < objects.length; i++){
    if(objects[i].img != null){objects[i].img = loadImage(objects[i].img);}}
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES); 

  for(let i = 0; i < 100; i++){
    stars.push(new object(random(0, 2100), random(0, 1200), random(1, 9), null));
  }
}


function draw() {

  stat();
  for(let i = 0; i < objects.length ; i++){
    objects[i].x = width/2 + objects[i].orbit * cos(objects[i].angle); objects[i].y =  height/2 + objects[i].orbit * sin(objects[i].angle);
    push();
      translate(objects[i].x, objects[i].y);
      rotate(objects[i].rot_change); objects[i].rot_change += objects[i].rot_change;
      objects[i].rotation += objects[i].rotation_change;
      fill(200);
      objects[i].img == null ? circle(0, 0, objects[i].rad) :image(objects[i].img, 0, 0, objects[i].rad, objects[i].rad);
      objects[i].angle += objects[i].move;
    pop();

  }

  // fill(200);
  // circle(earth.x + moon.orbit * cos(moon.angle), earth.y + moon.orbit * sin(moon.angle), moon.rad);
  // moon.angle += moon.move;
 
  
}


function stat(){
  background(10, 15, 27);
  
  fill(255);
  for(let i = 0; i < 100; i++){
    circle(stars[i].x, stars[i].y, stars[i].rad);
  }

  fill(250, 180, 0);
  circle(width/2, height/2, 200);
}