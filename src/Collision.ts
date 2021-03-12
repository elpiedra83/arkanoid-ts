//Types
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";
import { BRICK_IMAGES } from "./setup";

export class Collision {
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true;
    }
    return false;
  }
  //Check ball collision with brick
  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;
    bricks.forEach((brick, i) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();
        if (brick.energy === 1) {
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;
        }
        colliding = true;
      }
    });
    return colliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    //1. Check ball collision with paddle
    let audio = new Audio();
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      audio = new Audio(
        "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
      );
      audio.play();
      ball.changeYDirection();
      if (ball.pos.x < paddle.pos.x + paddle.width / 2) ball.changeXDirection();
      if (ball.pos.x < paddle.pos.x - paddle.width / 2) ball.changeYDirection();
    }
    //2. Check ball collision with walls
    // Ball movement X contraints
    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      audio = new Audio(
        "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
      );
      audio.currentTime = 0;
      audio.play();
      ball.changeXDirection();
    }
    // Ball movement Y contraints
    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }
}
