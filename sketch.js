var Mario, MarioStandingImg, MarioJumpingImg;
var goomba, goombaWalkingRightImg, goombaWalkingLeftImg, goombaCollider1, goombaCollider2, goombasGroup;
var coin, coinGroup;
var score;
var Ground, GroundImg;
var luckyBlock, jumpstate;
var stairs;
var flag;
var gameState
var Stage1 = 1
var Stage2 = 2



function preload() {
  coin_bobbing = loadAnimation("coin/coin1.png", "coin/coin2.png", "coin/coin3.png", "coin/coin4.png")
  luckyBlockImg = loadImage("luckyBlock.png")
  MarioStandingImg = loadImage("MarioStanding.png")
  MarioJumpingImg = loadImage("MarioJumping.png")
  GroundImg = loadImage("Background.jpg")
  goombaWalkingRightImg = loadImage("goomba/goomba-walk1.png")
  goombaWalkingLeftImg = loadImage("goomba/goomba-walk2.png")
  stairsImg = loadImage("Stairs.png")
  flagImg = loadImage("Flagpole.png")
}

function setup() {
  createCanvas(800, 400);

  Mario = createSprite(100, 350, 10, 10);
  Mario.addImage(MarioStandingImg)
  Mario.scale = 3.5
  Mario.debug = false;
  Mario.setCollider("rectangle", 0, 0, 15, 18);

  goomba = createSprite(300, 325, 20, 20)
  goomba.addImage(goombaWalkingRightImg);
  goomba.scale = .3
  goomba.debug = false;
  goomba.setCollider("rectangle", 0, -70, 90, 30)
  goomba.velocityX = 2

  goombaCollider1 = createSprite(200, 325, 20, 20)
  goombaCollider1.debug = true;
  goombaCollider1.setCollider("rectangle", 0, 0, 1, 50);
  goombaCollider1.visible = false;

  goombaCollider2 = createSprite(550, 325, 20, 20)
  goombaCollider2.debug = false;
  goombaCollider2.setCollider("rectangle", 0, 0, 1, 50);
  goombaCollider2.visible = false;

  coin = createSprite(900, 325, 20, 20)
  coin.scale = 2
  coin.addAnimation("coin_bobbing", coin_bobbing)
  coin.debug = false;
  coin.setCollider("circle", 0, 0, 5)

  wallCollider = createSprite (800,335,20,20);
  wallCollider.debug = false;
  wallCollider.visible = false;
  wallCollider.setCollider("rectangle",0,0,20,800);

  luckyBlock = createSprite(100, 200, 100, 100)
  luckyBlock.addImage(luckyBlockImg)
  luckyBlock.scale = .26
  luckyBlock.debug = false;
  luckyBlock.setCollider("rectangle", 0, 0, 220, 220)

  stairs = createSprite(500,166,100,100);
  stairs.addImage(stairsImg)
  stairs.debug = false;
  stairs.visible = false;

  stairsCollider1 = createSprite(350,329,189,40)
  stairsCollider1.visible=false;
  stairsCollider2 = createSprite(315,290,40,40) 
  stairsCollider2.visible=false;
  stairsCollider3 = createSprite(355,255,40,40) 
  stairsCollider3.visible=false;
  stairsCollider4 = createSprite(395,220,40,40) 
  stairsCollider4.visible=false;
  stairsCollider5 = createSprite(435,255,40,180)  
  stairsCollider5.setCollider("rectangle",0,-80,40,20)
  stairsCollider5.visible=false;
  stairsCollider6 = createSprite(435,255,40,180)  
  stairsCollider6.setCollider("rectangle",20,0,4,180)
  stairsCollider6.visible=false;
  
  flag = createSprite(600,205,100,100)
  flag.addImage(flagImg)
  flag.scale=1.3
  flag.visible=false;


  Ground = createSprite(400, 369, 2000, 50);
  Ground.visible = false

  goombasGroup = new Group();
  coinGroup = new Group();

  gameState = Stage1

  score = 0

}



function draw() {
  background(GroundImg);
  textSize(20)
  fill("Black")
  text("Score: "+ score, 700,50);
  

  if (keyDown("RIGHT_ARROW" || touches.length > 0)) {
    Mario.x += 5
  }

  if (keyDown("LEFT_ARROW" || touches.length > 0)) {
    Mario.x -= 5
  }


  if (keyDown("UP_ARROW") && Mario.y >= 90) {
    Mario.addImage(MarioJumpingImg)
    if (jumpstate === "true") {
      Mario.y -=10;
      if (Mario.y <= 250) {
        jumpstate = "false";
      }
    }

  }
  Mario.velocityY = Mario.velocityY + 0.1;

  if(Mario.isTouching(wallCollider)){
    gameState = Stage2;
    Mario.x = 10;
  }

  if (goomba.isTouching(goombaCollider1)) {
    goomba.velocityX = 2
  }
  if (goomba.isTouching(goombaCollider2)) {
    goomba.velocityX = -2
  }


  if (Mario.collide(Ground)) {
    jumpstate = "true";
    Mario.addImage(MarioStandingImg);
  }

  if (Mario.collide(coin)||Mario.collide(coinGroup)) {
    score= score+1
    coin.destroy()  
   
  }


  if (Mario.collide(luckyBlock)) {
    Mario.velocityY+=1
    luckyBlock.y = luckyBlock.y - 1
    score=score+1
  }

  else {
    luckyBlock.x = 100
    luckyBlock.y = 200
  }
 
  if (Mario.collide(goomba)||Mario.collide(goombasGroup)) {
    Mario.addImage(MarioJumpingImg);
    Mario.velocityY = Mario.velocityY-2
    Mario.velocityX = 0
    goomba.destroy();
    goomba.velocityX = 0
    coin.x=goomba.x
  }
 

  if (gameState === Stage1){
      if (frameCount % 200 === 0 || Mario.collide(goomba)){
        goomba = createSprite(300, 325, 20, 20)
        goomba.addImage(goombaWalkingRightImg);
        goomba.scale = .3
        goomba.debug = false;
        goomba.setCollider("rectangle", 0, -70, 90, 30)
        goomba.velocityX = 2
  
        coin = createSprite(900, 325, 20, 20)
        coin.scale = 2
        coin.addAnimation("coin_bobbing", coin_bobbing)
        coin.debug = false;
        coin.setCollider("circle", 0, 0, 5)
  
          if (Mario.collide(goomba)||Mario.collide(goombasGroup)) {
            Mario.addImage(MarioJumpingImg);
            Mario.velocityY = Mario.velocityY-2
            Mario.velocityX = 0
            goomba.destroy();
            goomba.velocityX = 0
            coin.x=goomba.x
          }

        goomba.lifetime = 300
        
        goombasGroup.add(goomba);
        coinGroup.add(coin)

      }
  }

  else {   
    background(GroundImg);
    goomba.destroy();
    luckyBlock.destroy();
    coin.destroy();
    stairs.visible=true;
    flag.visible= true;


    if (Mario.collide(Ground)||Mario.collide(stairsCollider1)||Mario.collide(stairsCollider2)||Mario.collide(stairsCollider3)||Mario.collide(stairsCollider4)||Mario.collide(stairsCollider5)) {
      jumpstate = "true";
      Mario.addImage(MarioStandingImg);
    } 
    
    if (Mario.collide(stairsCollider6)){}

    if (Mario.collide(flag)){
    
      textSize(20)
      text("Game Over",300,500) 
      stairs.visible=false;
      Mario.visible=false;
      flag.visible=false;
      background("white")
     
    }

  }
   drawSprites();
}

