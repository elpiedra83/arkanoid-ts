import { Brick } from "../sprites/Brick";
import { Paddle } from "../sprites/Paddle";
import { Ball } from "../sprites/Ball";
import { BRICK_IMAGES } from "~/setup";

export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLBodyElement | null;
  private info: HTMLObjectElement | null;
  private lives: HTMLObjectElement | null;
  private level: HTMLObjectElement | null;
  private dificulty: HTMLObjectElement | null;
  private dificultyParent: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.querySelector("#score");
    this.start = document.querySelector("#start");
    this.info = document.querySelector("#info");
    this.lives = document.querySelector("#lives");
    this.level = document.querySelector("#level");
    this.dificultyParent = document.querySelector("#dificultyParent");
    this.dificulty = Array.from(document.getElementsByName("dificulty")).find(
      (r) => r.checked
    ).value;
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.innerHTML = `Start`;
    this.start?.addEventListener("click", () => {
      let audio = new Audio(
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
      );
      audio.play();
      startFunction(this);
      this.start?.style.display = "none";
      this.dificultyParent?.style.display = "none";
      console.log(this.dificulty);
    });
  }

  drawScore(score: number): void {
    if (this.scoreDisplay)
      this.scoreDisplay.innerHTML = `<span class="headerTexts">SCORE</span><span>${score.toString()}</span>`;
  }

  drawInfo(text: string): void {
    if (this.info) this.info.innerHTML = text;
    this.start?.style.display = "block";
  }

  drawLevel(num: number | undefined, text: string | undefined): void {
    if (this.level) this.level.innerHTML = `Level ${num}: ${text}`;
  }

  drawLives(num: number): void {
    if (this.lives)
      this.lives.innerHTML = `<span style="color:red;">❤</span> ${num.toString()}`;
  }

  drawSprite(brick: Brick | Paddle | Ball): void {
    if (!brick) return;
    this.context?.drawImage(
      brick.image,
      brick.pos.x,
      brick.pos.y,
      brick.width,
      brick.height
    );
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach((brick) => this.drawSprite(brick));
  }
}
