
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var dustbinObj,groundObject	
var world;
var score, bin1, bin2, bin3, bin1Img, bin2Img, bin3Img, trash, trashBody, trashImg;
var selection, selectionImg, selectionScreen, selectionScreenImg, back, backImg;
var gameState;
var successAnim;
var main, mainBgImg;
var trash1, trash2, trash3, trash4, trashImg1, trashImg2, trash2Img, trashImg3, trashImg4, trash4Img, trashGIF, trashGifFile, done, doneImg;

function preload(){
   bin1Img = loadImage("dustbingreen.png");
   bin2Img = loadImage("trashcan.png");
   bin3Img = loadImage("trashcangreen.png");
   backImg = loadImage("backImg.gif");
   mainBgImg = loadImage("mainBgImg.png");
   selectionScreenImg = loadImage("selection.png");
   selectionImg = loadImage("select.png");
   trashImg = loadImage("paper.png");
   trashGifFile= loadImage("trashImg.gif");
   doneImg = loadImage("doneImg.gif");
   trashImg1 = loadImage("paper.png");
   trashImg2 = loadImage("trash2.gif");
   trash2Img = loadImage("trash2.png");
   trashImg3 = loadImage("trash3.png");
   trashImg4 = loadImage("trashImg4.gif");
   trash4Img = loadImage("trash4.png");
}
function setup() {
	createCanvas(1600, 800);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;
	
	trashBody = new Trash(600, height/2, 40, PI/2);
	groundObject=new ground(width/2,800,width,20);
	dustbinObj=new dustbin(1200,770);

	trash = createSprite(trashBody.body.position.x, trashBody.body.position.y, 100,100);
	trash.addImage("trashImage", trashImg);
	trash.addImage("trashImage2", trash2Img);
	trash.addImage("trashImage3", trashImg3);
    trash.addImage("trashImage4", trash4Img);
	trash.scale=0.3;
	trash.visible=true;

	score = 0;

	main = createSprite(width/2, height/2, width, height);
	main.addImage("mainBgImg", mainBgImg);
	main.visible=true;
	
	bin1 = createSprite(40, 80, 20,20);
	bin1.addImage("bin1Img", bin1Img);
	bin1.visible = false;
	bin2 = createSprite(40, 80, 20,20);
	bin2.addImage("bin2Img", bin2Img);
	bin2.visible = false;
	bin3 = createSprite(40, 80, 20,20);
	bin3.addImage("bin3Img", bin3Img);
	bin3.visible = false;
	back = createSprite(60, 750, 20, 20);
	back.addImage("backImg", backImg);
	back.setCollider("rectangle",50,0, 800, 200);
	back.scale=0.3;
	back.visible=false;

	selectionScreen = createSprite(width/2, height/2, 1600, 800);
	selectionScreen.addImage("selectionScreenImg", selectionScreenImg);
	selectionScreen.visible=false;
	selection = createSprite(1460, 750 ,60, 20);
	selection.addImage("slectionImg", selectionImg);
	selection.visible=false;

	trashGIF = createSprite(1550, 70, 20,20);
	trashGIF.addImage("trashGIF", trashGifFile);
	trashGIF.scale=0.3;
	trashGIF.visible=false;
	done = createSprite(trashGIF.x, trashGIF.y, trashGIF.with, trashGIF.height);
	done.addImage("doneImg", doneImg);
	done.visible=false;


	trash1 = createSprite(400, height/2, 20,20);
	trash1.addImage("trashImg1", trashImg1);
	trash1.scale=0.4;
	trash1.visible=false;
	trash2 = createSprite(700, height/2, 20,20);
	trash2.addImage("trashImg2", trashImg2);
	trash2.scale=0.2;
	trash2.visible=false;
	trash3 = createSprite(1000, height/2, 20,20);
	trash3.addImage("trashImg3", trashImg3);
	trash3.scale=0.4;
	trash3.visible=false;
	trash4 = createSprite(1300, height/2, 20,20);
	trash4.addImage("trashImg4", trashImg4);
	trash4.scale=0.4;
	trash4.visible=false;


	gameState = "mainScreen";

	Engine.run(engine);
}


function draw() {
Engine.update(engine);
trash.x=trashBody.body.position.x;
trash.y=trashBody.body.position.y;
console.log(trash.y);
properties();  
conditions();
drawSprites(); 
gameStates();
}

function  gameStates(){
	if(gameState==="mainScreen"){
	   main.visible=true;
	   selection.visible=true;
	   trash.visible=true;
	   trash.depth=main.depth +1;
	   trash.x = trashBody.body.position.x;
	   trash.y = trashBody.body.position.y;
	   trashBody.display();
       groundObject.display();
	   dustbinObj.display();
	   trashGIF.visible=true;
	}
	if(gameState==="mainScreen", mousePressedOver(selection)){
      gameState="selectionScreen";
	}
	if(gameState==="selectionScreen"){
		main.visible=false;
		selection.visible=false;
		selectionScreen.visible=true;
		trashGIF.visible=false;
		// bin1.visible=true;
	    // bin2.visible=true;
		// bin3.visible=true;
		back.visible=true;
		push();
		fill("BLACK");
		textStyle(BOLD);
		textFont("verdana");
		textSize(25);
		text("BACK", 110, 760);
		pop();
		back.depth=selectionScreen.depth+1;
		fill("black");
		textSize(20);
		textStyle(BOLDITALIC);
		text("DRY WASTE", trash1.x-8, 620);
		text("PLASTICS", trash2.x-8, 620);
		text("WET WASTE", trash3.x-8, 620);
		text("E-WASTE", trash4.x-8, 620);
		trash1.visible=true;
		trash2.visible=true;
		trash3.visible=true;
		trash4.visible=true;
	if(gameState==="selectionScreen" && mousePressedOver(back)){
		gameState="mainScreen";
		back.visible=false;
		selectionScreen.visible=false;
		trash1.visible=false;
	    trash2.visible=false;
	    trash3.visible=false;
	    trash4.visible=false;
	  }
	}
}
function properties(){
	if(keyDown(LEFT_ARROW)){
		Matter.Body.applyForce(trashBody.body, trashBody.body.position, {x: -10, y: -30});
	  }
	  if(keyDown(RIGHT_ARROW)){
		Matter.Body.applyForce(trashBody.body, trashBody.body.position, {x: 10, y: -30});
	  }
}
function conditions(){
	if(mousePressedOver(trash1)){
	   trash.changeImage("trashImage", trashImg);
	   gameState="mainScreen";
	   trash1.visible=false;
	   trash2.visible=false;
	   trash3.visible=false;
	   trash4.visible=false;
	   selectionScreen.visible=false;
	   back.visible=false;
	}
	if(mousePressedOver(trash2)){
		trash.changeImage("trashImage2", trash2Img);
		gameState="mainScreen";
		trash1.visible=false;
		trash2.visible=false;
		trash3.visible=false;
		trash4.visible=false;
		selectionScreen.visible=false;
		back.visible=false;
	 }
	 if(mousePressedOver(trash3)){
		trash.changeImage("trashImage3", trashImg3);
		gameState="mainScreen";
		trash1.visible=false;
		trash2.visible=false;
		trash3.visible=false;
		trash4.visible=false;
		selectionScreen.visible=false;
		back.visible=false;
	 }
	 if(mousePressedOver(trash4)){
		trash.changeImage("trashImage4", trash4Img);
		gameState="mainScreen";
		trash1.visible=false;
		trash2.visible=false;
		trash3.visible=false;
		trash4.visible=false;
		selectionScreen.visible=false;
		back.visible=false;
	 }
}