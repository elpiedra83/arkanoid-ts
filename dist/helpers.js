var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Brick } from "./sprites/Brick";
import { BRICK_IMAGES, LEVELS, STAGE_COLS, STAGE_PADDING, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_ENERGY, } from "./setup";
export function createBricks(level) {
    return LEVELS.find(function (lev) { return lev.number === level; }).disposition.reduce(function (acumulator, element, i) {
        var row = Math.floor((i + 1) / STAGE_COLS); //gives the current row of the specific brick
        var col = i % STAGE_COLS; //correct column for the specific brick
        var x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING); //STAGE_PADDING is the space between walls and canvas
        var y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
        if (element === 0)
            return acumulator;
        return __spreadArrays(acumulator, [
            new Brick(BRICK_WIDTH, BRICK_HEIGHT, { x: x, y: y }, BRICK_ENERGY[element], BRICK_IMAGES[element]),
        ]);
    }, []);
}
//# sourceMappingURL=helpers.js.map