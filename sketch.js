var trex,trexRunning,trexCollided,ground,groundImg,invisibleGround, cloudImg,ob1,ob2,ob3,ob4,ob5,ob6,count,trexAir;
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
}

function draw() {
  background(255);
  if(keyDown("space")&&trex.y>154){
  //trex.changeAnimation("t3",trexAir);  
  trex.velocityY=-12; 
  }
  trex.velocityY=trex.velocityY+0.8;
  (trex.collide(invisibleGround))//{
  //trex.changeAnimation("t1")
  //}
  ground.velocityX=-5;
  console.log(trex.y);
  if(ground.x<0){ground.x=ground.width/2
  }
    count = count+Math.round(getFrameRate()/60);
  text("Score: "+ count, 500,80);
  spawnObstacles();
  spawnClouds();
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
  }
}
