var balloon, database;
var position;
var bg, balloonImg;
var canvas

function preload(){
bg = loadImage("cityImage.png")
balloonImg = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  canvas = createCanvas(1100,600);
  canvas.position (10,10)

  balloon = createSprite(250,250,10,10);
 
  balloon.addAnimation("Hot Air Balloon", balloonImg)
  balloon.scale = 0.5
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
      balloon.scale = balloon.scale -0.005
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
      balloon.scale = balloon.scale +0.005
    }
    drawSprites();

    textSize (25)
    fill ("red")
    text ("Press Arrow Keys To move Hot Air Balloon", 40,40)
  
}

function writePosition(x,y){
  database.ref('balloon/height').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
