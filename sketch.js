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
    this.rot = 0.1;
    this.move = move;
    this.rot_change = rot_chng;
    this.satellites = satellites || [];
  }

}


const stars = [];

moon = new object(10, 50, {col: 200}, -2, 0.6);

// (promien plnety, promien orbity, img, kolor(in dev), prędkość ruchu, satelity)
const objects = [
  earth = new object(40, 240, {img: "images/earth.png"}, 0.5, 1, [moon]),
  mars = new object(60, 320, {col: 100}, 0.3, 1)
  idk = new object(80, 400, {col: 300}, 0.6, 3)
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
    stars.push(new star(random(0, 2100), random(0, 1200), random(1, 9)));
  }
}


function draw() {

  stat();
  for(let i = 0; i < objects.length ; i++){

    objects[i].x = width/2 + objects[i].orbit * cos(objects[i].angle);
    objects[i].y =  height/2 + objects[i].orbit * sin(objects[i].angle);
    push();
      translate(objects[i].x, objects[i].y);
      if (objects[i].col) fill(objects[i].col);
      objects[i].img == null ? circle(0, 0, objects[i].rad) :image(objects[i].img, 0, 0, objects[i].rad, objects[i].rad);
      objects[i].angle += objects[i].move;
    pop();

    for(let j = 0; j < objects[i].satellites.length; j++){

      dir = objects[i].satellites[j];
      dir.x = objects[i].x + dir.orbit * cos(dir.angle);
      dir.y =  objects[i].y + dir.orbit * sin(dir.angle);

      push();
        translate(dir.x, dir.y);
        rotate(dir.rot);
        dir.rot += dir.rot_change;
        if (dir.col) fill(dir.col);
        dir.img == null ? circle(0, 0, dir.rad) :image(dir.img, 0, 0, dir.rad, dir.rad);
        dir.angle += dir.move;
      pop();
    }

  }
}


function stat(){
  background(10, 15, 27);
  
  fill(255);
  for(let i = 0; i < 100; i++){
    circle(stars[i].x, stars[i].y, stars[i].rad);
  }

  fill(250, 180, 0);
  circle(width/2, height/2, 100);
}
