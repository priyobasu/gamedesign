var bob,bobrunning,castleimg,castle,bobidle,bobjump,platformimg,platform
,invplatform,invplatformgrp,Score = 0,spikes,spikesimg,backgroundimg,platform1,platform2,platform3,gamestate = "start", bh;
var life3, life3i;
var life1, life1i;
var life2, life2i;
var spikesgrp;
var back;
var count=0;

var intro1,intro1i,intro2,intro2i,play,playi;
function preload(){
castleimg = loadImage("running/Castle.png");
bobidle = loadAnimation("running/idle.png");
bobrunning = loadAnimation("running/run1.png","running/run2.png","running/run3.png"
,"running/run4.png","running/run5.png","running/run6.png","running/run7.png")
bobjump = loadAnimation("running/jump1.png","running/jump2.png","running/jump3.png","running/jump4.png","running/jump5.png","running/jump6.png")
platformimg = loadImage("running/platform.png");
spikesimg = loadImage("running/Spikes.png");
backgroundimg = loadImage("running/bg1.jpg");
platform1 = loadImage("running/platform1.png");
platform2 = loadImage("running/platform2.png");
platform3 = loadImage("running/platform3.png");

life1i = loadImage("running/red heart.png")
  life2i = loadImage("running/red heart.png")
  life3i = loadImage("running/red heart.png")
  
  intro1i=loadImage("running/Bobs-Space-Travel.png");
  intro2i=loadImage("running/Created-by-Nikhil.png");
  playi=loadImage("running/play.png");

  bh=loadImage("running/black heart.png");


}

function setup() {
  createCanvas(600,200);
  back=createSprite(300,100);
  back.addImage(backgroundimg);
  bob = createSprite(300,50, 50, 50);
  bob.addAnimation("bobidle",bobidle);
  bob.addAnimation("bobrunning",bobrunning);
  bob.addAnimation("bobjumping",bobjump);
  bob.debug = true
  bob.scale=0.6;
  bob.setCollider("rectangle",0,0,50,50);
  invplatformgrp=createGroup();
  platformgrp = createGroup();
  spikesgrp=createGroup();
  life1 = createSprite(40,20)
  life1.addImage(life1i)
  
  life1.scale = 0.1;
  
  life2 = createSprite(life1.x + 20,20)
  life2.addImage(life2i)
  
  life2.scale = 0.1;

  
  life3 = createSprite(life2.x +20,20)
  life3.addImage(life3i)
  
  life3.scale = 0.1;


  if(gamestate==="start")
  {
   intro1=createSprite(300,50);
   intro1.addImage(intro1i);
   intro1.scale=0.5;
   intro2=createSprite(450,75);
   intro2.addImage(intro2i);
   intro2.scale=0.2;
   play=createSprite(300,150);
   play.addImage(playi);
   play.scale=0.3; 
   
   life1.visible=false;
   life2.visible=false;
   life3.visible=false;
  
  
}

}

function draw() {
  
  if(mousePressedOver(play)){
    gamestate="play";
    console.log("hi");
    
  }
   
      if(gamestate === "play"){
        background(0);
        play.visible=false;
        intro1.visible=false;
        intro2.visible=false;

        life1.visible=true;
   life2.visible=true;
   life3.visible=true;
       back.velocityX=-3;
       if(back.x<0){
         back.x=back.width/2;
       }
 
        if(keyDown("right")) {
      
          bob.changeAnimation("bobrunning",bobrunning);
         // bob.velocityX=2; 
           
        }
        if(keyDown("down")) {
      
          bob.changeAnimation("bobidle",bobidle);
           
        }
        if(keyDown("up")) {
      
          bob.changeAnimation("bobjumping",bobjump);
           
        }
         if(keyDown("space")){
      
          bob.velocityY = -2;
          bob.changeAnimation("bobjumping",bobjump);
      
         }

         else{

           bob.changeAnimation("bobidle",bobidle);


         }
         bob.velocityY = bob.velocityY + 0.5;
         if(bob.isTouching(invplatformgrp)){
      
          bob.collide(invplatformgrp);
         bob.velocityY = 0
         Score = Score+1;
         }

         



         spawnplatform() 
         if(bob.y>400 || bob.isTouching(spikesgrp))
         {
          count=count+1;
          if(count===1){
            life1.addImage(bh);
            bob.y=30;
            bob.x=300;
          }
          if(count===2){
            life2.addImage(bh);
            bob.y=30;
            bob.x=300;
          }
          if(count===3){
            life3.addImage(bh);
            bob.y=30;
            bob.x=300;

          }
          
         }
       
         if((bob.y>400 && count===4)|| (bob.isTouching(spikesgrp) && count===4)){

           gamestate = "end"

         }

      }

      if(gamestate === "end"){
    
     invplatformgrp.setVelocityXEach(0);
     platformgrp.setVelocityXEach(0);
     spikesgrp.setVelocityXEach(0);
     invplatformgrp.setLifetimeEach(-1);
     platformgrp.setLifetimeEach(-1);
     spikesgrp.setLifetimeEach(-1);
     bob.velocityY=0;
     bob.y=500;
     back.velocityX=0;
    
      }


   //console.log(bob.velocityY);
   

      

  
  drawSprites();
  if(gamestate==="play" || gamestate==="end"){
  textSize(20)
       stroke("white");
       strokeWeight(2);
       text("Score: "+Score,500,50);
  }
}


function spawnplatform(){

if(frameCount %30===0){

var r  = Math.round(random (98,100));
var a = Math.round(random(100,120));
platform = createSprite(600,a)
platformgrp.add(platform);
platform.velocityX = -5;
var x = Math.round(random(1,3));
if(x === 1){

platform.addImage(platform1)
invplatform = createSprite(600,a-20,50,3)

}
if(x === 2){

  platform.addImage(platform2)
  invplatform = createSprite(600,a-20,50,3)
  
  }
  if(x === 3){

    platform.addImage(platform3)
    invplatform = createSprite(600,a-20,80,3)
    }
    
platform.scale = 0.4;

bob.depth=platform.depth-1;

console.log(r);
//console.log(invplatform.width);



if(r === invplatform.x){

  

spikes = createSprite(r,invplatform.y - 20)
spikes.debug = true;
spikes.velocityX = -5;
spikes.addImage(spikesimg);
spikes.scale = 0.2;
spikes.lifetime = 300;
spikesgrp.add(spikes);



}
invplatform.velocityX = -5;
//invplatform.shapeColor = ("blue");
invplatform.visible = true;
invplatform.debug = true;
invplatformgrp.add(invplatform)
platform.lifetime = 300;
invplatform.lifetime = 300;


}
if(platformgrp.x===0)
{
  platformgrp.destroyEach();
}



}
