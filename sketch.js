var monkey, monkey_running, monkey_Collide;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var ground1;
var bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var jungle, jungleImage;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_collide = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600, 600);
  score = 0;

  jungle = createSprite(300, 300, 300, 300);
  jungle.addAnimation("jungle", jungleImage);
  jungle.scale = 0.8;


  monkey = createSprite(100, 470, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  monkey.scale = 0.25;
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true;

  ground = createSprite(300, 550, 600, 15);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;


  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");
  if (gameState === PLAY) {
    jungle.velocityX = -4
    if (keyDown("space")) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (jungle.x < 190) {
      jungle.x = 300;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      if (monkey.scale < 0.75) {
        monkey.scale = monkey.scale + 0.10;
        monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
      }
      score = score + 2;

    }

    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      console.log(monkey.scale);
      if (monkey.scale > 0.25) {
        monkey.scale = monkey.scale - 0.20;
        monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
      } else {
        gameState = END;
      }

    }


    food();
    obstacles();


  }
  if (gameState === END) {
    jungle.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.changeAnimation("collide", monkey_collide);

  }
  drawSprites();
  stroke("white");
  fill("white");
  textSize(20);
  text("score : " + score, 5, 20);
  if (gameState === END) {
    textSize(40);
    text("GAME OVER", 200, 300);
  }
}

function food() {

  if (frameCount % 200 === 0) {
    banana = createSprite(650, random(120, 200), 10, 20);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3;
    bananaGroup.add(banana);
  }

}

function obstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(650, 465, 10, 20);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.4;
    obstacle.velocityX = -3;
    obstacle.lifetime = 700;
    obstacleGroup.add(obstacle);
  }
}