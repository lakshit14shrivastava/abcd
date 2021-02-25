var background1,backroundimg
var sonic,sonicimg
var invisibleGround
var coin,coinImage
var alien,AlienImage
var gameState="play"
var scores=0
var coinGroup,obstaclesGroup
var gameoverimg,gameover,restartimg,restart


function preload(){
  backgroundimg=loadImage("images/background.png")
  sonicimg=loadAnimation("images/sonic1.png","images/sonic2.png","images/sonic3.png","images/sonic4.png","images/sonic5.png","images/sonic6.png","images/sonic7.png")
  coinImage=loadImage("images/coin1.png")
  AlienImage=loadAnimation("images/alien1.png","images/alien2.png","images/alien3.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  jumpsound=loadSound("sounds/jump.wav")
  collidedsound=loadSound("sounds/collided.wav")
  gameoverSound=loadSound("sounds/gameover.wav")
}

function spawncoin(){
  if(frameCount%150===0){
    coin=createSprite(1200,Math.round(random(450,570)))
    coin.addImage(coinImage)
    coin.velocityX=-4
    coin.scale=0.1
    coinGroup.add(coin)


    coin.lifetime=300
    
  }
}



function setup() {
  createCanvas(1200,600);
  background1=createSprite(550, 200, 1200, 600);
  background1.addImage(backgroundimg)
  background1.scale=2.5
  sonic=createSprite(50,480);
  sonic.addAnimation("sonic",sonicimg)
  background1.velocityX=-4
  invisibleGround=createSprite(50,600,4000,100);
  coinGroup=new Group()
  obstaclesGroup= new Group()
gameover=createSprite(600,300);
gameover.addImage(gameoverimg)
restart=createSprite(600,360);
restart.addImage(restartimg)
  restart.scale=0.1
}


function spawnobstacles(){
  if (frameCount%200===0){
    alien=createSprite(1200,Math.round(random(350,450)))
    alien.addAnimation("alien",AlienImage)
    alien.velocityX=-4
    alien.scale=0.6
    obstaclesGroup.add(alien)
    alien.lifetime=300
    
    alien.setCollider("rectangle",0,0,80,250);
  }
  }
  




function draw() {
  background(255,255,255);  
  if (gameState==="play"){
  if(background1.x<500){
    background1.x=600
  }
  background1.velocityX=-4
  if(touches.length>0||keyDown("space")){
    jumpsound.play();
    sonic.velocityY=-8  
    touches=[]
  }
 sonic.velocityY=sonic.velocityY+1 
gameover.visible=false
restart.visible=false
 invisibleGround.visible=false;
 sonic.collide(invisibleGround);
  if (keyDown(RIGHT_ARROW)){
    jumpsound.play();
   sonic.y=sonic.y+5
   invisibleGround.y=invisibleGround.y+5
  }
  
  if (keyDown(LEFT_ARROW)){
    jumpsound.play();
    sonic.y=sonic.y-5
    invisibleGround.y=invisibleGround.y-5
  }
  for (var i=0;i<coinGroup.length;i++){
  
  
  if(coinGroup.isTouching(sonic)){
    coinGroup.get(i).destroy(i)
    scores=scores+1
  }
  
}

 
  spawnobstacles();
  

  spawncoin();
  if(obstaclesGroup.isTouching(sonic)){
    gameState="end"
    gameoverSound.play();
    
    
    

  }
}
if(gameState==="end"){
  obstaclesGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)
  background1.velocityX=0
  sonic.velocityY=0
  obstaclesGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  gameover.visible=true
restart.visible=true
if(mousePressedOver(restart)||touches.length>0){
  reset()
  touches=[]
}
}


  drawSprites();
textSize(30)
fill ("black");
  text("score:"+scores,1000,50)
  
  
}

function reset(){
  gameState = "play";
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  
  
 
  
  score = 0;

}