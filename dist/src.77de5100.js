// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var CanvasView =
/** @class */
function () {
  function CanvasView(canvasName) {
    this.canvas = document.querySelector(canvasName);
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.querySelector("#score");
    this.start = document.querySelector("#start");
    this.info = document.querySelector("#info");
    this.lives = document.querySelector("#lives");
    this.level = document.querySelector("#level");
    this.dificultyParent = document.querySelector("#dificultyParent");
  }

  CanvasView.prototype.clear = function () {
    var _a;

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  CanvasView.prototype.showOptions = function () {
    this.dificultyParent.style.display = "grid";
  };

  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;

    var _a;

    this.start.innerHTML = "Start";
    (_a = this.start) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
      var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3");
      audio.play();
      startFunction(_this);
      _this.start.style.display = "none";
      _this.dificultyParent.style.display = "none";
    });
  };

  CanvasView.prototype.drawScore = function (score) {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = "<span class=\"headerTexts\">SCORE</span><span>" + score.toString() + "</span>";
  };

  CanvasView.prototype.drawInfo = function (text) {
    if (this.info) this.info.innerHTML = text;
    this.start.style.display = "block";
  };

  CanvasView.prototype.drawLevel = function (num, text) {
    if (this.level) this.level.innerHTML = "Level " + num + ": " + text;
  };

  CanvasView.prototype.drawLives = function (num) {
    if (this.lives) this.lives.innerHTML = "<span style=\"color:red;\">\u2764</span> " + num.toString();
  };

  CanvasView.prototype.drawSprite = function (brick) {
    var _a;

    if (!brick) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
  };

  CanvasView.prototype.drawBricks = function (bricks) {
    var _this = this;

    bricks.forEach(function (brick) {
      return _this.drawSprite(brick);
    });
  };

  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{}],"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Ball =
