var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivalTime

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,600);
//create monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
background(300);
  
  //moving ground
  if(ground.x<=150){
    ground.x=ground.width/2;
  }
  
  score = score + Math.round(getFrameRate() / 60);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);

  //movements
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  spawnFood();
  spawnObstacle();
  
  monkey.velocityY=monkey.velocityY + 0.8;
  monkey.collide(ground);
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,120,20,20);
    banana.addImage("banana", bananaImage);
    banana.y = Math.round(random(120,300));
    banana.velocityX = -3;
    banana.scale = 0.1;
    banana.lifetime = 500;
    
    bananaGroup.add(banana);
  }
}


function spawnObstacle() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 300, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;

    //assign lifetime to the variable
    obstacle.lifetime = 500;
    obstacleGroup.add(obstacle);
  }
}