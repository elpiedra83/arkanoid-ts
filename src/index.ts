import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";
// images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";
// Level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
  INITIAL_LEVEL,
  LEVELS,
} from "./setup";

import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;
let lives = 3;
let level: number | undefined = INITIAL_LEVEL;
let actualLevel: number | undefined = undefined;
let levelName: string | undefined = "";
//Create all bricks
let bricks = createBricks(level);
let actualBricks = createBricks(0);

function setGameOver(view: CanvasView) {
  gameOver = false;
  if (lives !== 0) {
    actualBricks = bricks;
    view.drawInfo("Play next life");
    lives = lives - 1;
    let audio = new Audio(
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    );
    audio.play();
    nextLife(view);
  } else {
    view.drawInfo("Game Over!");
    actualLevel = 0;
    level = INITIAL_LEVEL;
    lives = 3;
    score = 0;
    bricks = createBricks(level);
    view.clear();
  }
}

function setGameWin(view: CanvasView) {
  gameOver = false;
  if (level <= LEVELS.length - 1) {
    level = level + 1;
    levelName = LEVELS.find((lev) => lev.number === level)?.name;
    view.drawInfo("Level win! prepare for the next level " + levelName);
    bricks = createBricks(level);
    view.clear();
  } else {
    level = INITIAL_LEVEL;
    view.drawInfo("CONGRATS!!! YOU WON THE GAME");
    bricks = createBricks(level);
    view.clear();
  }
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  //Move Ball
  ball.moveBall();
  //Move paddle and check so it wont exit the playfield
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }
  //Collision
  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    let audio = new Audio(
      "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    );
    audio.play();
    view.drawScore(score);
  }

  //Game Over when ball leaves playField or bricks are zero
  if (ball.pos.y > view.canvas.height || bricks.length === 0) {
    gameOver = true;
    //If game won, set GameOVer and display win
    if (bricks.length === 0) return setGameWin(view);
    // Return if gameover and dont run the requestAnimateFram
    if (gameOver) return setGameOver(view);
  }
  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  //Reset display
  level = LEVELS.find((lev) => lev.number === level)?.number;
  levelName = LEVELS.find((lev) => lev.number === level)?.name;
  view.drawInfo("");
  view.drawScore(score);
  view.drawLives(lives);
  view.drawLevel(level, levelName);
  //Create a colLision instance
  const collision = new Collision();
  if (level !== actualLevel) {
    //Create initial Bricks for the new level
    bricks = createBricks(level);
    actualLevel = level;
  } else {
    bricks = actualBricks;
  }
  //Create a Ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY,
    },
    BALL_IMAGE
  );
  //Create a paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle, ball, collision);
}

function nextLife(view: CanvasView) {
  //Next live display
  level = LEVELS.find((lev) => lev.number === level)?.number;
  levelName = LEVELS.find((lev) => lev.number === level)?.name;
  view.drawScore(score);
  view.drawLives(lives);
  view.drawLevel(level, levelName);
}

//Create a new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);
