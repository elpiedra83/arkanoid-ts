var CanvasView = /** @class */ (function () {
    function CanvasView(canvasName) {
        this.canvas = document.querySelector(canvasName);
        this.context = this.canvas.getContext("2d");
        this.scoreDisplay = document.querySelector("#score");
        this.start = document.querySelector("#start");
        this.info = document.querySelector("#info");
        this.lives = document.querySelector("#lives");
        this.level = document.querySelector("#level");
        this.dificultyParent = document.querySelector("#dificultyParent");
        this.dificulty = Array.from(document.getElementsByName("dificulty")).find(function (r) { return r.checked; }).value;
    }
    CanvasView.prototype.clear = function () {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasView.prototype.initStartButton = function (startFunction) {
        var _this = this;
        var _a, _b;
        (_a = this.start) === null || _a === void 0 ? void 0 : _a.innerHTML = "Start";
        (_b = this.start) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
            var _a, _b;
            var audio = new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3");
            audio.play();
            startFunction(_this);
            (_a = _this.start) === null || _a === void 0 ? void 0 : _a.style.display = "none";
            (_b = _this.dificultyParent) === null || _b === void 0 ? void 0 : _b.style.display = "none";
            console.log(_this.dificulty);
        });
    };
    CanvasView.prototype.drawScore = function (score) {
        if (this.scoreDisplay)
            this.scoreDisplay.innerHTML = "<span class=\"headerTexts\">SCORE</span><span>" + score.toString() + "</span>";
    };
    CanvasView.prototype.drawInfo = function (text) {
        var _a;
        if (this.info)
            this.info.innerHTML = text;
        (_a = this.start) === null || _a === void 0 ? void 0 : _a.style.display = "block";
    };
    CanvasView.prototype.drawLevel = function (num, text) {
        if (this.level)
            this.level.innerHTML = "Level " + num + ": " + text;
    };
    CanvasView.prototype.drawLives = function (num) {
        if (this.lives)
            this.lives.innerHTML = "<span style=\"color:red;\">\u2764</span> " + num.toString();
    };
    CanvasView.prototype.drawSprite = function (brick) {
        var _a;
        if (!brick)
            return;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
    };
    CanvasView.prototype.drawBricks = function (bricks) {
        var _this = this;
        bricks.forEach(function (brick) { return _this.drawSprite(brick); });
    };
    return CanvasView;
}());
export { CanvasView };
//# sourceMappingURL=CanvasView.js.map