import RED_BRICK_IMAGE from "./images/brick-red.png";
import BLUE_BRICK_IMAGE from "./images/brick-blue.png";
import GREEN_BRICK_IMAGE from "./images/brick-green.png";
import YELLOW_BRICK_IMAGE from "./images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "./images/brick-purple.png";

// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas: HTMLCanvasElement | null = document.querySelector("#playField");

// Constants
export const STAGE_PADDING = 15;
export const STAGE_ROWS = 25;
export const STAGE_COLS = 10;
export const BRICK_PADDING = 1;
export const BRICK_WIDTH = canvas
  ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
  : 100;
export const BRICK_HEIGHT = canvas
  ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
  : 30;
// export const PADDLE_WIDTH = canvas.width / 6; //150;
export const PADDLE_HEIGHT = canvas.height / 24; //25;
export const PADDLE_STARTX = canvas.height; //450;
// export const PADDLE_SPEED = 15;
// export const BALL_SPEED = 10;
export const BALL_SIZE = 20;
export const BALL_STARTX = canvas.height;
export const BALL_STARTY = canvas.width - canvas.height;
export const INITIAL_LEVEL = 1;

export const BRICK_IMAGES: { [key: number]: string } = {
  1: RED_BRICK_IMAGE,
  2: GREEN_BRICK_IMAGE,
  3: YELLOW_BRICK_IMAGE,
  4: BLUE_BRICK_IMAGE,
  5: PURPLE_BRICK_IMAGE,
};

export const BRICK_ENERGY: { [key: number]: number } = {
  1: 1, // Red brick
  2: 2, // Green brick
  3: 3, // Yellow brick
  4: 4, // Blue brick
  5: 5, // Purple brick
};

// prettier-ignore
export const LEVELS =
  [
    {
      number: 0, name: 'Default', disposition: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    },
    {
      number: 1, name: 'Zero', disposition: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
        0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
      ]
    },
    {
      number: 2, name: 'Easy', disposition: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
        0, 2, 2, 2, 0, 0, 2, 2, 2, 0,
        1, 3, 3, 3, 0, 0, 3, 3, 3, 1,
        0, 0, 4, 4, 0, 0, 4, 4, 0, 0,
        0, 0, 1, 5, 0, 0, 1, 5, 0, 0,
      ]
    },
    {
      number: 3, name: 'Random', disposition: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 3, 4, 4, 5, 5, 4, 4, 3, 0,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
        2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ]
    },
    {
      number: 4, name: 'Luis', disposition: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 2, 0, 2, 3, 4, 4, 4, 0,
        1, 0, 2, 0, 2, 3, 4, 0, 0, 0,
        1, 0, 2, 0, 2, 3, 4, 4, 4, 0,
        1, 0, 2, 0, 2, 3, 0, 0, 4, 0,
        1, 1, 2, 2, 2, 3, 4, 4, 4, 0,
      ]
    }
  ]
