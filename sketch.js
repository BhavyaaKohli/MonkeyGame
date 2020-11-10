var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var PLAY=1;
var END = 0;
var gameState=PLAY


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600, 500);

  
  // creating monkeys
  monkey = createSprite(80,315,20,20)  
  monkey.addAnimation("moving", monkey_running) 
  monkey.scale=0.1
  
  // creating ground 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  }




function draw() {
 background("lightblue");
  
  
 
   console.log(monkey.y)
   
  

   
  // survival Time
  stroke("white")
  textSize (20);
  fill ("black")
  text ("Survival Time: " + score,400,50)
 
 
 
  
  //stop trex from falling down
   monkey.collide(ground);
  
  
  drawSprites();
  
  
  
if (gameState===PLAY){
    score = Math.round(frameCount/frameRate())
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 314) {
       monkey.velocityY = -12;
    
        }
  
   //add gravity
   monkey.velocityY = monkey.velocityY + 0.5
  
   if (ground.x < 0){
      ground.x = ground.width/2;
      
    }
  
  
  creatingObstacles();
  creatingBanana();
    
   
  if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    
  }
}
 if(gameState===END){
   bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1)
     obstacleGroup.setLifetimeEach(-1)
   
   
 text("GAME OVER!",250,150)
   textSize(30)
    fill("black")
    
      ground.velocityX = 0;
      monkey.velocityY = 0
   score=0
 }
  }
 
function creatingBanana(){
    if(World.frameCount % 120 === 0 ){
    banana= createSprite(600,200,20,20) 
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX= -4
    banana.lifetime = 300;
    banana.y=Math.round(random(150,250))
    bananaGroup.add(banana)
      
     }
    }

function creatingObstacles(){
  
    if(World.frameCount % 200 === 0 ){
    obstacle= createSprite(600,325,20,20) 
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.1
   obstacle.velocityX= -4
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle)
    }
  
}







