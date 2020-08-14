
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var hi_score = 0;
var score = 0;
var ground, invisibleGround, groundImage;
var gameState = "end";

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
}

function setup() {
  monkey = createSprite(100, 250, 20, 40);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.13;
  monkey.setCollider("rectangle",0,0,240,250);
  //monkey.debug = true;
  
  ground = createSprite(200, 265, 400, 5);
  ground.addImage(groundImage);
  console.log(ground.width);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(750, 260 , 1500, 5);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background("white");
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  textSize(12);
  text("HI Score : " + hi_score, 100, 30);
  text("Survival Time : " + score, 200, 30);
  //score += Math.round(getFrameRate()/60);
  if (keyDown("space") && monkey.y > 232) {
    monkey.velocityY = -15;
    ground.velocityX = -6;
    monkey.play();
    gameState = "play";
  }
  
  //console.log(monkey.y);
  if (gameState === "play") {
    ground.velocityX = -(6 + score/4);
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
    makeBanana();
    makeObstacle();
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score += 2;
      makeMonkeyBig();
    }
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.13;
      gameState = "end";
    }
  } else if (gameState === "end") {
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.y = 232;
    monkey.velocityY = 0;
    monkey.pause();
    ground.velocityX = 0;
    count = 0;
    if (score > hi_score) {
      hi_score = score;
    }
    score = 0;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
  drawSprites();
}

function makeBanana() {
  if (frameCount%80 === 0) {
    banana = createSprite(405, Math.round(random(120,200)), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.12 ; 
    banana.lifetime = 120;
    bananaGroup.add(banana);
  }
  bananaGroup.setVelocityXEach(-(6 + score/4));
}

function makeObstacle() {
  if (frameCount%300 === 0) { 
    obstacle = createSprite(Math.round(random(405,425)), 250, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.12;
    ground.depth = obstacle.depth;
    obstacle.depth = obstacle.depth + 1;
    obstacle.lifetime = 120;
    //obstacle.debug = true;
    obstacle.setCollider("rectangle", 0,0,300,300);
    obstacleGroup.add(obstacle);
  }  
  obstacleGroup.setVelocityXEach(-(6 + score/4));
}

function makeMonkeyBig() {
  switch (score) {
    case 10: monkey.scale = 0.14;
              break;
    case 20: monkey.scale = 0.15;
              break;
    case 30: monkey.scale = 0.16;
              break;
    case 40: monkey.scale = 0.17;
              break;
    case 50: monkey.scale = 0.18;
              break;
    default:break;
  }
}