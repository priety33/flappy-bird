var bird;
var pipes;
var parallax = 0.8;
var score;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver;

function setup() {
  createCanvas(800, 600);
  pipeBodySprite = loadImage('graphics/pipe_marshmallow.png');
  pipePeakSprite = loadImage('graphics/pipe_marshmallow_fix.png');
  birdSprite = loadImage('graphics/train.png');
  bgImg = loadImage('graphics/background.png');
  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= 0) {
    image(bgImg, bgX + width, 0, width, height);
    if (bgX <= -width) {
      bgX = 0;
    }
  }
  
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();
}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  //gameover on centre
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  //scores on top left
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  pipes.push(new Pipe());
  bird = new Bird();
  gameoverFrame = frameCount;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset(); 
  }
}

