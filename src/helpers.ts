import { Brick } from "./sprites/Brick";
import {
  BRICK_IMAGES,
  LEVELS,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY,
} from "./setup";

export function createBricks(level: number | undefined): Brick[] {
  return LEVELS.find((lev) => lev.number === level)!.disposition.reduce(
    (acumulator, element, i) => {
      const row = Math.floor((i + 1) / STAGE_COLS); //gives the current row of the specific brick
      const col = i % STAGE_COLS; //correct column for the specific brick

      const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING); //STAGE_PADDING is the space between walls and canvas
      const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

      if (element === 0) return acumulator;

      return [
        ...acumulator,
        new Brick(
          BRICK_WIDTH,
          BRICK_HEIGHT,
          { x, y },
          BRICK_ENERGY[element],
          BRICK_IMAGES[element]
        ),
      ];
    },
    [] as Brick[]
  );
}
