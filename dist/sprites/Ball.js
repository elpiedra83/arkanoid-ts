var Ball = /** @class */ (function () {
    function Ball(speed, ballSize, position, image) {
        this.ballSize = ballSize;
        this.position = position;
        this.ballImage = new Image();
        this.dt = 1.0002;
        this.ballSize = ballSize;
        this.position = position;
        this.speed = {
            x: speed,
            y: -speed,
        };
        this.ballImage.src = image;
    }
    Object.defineProperty(Ball.prototype, "width", {
        get: function () {
            return this.ballSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "height", {
        get: function () {
            return this.ballSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "pos", {
        get: function () {
            return this.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "image", {
        get: function () {
            return this.ballImage;
        },
        enumerable: false,
        configurable: true
    });
    //Methods
    Ball.prototype.changeYDirection = function () {
        this.speed.y = -this.speed.y;
    };
    Ball.prototype.changeXDirection = function () {
        this.speed.x = -this.speed.x * this.dt;
    };
    Ball.prototype.moveBall = function () {
        this.pos.x += this.speed.x * this.dt;
        this.pos.y += this.speed.y;
    };
    return Ball;
}());
export { Ball };
//# sourceMappingURL=Ball.js.map