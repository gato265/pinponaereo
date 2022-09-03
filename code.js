var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//hacer los bordes de la cancha
var borde1 = createSprite(200, 0, 400, 10);
borde1.shapeColor = rgb(250, 250, 210);
var borde2 = createSprite(200, 400, 400, 10);
borde2.shapeColor =rgb(250, 250, 210); 
var borde3 = createSprite(0, 200, 10, 400);
borde3.shapeColor = rgb(250, 250, 210);
var borde4 = createSprite(400, 200, 10, 400);
borde4.shapeColor = "rgb(250, 250, 210)";

//porterias
var porteria1 = createSprite(200, 18, 100, 20);
porteria1.shapeColor=	rgb(240, 230, 140);
var porteria2 = createSprite(200, 382, 100, 20);
porteria2.shapeColor=	rgb(240, 230, 140);

//jugadores y objetos
var ball = createSprite(200, 200, 10, 10);
ball.shapeColor="yellow";
var playerpaddle = createSprite(200, 50, 50, 10);
playerpaddle.shapeColor= "black";
var computerpaddle = createSprite(200, 350, 50, 10);
computerpaddle.shapeColor= "black";

//variables
var pscore=0;
var cscore=0;
var gameState = "serve";

function draw() {
background("rgb(144, 238, 144)");
drawSprites();
textSize(20);
fill("black");
text(cscore, 25, 225);
text(pscore, 25, 185);


if (gameState == "serve") {
//texto de bienvenida 
textSize(20);
text("Presiona espacio para iniciar", 60, 185);
//movimiento de la pelota
}

if (gameState == "play") {
 //inteligencia de la raqueta
 computerpaddle.x = ball.x;
//hacer que nuestra raqueta se mueva
 paddlemovement(); 
 
 //procedimiento para aumentar puntos 
if (ball.isTouching(porteria1)) {
cscore = cscore +1; 
ball.x=200;
ball.y= 200;
ball.velocityX=0;
ball.velocityY=0;
}
if (ball.isTouching(porteria2)) {
pscore = pscore +1; 
ball.x=200;
ball.y= 200;
ball.velocityX=0;
ball.velocityY=0;
}
if (pscore ==5|| cscore ==5) {
gameState = "end"; 
}
}
if (gameState == "end") {
  //como hacer para que un jugador gane
  if (pscore==5||cscore==5 ) {
  fill("black");
  textSize(30);
  text("El juego a acabado", 60, 200);
  ball.x=200;
  ball.y= 200;
  ball.velocityX=0;
  ball.velocityY=0; 
  }
 gameState = "serve"; 
  pscore = 0;
  cscore = 0;  

}

if (keyDown("space")) {
ball.velocityX= 8;
ball.velocityY = 5;
gameState = "play";
}




//crear linea del centro 
for (var i = 0; i < 400; i=i+20) {
line(i, 200, i+10, 200);
}

//crear bordes
createEdgeSprites();
ball.bounceOff(edges);
ball.bounceOff(playerpaddle);
ball.bounceOff(computerpaddle);
computerpaddle.bounceOff(edges);
playerpaddle.bounceOff(edges);
}

function paddlemovement() {
  if (keyDown("up")) {
playerpaddle.y = playerpaddle.y -8;
  }
  if (keyDown("down")) {
  if (playerpaddle.y <120) {
  playerpaddle.y = playerpaddle.y +8;
  }
  }
  if (keyDown("RIGHT")) {
  playerpaddle.x =playerpaddle.x +8;  
  }
  if (keyDown("LEFT")) {
  playerpaddle.x =playerpaddle.x -8;
  }
  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
