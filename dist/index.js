import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";
// images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";
// Level and colors
import { PADDLE_HEIGHT, PADDLE_STARTX, BALL_SIZE, BALL_STARTX, BALL_STARTY, INITIAL_LEVEL, LEVELS, } from "./setup";
import { createBricks } from "./helpers";
var gameOver = false;
var score = 0;
var lives = 3;
var level = INITIAL_LEVEL;
var actualLevel = undefined;
var levelName = "";
//Create all bricks
var bricks = createBricks(level);
var actualBricks = createBricks(0);
var paddleSpeed = 0;
var ballSpeed = 0;
var paddleWidth = 0;
var dificulty = "";
document.getElementById("dificulty").addEventListener("click", function (e) {
    var target = e.target;
    console.log(target.value);
    dificulty = target.value;
});
function setDificulty() {
    switch (dificulty) {
        case "easy":
            paddleSpeed = 25;
            ballSpeed = 5;
            paddleWidth = 250;
            break;
        case "normal":
            paddleSpeed = 20;
            ballSpeed = 10;
            paddleWidth = 200;
            break;
        case "hard":
            paddleSpeed = 15;
            ballSpeed = 15;
            paddleWidth = 100;
            break;
        default:
            paddleSpeed = 20;
            ballSpeed = 10;
            paddleWidth = 200;
            break;
    }
}
function setGameOver(view) {
    gameOver = false;
    if (lives !== 0) {
        actualBricks = bricks;
        view.clear();
        view.drawInfo("Play next life");
        lives = lives - 1;
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3");
        audio.play();
        nextLife(view);
    }
    else {
        view.drawInfo("Game Over!");
        actualLevel = 0;
        level = INITIAL_LEVEL;
        lives = 3;
        score = 0;
        bricks = createBricks(level);
        view.clear();
    }
}
function setGameWin(view) {
    var _a;
    gameOver = false;
    if (level <= LEVELS.length - 1) {
        level = level + 1;
        levelName = (_a = LEVELS.find(function (lev) { return lev.number === level; })) === null || _a === void 0 ? void 0 : _a.name;
        view.drawInfo("Level win! prepare for the next level " + levelName);
        bricks = createBricks(level);
        view.clear();
    }
    else {
        level = INITIAL_LEVEL;
        view.drawInfo("CONGRATS!!! YOU WON THE GAME");
        bricks = createBricks(level);
        view.clear();
    }
}
function gameLoop(view, bricks, paddle, ball, collision) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    //Move Ball
    ball.moveBall();
    //Move paddle and check so it wont exit the playfield
    if ((paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
        paddle.movePaddle();
    }
    //Collision
    collision.checkBallCollision(ball, paddle, view);
    var collidingBrick = collision.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score += 1;
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3");
        audio.play();
        view.drawScore(score);
    }
    //Game Over when ball leaves playField or bricks are zero
    if (ball.pos.y > view.canvas.height || bricks.length === 0) {
        gameOver = true;
        //If game won, set GameOVer and display win
        if (bricks.length === 0)
            return setGameWin(view);
        // Return if gameover and dont run the requestAnimateFram
        if (gameOver)
            return setGameOver(view);
    }
    requestAnimationFrame(function () { return gameLoop(view, bricks, paddle, ball, collision); });
}
function startGame(view) {
    var _a, _b;
    //get Dificulty level
    setDificulty();
    //Reset display
    level = (_a = LEVELS.find(function (lev) { return lev.number === level; })) === null || _a === void 0 ? void 0 : _a.number;
    levelName = (_b = LEVELS.find(function (lev) { return lev.number === level; })) === null || _b === void 0 ? void 0 : _b.name;
    view.drawInfo("");
    view.drawScore(score);
    view.drawLives(lives);
    view.drawLevel(level, levelName);
    //Create a colLision instance
    var collision = new Collision();
    if (level !== actualLevel) {
        //Create initial Bricks for the new level
        bricks = createBricks(level);
        actualLevel = level;
    }
    else {
        bricks = actualBricks;
    }
    //Create a Ball
    var ball = new Ball(ballSpeed, BALL_SIZE, {
        x: BALL_STARTX,
        y: BALL_STARTY,
    }, BALL_IMAGE);
    //Create a paddle
    var paddle = new Paddle(paddleSpeed, paddleWidth, PADDLE_HEIGHT, {
        x: PADDLE_STARTX,
        y: view.canvas.height - PADDLE_HEIGHT - 5,
    }, PADDLE_IMAGE);
    gameLoop(view, bricks, paddle, ball, collision);
}
function nextLife(view) {
    var _a, _b;
    //Next live display
    level = (_a = LEVELS.find(function (lev) { return lev.number === level; })) === null || _a === void 0 ? void 0 : _a.number;
    levelName = (_b = LEVELS.find(function (lev) { return lev.number === level; })) === null || _b === void 0 ? void 0 : _b.name;
    view.drawScore(score);
    view.drawLives(lives);
    view.drawLevel(level, levelName);
}
//Create a new view
var view = new CanvasView("#playField");
view.initStartButton(startGame);
//# sourceMappingURL=index.js.map