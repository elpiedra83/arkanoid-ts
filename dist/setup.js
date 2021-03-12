import RED_BRICK_IMAGE from "./images/brick-red.png";
import BLUE_BRICK_IMAGE from "./images/brick-blue.png";
import GREEN_BRICK_IMAGE from "./images/brick-green.png";
import YELLOW_BRICK_IMAGE from "./images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "./images/brick-purple.png";
// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector("#playField");
// Constants
export var STAGE_PADDING = 15;
export var STAGE_ROWS = 25;
export var STAGE_COLS = 10;
export var BRICK_PADDING = 1;
export var BRICK_WIDTH = canvas
    ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
    : 100;
export var BRICK_HEIGHT = canvas
    ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
    : 30;
// export const PADDLE_WIDTH = canvas.width / 6; //150;
export var PADDLE_HEIGHT = canvas.height / 24; //25;
export var PADDLE_STARTX = canvas.height; //450;
// export const PADDLE_SPEED = 15;
// export const BALL_SPEED = 10;
export var BALL_SIZE = 20;
export var BALL_STARTX = canvas.height;
export var BALL_STARTY = canvas.width - canvas.height;
export var INITIAL_LEVEL = 1;
export var BRICK_IMAGES = {
    1: RED_BRICK_IMAGE,
    2: GREEN_BRICK_IMAGE,
    3: YELLOW_BRICK_IMAGE,
    4: BLUE_BRICK_IMAGE,
    5: PURPLE_BRICK_IMAGE,
};
export var BRICK_ENERGY = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
};
// prettier-ignore
export var LEVELS = [
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
];
//# sourceMappingURL=setup.js.map