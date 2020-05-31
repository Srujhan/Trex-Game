var trex,trexRunning,trexCollided,ground,groundImg,invisibleGround, cloudImg,ob1,ob2,ob3,ob4,ob5,ob6,count,trexAir,ObstaclesGroup,CloudsGroup,restart,gameover,restartImg,gameoverImg;
var gamestate;
var PLAY=1
var END=0
function preload() {
trexRunning= loadAnimation("trex1.png","trex3.png","trex4.png"); 
  trexCollided=loadImage("trex_collided.png")
  trexAir=loadImage("trex1.png")
 groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  restartImg=loadImage("restart.png")
  gameoverImg=loadImage("gameOver.png")
  
}
function setup() {
  createCanvas(600,200);
  trex=createSprite(50,160,10,40);
  trex.addAnimation("t1",trexRunning);
  trex.scale=0.6;
  trex.addAnimation("t2",trexCollided);
  trex.addAnimation("t3",trexAir);
  ground=createSprite(300,180,600,20);
  ground.addImage(groundImg);
  ground.x=ground.width/2;
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  count=0;
  gamestate=PLAY;
  ObstaclesGroup=createGroup();
  CloudsGroup=createGroup();
  gameover=createSprite(300,100,10,10);
  restart=createSprite(300,140,10,10);
  gameover.addImage(gameoverImg);
  restart.addImage(restartImg);
  gameover.scale=0.6;
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background(255);
  if(gamestate===PLAY){
    if(keyDown("space")&&trex.y>154){
      //trex.changeAnimation("t3",trexAir);  
      trex.velocityY=-12; 
    }
    trex.velocityY=trex.velocityY+0.8; 
    ground.velocityX=-5;
    if(ground.x<0){
      ground.x=ground.width/2
    }
    count = count+Math.round(getFrameRate()/60);
    spawnObstacles();
    spawnClouds();
    if(ObstaclesGroup.isTouching(trex)){
       gamestate=END;
    }
     if(trex.collide(invisibleGround)){
  trex.changeAnimation("t1")
  }
  }
  else if(gamestate===END){
   ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("t2");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  
    gameover.visible=true;
    restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
  reset();    
 }

  //console.log(trex.y);
  
  text("Score: "+ count, 450,80);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(60,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud) 
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1); break;
      case 2: obstacle.addImage(ob2); break;
      case 3: obstacle.addImage(ob3); break;
      case 4: obstacle.addImage(ob4); break;
      case 5: obstacle.addImage(ob5); break;
      case 6: obstacle.addImage(ob6); break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gamestate=PLAY;
  count=0;
  gameover.visible=false;
  restart.visible=false;
  trex.changeAnimation("t1");
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  }
