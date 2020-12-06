
var dog , dog_r
var bone ,boneI, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,Gameover, GI;

function preload(){
  
  
  dog_r =loadAnimation("download.png");
  
  boneI = loadImage("download (1).png");
  obstaceImage = loadImage("images.png");
  GI=loadImage("gameOver.png");
 
}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  

   dog=createSprite(80,315,20,20);
   dog.addAnimation("moving", dog_r);
   dog.scale=0.3
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  dog.setCollider("rectangle",0,0,200,200);
  dog.debug = false ;
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   

  
   
    if(keyDown("space") ) {
      dog.velocityY = -12;
    }
    dog.velocityY = dog.velocityY + 0.8;
  
    dog.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(dog)){
        ground.velocityX = 0;
        dog.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        Gameover=createSprite(200,100,15,15);
        Gameover.addImage(GI);
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {

  if (frameCount % 80 === 0) {
    bone = createSprite(600,250,40,10);
    bone.y = random(120,200);    
    bone.velocityX = -5;
    
     
    bone.lifetime = 300;
    dog.depth = bone.depth + 1;
    
    
     bone.addImage(boneI);
     bone.scale=0.2;
    
  
    FoodGroup.add(bone);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.3;
    
      
    obstacle.lifetime = 300;
    
  
    obstaclesGroup.add(obstacle);
  }
}