/** @class */
function () {
  function Ball(speed, ballSize, position, image) {
    this.ballSize = ballSize;
    this.position = position;
    this.ballImage = new Image();
    this.dt = 1.0002;
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.ballImage.src = image;
  }

  Object.defineProperty(Ball.prototype, "width", {
    get: function get() {
      return this.ballSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "height", {
    get: function get() {
      return this.ballSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "image", {
    get: function get() {
      return this.ballImage;
    },
    enumerable: false,
    configurable: true
  }); //Methods

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
}();

exports.Ball = Ball;
},{}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Paddle =
/** @class */
function () {
  function Paddle(speed, paddleWidth, paddleHeight, position, image) {
    var _this = this;

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.paddleImage = new Image();

    this.handleKeyUp = function (e) {
      if (e.code === "ArrowLeft" || e.key === "ArrowLeft") _this.moveLeft = false;
      if (e.code === "ArrowRight" || e.key === "ArrowRight") _this.moveRight = false;
    };

    this.handleKeyDown = function (e) {
      if (e.code === "ArrowLeft" || e.key === "ArrowLeft") _this.moveLeft = true;
      if (e.code === "ArrowRight" || e.key === "ArrowRight") _this.moveRight = true;
    };

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image; //Event Listeners

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  Object.defineProperty(Paddle.prototype, "width", {
    //Getters
    get: function get() {
      return this.paddleWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "height", {
    get: function get() {
      return this.paddleHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });

  Paddle.prototype.movePaddle = function () {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
  };

  return Paddle;
}();

exports.Paddle = Paddle;
},{}],"Collision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

var Collision =
/** @class */
function () {
  function Collision() {}

  Collision.prototype.isCollidingBrick = function (ball, brick) {
    if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && ball.pos.y < brick.pos.y + brick.height && ball.pos.y + ball.height > brick.pos.y) {
      return true;
    }

    return false;
  }; //Check ball collision with brick


  Collision.prototype.isCollidingBricks = function (ball, bricks) {
    var _this = this;

    var colliding = false;
    bricks.forEach(function (brick, i) {
      if (_this.isCollidingBrick(ball, brick)) {
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
  };

  Collision.prototype.checkBallCollision = function (ball, paddle, view) {
    //1. Check ball collision with paddle
    var audio = new Audio();

    if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y) {
      audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3");
      audio.play();
      ball.changeYDirection();
      if (ball.pos.x < paddle.pos.x + paddle.width / 2) ball.changeXDirection();
      if (ball.pos.x < paddle.pos.x - paddle.width / 2) ball.changeYDirection();
    } //2. Check ball collision with walls
    // Ball movement X contraints


    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3");
      audio.currentTime = 0;
      audio.play();
      ball.changeXDirection();
    } // Ball movement Y contraints


    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  };

  return Collision;
}();

exports.Collision = Collision;
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "/paddle.f48d929a.png";
},{}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "/brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "/brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "/brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "/brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "/brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVELS = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.INITIAL_LEVEL = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _brickRed = _interopRequireDefault(require("./images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("./images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("./images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("./images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("./images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector("#playField"); // Constants

var STAGE_PADDING = 15;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 25;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 1;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30; // export const PADDLE_WIDTH = canvas.width / 6; //150;

exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_HEIGHT = canvas.height / 24; //25;

exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = canvas.height; //450;
// export const PADDLE_SPEED = 15;
// export const BALL_SPEED = 10;

exports.PADDLE_STARTX = PADDLE_STARTX;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = canvas.height;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = canvas.width - canvas.height;
exports.BALL_STARTY = BALL_STARTY;
var INITIAL_LEVEL = 1;
exports.INITIAL_LEVEL = INITIAL_LEVEL;
var BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_ENERGY = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
}; // prettier-ignore

exports.BRICK_ENERGY = BRICK_ENERGY;
var LEVELS = [{
  number: 0,
  name: 'Default',
  disposition: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  number: 1,
  name: 'Zero',
  disposition: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
}, {
  number: 2,
  name: 'Easy',
  disposition: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 3, 3, 0, 0, 3, 3, 3, 1, 0, 0, 4, 4, 0, 0, 4, 4, 0, 0, 0, 0, 1, 5, 0, 0, 1, 5, 0, 0]
}, {
  number: 3,
  name: 'Random',
  disposition: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 5, 5, 4, 4, 3, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
}, {
  number: 4,
  name: 'Luis',
  disposition: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2, 3, 4, 4, 4, 0, 1, 0, 2, 0, 2, 3, 4, 0, 0, 0, 1, 0, 2, 0, 2, 3, 4, 4, 4, 0, 1, 0, 2, 0, 2, 3, 0, 0, 4, 0, 1, 1, 2, 2, 2, 3, 4, 4, 4, 0]
}];
exports.LEVELS = LEVELS;
},{"./images/brick-red.png":"images/brick-red.png","./images/brick-blue.png":"images/brick-blue.png","./images/brick-green.png":"images/brick-green.png","./images/brick-yellow.png":"images/brick-yellow.png","./images/brick-purple.png":"images/brick-purple.png"}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var Brick =
/** @class */
function () {
  function Brick(brickWidth, brickHeight, position, brickEnergy, image) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage = new Image();
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage.src = image;
  }

  Object.defineProperty(Brick.prototype, "width", {
    //Gettters
    get: function get() {
      return this.brickWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "height", {
    get: function get() {
      return this.brickHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "image", {
    get: function get() {
      return this.brickImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "energy", {
    get: function get() {
      return this.brickEnergy;
    },
    //Setter
    set: function set(nr) {
      this.brickEnergy = nr;
    },
    enumerable: false,
    configurable: true
  });
  return Brick;
}();

exports.Brick = Brick;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = createBricks;

var _Brick = require("./sprites/Brick");

var _setup = require("./setup");

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function createBricks(level) {
  return _setup.LEVELS.find(function (lev) {
    return lev.number === level;
  }).disposition.reduce(function (acumulator, element, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS); //gives the current row of the specific brick

    var col = i % _setup.STAGE_COLS; //correct column for the specific brick

    var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING); //STAGE_PADDING is the space between walls and canvas

    var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
    if (element === 0) return acumulator;
    return __spreadArrays(acumulator, [new _Brick.Brick(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
      x: x,
      y: y
    }, _setup.BRICK_ENERGY[element], _setup.BRICK_IMAGES[element])]);
  }, []);
}
},{"./sprites/Brick":"sprites/Brick.ts","./setup":"setup.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _Ball = require("./sprites/Ball");

var _Paddle = require("./sprites/Paddle");

var _Collision = require("./Collision");

var _paddle = _interopRequireDefault(require("./images/paddle.png"));

var _ball = _interopRequireDefault(require("./images/ball.png"));

var _setup = require("./setup");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// images
// Level and colors
var gameOver = false;
var score = 0;
var lives = 3;
var level = _setup.INITIAL_LEVEL;
var actualLevel = undefined;
var levelName = ""; //Create all bricks

var bricks = (0, _helpers.createBricks)(level);
var actualBricks = (0, _helpers.createBricks)(0);
var paddleSpeed = 0;
var ballSpeed = 0;
var paddleWidth = 0;
var dificulty = "";
document.getElementById("start").addEventListener("click", function (e) {
  var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-magic-sweep-game-trophy-257.mp3");
  audio.play();
});
document.getElementById("dificulty").addEventListener("click", function (e) {
  var target = e.target;
  dificulty = target.value;
  var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-martial-arts-punch-2052.mp3");
  audio.play();
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
    var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-space-shooter-dead-notification-272.mp3");
    audio.play();
    nextLife(view);
  } else {
    view.drawInfo("Game Over!");
    actualLevel = 0;
    level = _setup.INITIAL_LEVEL;
    lives = 3;
    score = 0;
    bricks = (0, _helpers.createBricks)(level);
    var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");
    audio.play();
    view.clear();
    view.showOptions();
  }
}

function setGameWin(view) {
  var _a;

  gameOver = false;

  if (level <= _setup.LEVELS.length - 1) {
    level = level + 1;
    levelName = (_a = _setup.LEVELS.find(function (lev) {
      return lev.number === level;
    })) === null || _a === void 0 ? void 0 : _a.name;
    view.drawInfo("Level win! prepare for the next level " + levelName);
    bricks = (0, _helpers.createBricks)(level);
    var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3");
    audio.play();
    view.clear();
  } else {
    level = _setup.INITIAL_LEVEL;
    view.drawInfo("CONGRATS!!! YOU WON THE GAME");
    bricks = (0, _helpers.createBricks)(level);
    view.clear();
  }
}

function gameLoop(view, bricks, paddle, ball, collision) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball); //Move Ball

  ball.moveBall(); //Move paddle and check so it wont exit the playfield

  if (paddle.isMovingLeft && paddle.pos.x > 0 || paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) {
    paddle.movePaddle();
  } //Collision


  collision.checkBallCollision(ball, paddle, view);
  var collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    var audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3");
    audio.play();
    view.drawScore(score);
  } //Game Over when ball leaves playField or bricks are zero


  if (ball.pos.y > view.canvas.height || bricks.length === 0) {
    gameOver = true; //If game won, set GameOVer and display win

    if (bricks.length === 0) return setGameWin(view); // Return if gameover and dont run the requestAnimateFram

    if (gameOver) return setGameOver(view);
  }

  requestAnimationFrame(function () {
    return gameLoop(view, bricks, paddle, ball, collision);
  });
}

function startGame(view) {
  var _a, _b; //get Dificulty level


  setDificulty(); //Reset display

  level = (_a = _setup.LEVELS.find(function (lev) {
    return lev.number === level;
  })) === null || _a === void 0 ? void 0 : _a.number;
  levelName = (_b = _setup.LEVELS.find(function (lev) {
    return lev.number === level;
  })) === null || _b === void 0 ? void 0 : _b.name;
  view.drawInfo("");
  view.drawScore(score);
  view.drawLives(lives);
  view.drawLevel(level, levelName); //Create a colLision instance

  var collision = new _Collision.Collision();

  if (level !== actualLevel) {
    //Create initial Bricks for the new level
    bricks = (0, _helpers.createBricks)(level);
    actualLevel = level;
  } else {
    bricks = actualBricks;
  } //Create a Ball


  var ball = new _Ball.Ball(ballSpeed, _setup.BALL_SIZE, {
    x: _setup.BALL_STARTX,
    y: _setup.BALL_STARTY
  }, _ball.default); //Create a paddle

  var paddle = new _Paddle.Paddle(paddleSpeed, paddleWidth, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _paddle.default);
  gameLoop(view, bricks, paddle, ball, collision);
}

function nextLife(view) {
  var _a, _b; //Next live display


  level = (_a = _setup.LEVELS.find(function (lev) {
    return lev.number === level;
  })) === null || _a === void 0 ? void 0 : _a.number;
  levelName = (_b = _setup.LEVELS.find(function (lev) {
    return lev.number === level;
  })) === null || _b === void 0 ? void 0 : _b.name;
  view.drawScore(score);
  view.drawLives(lives);
  view.drawLevel(level, levelName);
} //Create a new view


var view = new _CanvasView.CanvasView("#playField");
view.initStartButton(startGame);
},{"./view/CanvasView":"view/CanvasView.ts","./sprites/Ball":"sprites/Ball.ts","./sprites/Paddle":"sprites/Paddle.ts","./Collision":"Collision.ts","./images/paddle.png":"images/paddle.png","./images/ball.png":"images/ball.png","./setup":"setup.ts","./helpers":"helpers.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50933" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map