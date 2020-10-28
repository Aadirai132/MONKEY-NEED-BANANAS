  var ground, groundImage;
  var monkey , monkey_running, monkey_collided;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var invisibleGround,invisibleImage;
  var survivalTime;
  var gameState;
  var PLAY = 1;
  var END = 0;
  var restart, restartImage;
  
  function preload()
  {
    //loading all the animations
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    
    bananaImage = loadImage("banana.png");

    obstacleImage = loadImage("obstacle.png");

    groundImage = loadImage("ground3.png");

    invisibleImage = loadImage("ground2.png");
    
    restartImage = loadImage("resart.png");
  }

  function setup() 
  {
    createCanvas(450, 400);
    
    gameState = PLAY;
    
    //making a ground and givivng animation to it
    ground = createSprite(300,300,60,1);
    ground.addAnimation("ground3",groundImage);

    //creating an invisible ground
    invisibleGround = createSprite(300, 305);
    invisibleGround.addAnimation("ground2",invisibleImage);
    invisibleGround.visible = false;
    
    //creating the monkey and setting animation to it
    monkey = createSprite(75,280,10,10);
    monkey.addAnimation("monkey",monkey_running);
    monkey.scale = 0.1;
    
    restart = createSprite(200,150);
    restart.addImage(restartImage);
    restart.scale = 0.2;
    
    //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
    
    survivalTime = 0;  
  }

  function draw()
  {
    background("white");//background as white
    
    //displaying survival time
    stroke("black");
    textSize(20);
    fill("black");
    text("survival Time :"+survivalTime,140,50);
    
    //assiging velocity to ground
    ground.velocityX = -4;
    
    //calling functions to display bananas and obstacles
    //only when the game is not ENDed
    //survivalTime also should increase only during PLAY
    if (gameState === PLAY)
    {
      restart.visible = false;
      obstacles();
      bananas();
      //setting survival time as frame count    
      survivalTime = survivalTime +   
        Math.round(getFrameRate()/60);
     
      //when space key is pressed monkey jumps
      if(keyDown("space")&& monkey.y >= 159)
      {
        monkey.velocityY = -8;
        
      }
      
      //giving gravity
      monkey.velocityY = monkey.velocityY + 0.3;
      
      //making the ground reset itself
        if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }
    
      ground.velocityX = -(4 + 3* survivalTime/100)
    
      if(monkey.isTouching(bananasGroup))
      {
        bananasGroup.destroyEach();
      }
      
   }
    //monkey should collide invisible ground
    monkey.collide(invisibleGround);
    
    //when the monkey touches the rock
    if(obstaclesGroup.isTouching(monkey))
    {
      gameState = END;
      restart.visible = true;
      monkey.velocityY =  0;
      ground.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);
      bananasGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      bananasGroup.setLifetimeEach(-1);
      
      stroke("black");
      textSize("50");
      fill("green");
      text("MONKEY COLLIDED!",100,225);
      fill("red");
      text("GAME ENDs", 150, 250);
    }
    
    if(mousePressedOver(restart)&&restart.visible===true) 
    {
      reset();
    } 

   drawSprites(); 

  function bananas()
  {
     if(frameCount % 80===0)
     {
      banana = createSprite(250,200);
      banana.addAnimation("banana",bananaImage);
      banana.velocityX = -(4 + 3* survivalTime/100)
      banana.y = Math.round(random(200,150));
      banana.scale = 0.1;
      banana.lifetime = 100;
      bananasGroup.add(banana);
      }
   }  
  function obstacles()
  {
   if(frameCount % 80===0)
   {
     obstacle = createSprite(250,280);
     obstacle.addAnimation("obstacle", obstacleImage);
     obstacle.velocityX = -(4 + 3* survivalTime/100);
     obstacle.scale = 0.1; 
     obstacle.lifetime = 400;
     obstaclesGroup.add(obstacle);
   } 
  }

  function reset()
  {
    gameState = PLAY;
    ground.velocityX = -4;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    bananasGroup.destroyEach();
    survivalTime = 0;
  }
 }






