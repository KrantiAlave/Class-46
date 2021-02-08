var PLAY = 1 ;
var END = 0;
var gameState = PLAY;
var restart;

var road,roadImg;
var player,playerImg1,playerImg2;
var player1,oppPinkImg1,oppPinkImg2;
var player2,oppYellowImg1,oppYellowImg2;
var player3,oppRedImg1,oppRedImg2;
var gameOver,gameOverImg;
var cycleBell;
var distance = 0;
var opp,pinkGroup,redgroup,yellowGroup;

function preload(){

  roadImg = loadImage("images/Road.png");

  playerImg1 = loadAnimation("images/mainplayer1.png", "images/mainplayer2.png");
  playerImg2 = loadAnimation("images/mainplayer3.png");

  oppPinkImg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPinkImg2 = loadAnimation("images/opponent3.png");

  oppYellowImg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellowImg2 = loadAnimation("images/opponent6.png");
  
  oppRedImg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRedImg2 = loadAnimation("images/opponent9.png");

  gameOverImg = loadImage("images/gameOver.png");

 cycleBell = loadSound("sound/bell.mp3");

}

function setup(){
  createCanvas(1200,300);

  road = createSprite(100,150);
  road.addImage(roadImg);
  road.velocityX = -5;

  player = createSprite(70,150);
  player.addAnimation("maithli running",playerImg1);
  player.scale = 0.07;
  
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  pinkGroup = new Group();
  redGroup = new Group();
  yellowGroup = new Group();


}

function draw(){

  background(0);
  textSize(20);
  fill(255);
  text("Distance : " + distance,900,30);


  if(gameState === PLAY){

    distance = distance + Math.round(getFrameRate()/50);
    road.velocityX = -(6 + 2*distance/150);
      
   player.y = World.mouseY;
 
    edges= createEdgeSprites();
     player.collide(edges);
      
      drawSprites();

      if(road.x < 0){
        road.x = width/2;
      }

       if(keyDown("space")) {
    cycleBell.play();
  }



      opp = Math.round(random(1,3));
      if(World.frameCount % 150 === 0){
        if(opp === 1){
          pinkCyclists();
        }
        
        else if(opp === 2){
          yellowCyclists();
        }
        else{
          redCyclists();
        }
      }

      if(pinkGroup.isTouching(player)){
        gameState = END;
        player1.velocityY = 0;
        player1.addAnimation("running",oppPinkImg2);
      }

      if(yellowGroup.isTouching(player)){
        gameState = END;
        player2.velocityY = 0;
        player2.addAnimation("running",oppYellowImg2);
      }
      if(redGroup.isTouching(player)){
        gameState = END;
        player3.velocityY = 0;
        player3.addAnimation("running",oppRedImg2);
      }

  }
 
  else if(gameState === END){
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    road.velocityX = 0;
    player.velocityY = 0;
    player.addAnimation(" Maithli Running",playerImg2);
  
    pinkGroup.setVelocityXEach(0);
    pinkGroup.setLifetimeEach(-1);
  
    yellowGroup.setVelocityXEach(0);
    yellowGroup.setLifetimeEach(-1);
  
    redGroup.setVelocityXEach(0);
    redGroup.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      restart();
    }

  }

function pinkCyclists(){
player1 = createSprite(1100,Math.round(random(50,250)));
player1.addAnimation("running",oppPinkImg1);
player1.velocityX = -(6+2*distance/150);
player1.scale = 0.06;
player1.setLifetime = 170;
pinkGroup.add(player1);

}

function yellowCyclists(){
player2 = createSprite(1100,Math.round(random(50,250)));
player2.addAnimation("running",oppYellowImg1);
player2.velocityX = -(6+2*distance/150);
player2.scale = 0.06;
player2.setLifetime = 170;
yellowGroup.add(player2);
}

function redCyclists(){
player3 = createSprite(1100,Math.round(random(50,250)));
player3.addAnimation("running",oppRedImg1);
player3.velocityX = -(6+2*distance/150);
player3.scale = 0.06;
player3.setLifetime = 170;
redGroup.add(player3);
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  player.addAnimation("running",playerImg1);
  
  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  redGroup.destroyEach();
  
  distance = 0;
}

