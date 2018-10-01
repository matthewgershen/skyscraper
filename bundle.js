/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./skyscraper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./background.js":
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Background {\n  constructor(options) {\n    this.image = new Image ();\n    this.image.src = './space_man2.jpg';\n    this.x = options.x;\n    this.y = options.y;\n    this.width = options.width;\n    this.height = options.height;\n  }\n\n  draw(ctx){\n    ctx.drawImage(this.image, this.x , this.y, this.width, this.height + 20);\n  }\n}\n\nmodule.exports = Background;\n\n\n//# sourceURL=webpack:///./background.js?");

/***/ }),

/***/ "./block.js":
/*!******************!*\
  !*** ./block.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Block {\n  constructor(options) {\n    this.x = options.x;\n    this.y = options.y;\n    this.width = options.width;\n    this.height = options.height;\n    this.color = options.color;\n    this.border = options.border;\n    this.dx = options.dx;\n    this.dy = options.dy;\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.strokeStyle = this.border\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  incrementColor(){\n    let end = this.color.indexOf(\",\");\n    let colorValue = parseInt(this.color.slice(5,end));\n    colorValue += 4;\n    colorValue = (colorValue % 360);\n    return colorValue;\n  }\n\n  removeOverhang(baseBlock){\n    if (this.x > baseBlock.x) {\n      this.width = baseBlock.x + baseBlock.width - this.x;\n    } else {\n      this.width = this.x + this.width - baseBlock.x;\n      this.x = baseBlock.x;\n    }\n  }\n}\n\nmodule.exports = Block;\n\n\n//# sourceURL=webpack:///./block.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Background = __webpack_require__(/*! ./background */ \"./background.js\");\n\nclass Game {\n  constructor(canvas, ctx) {\n    this.canvas = canvas;\n    this.canvas.width= 1500;\n    this.canvas.height= 1000;\n    this.initialBlockHeight = 75;\n    this.initialBlockWidth = 400;\n    this.swingSpeed = 2.2;\n    let baseColorValue = Math.floor(Math.random() * 361);\n    const bl = new Block (\n      {x: this.canvas.width/2-this.initialBlockWidth/2, y: canvas.height - this.initialBlockHeight, width: this.initialBlockWidth, height: this.initialBlockHeight, color:\"hsla(\" + `${baseColorValue}` +\", 73%, 50%, 1)\",border:\"hsla(\" + `${baseColorValue}` +\", 73%, 100%, 1)\", dx: 0, dy: 0 }\n    );\n    const sw = new Block (\n      {x: this.canvas.width/2-this.initialBlockWidth/2, y: 222, width: this.initialBlockWidth, height: this.initialBlockHeight, color:\"hsla(\" + `${baseColorValue + 4}` +\", 73%, 50%, 1)\", dx: this.swingSpeed, dy: 0 }\n    );\n    this.background = new Background ({x:0 ,y:-(7725-(this.canvas.height)) , width: 4700,height: 7715});\n    this.baseBlocks = [bl];\n    this.swingingBlock = sw;\n    this.endScrollDone = false;\n    this.drop = false;\n    this.collision = false;\n    this.score = 0;\n    this.gameOver = false;\n    this.ctx = ctx;\n    this.addSwingingBlock = this.addSwingingBlock.bind(this);\n    this.keyDownHandler = this.keyDownHandler.bind(this);\n    this.collisionCheck = this.collisionCheck.bind(this);\n    this.gameOverCheck = this.gameOverCheck.bind(this);\n    this.gameOverResize = this.gameOverResize.bind(this);\n  }\n\n  addSwingingBlock() {\n    let newColor = this.swingingBlock.incrementColor();\n    let lastWidth = this.swingingBlock.width\n    this.baseBlocks.push(this.swingingBlock);\n    this.swingingBlock = new Block({\n      x: this.canvas.width/2-lastWidth/2,\n      y: 222,\n      width: lastWidth,\n      height: this.initialBlockHeight,\n      color: \"hsla(\" + `${newColor}` + \", 73%, 50%, 1)\",\n      dx: this.swingSpeed,\n      dy: 0\n    });\n  }\n\n  keyDownHandler(e){\n    if (e.keyCode === 32) {\n      this.drop = true;\n    }\n  }\n\n  collisionCheck(){\n    if ((this.swingingBlock.x < this.baseBlocks[this.baseBlocks.length - 1].x + this.baseBlocks[this.baseBlocks.length - 1].width &&\n   this.swingingBlock.x + this.swingingBlock.width > this.baseBlocks[this.baseBlocks.length - 1].x &&\n   this.swingingBlock.y < this.baseBlocks[this.baseBlocks.length - 1].y + this.baseBlocks[this.baseBlocks.length - 1].height &&\n   this.swingingBlock.y + this.swingingBlock.height > this.baseBlocks[this.baseBlocks.length - 1].y)) {\n      this.collision = true;\n    }\n  }\n\n  gameOverCheck(){\n    let bottom = this.swingingBlock.y + this.swingingBlock.height;\n    let top = this.baseBlocks[this.baseBlocks.length - 1].y + 3;\n    if (bottom > top) {\n      this.gameOver = true;\n    }\n  }\n\n\n  gameOverResize(){\n\n    this.baseBlocks.forEach((bl,idx)=>{\n      bl.y -= 4;\n    });\n    this.background.y -= 4;\n\n  }\n\n  draw(myVar){\n    this.gameOverCheck();\n    if (this.gameOver) {\n      this.swingingBlock.color = \"hsla(0, 0%, 0%, 0)\";\n\n        if (this.background.y > -6725 && this.endScrollDone === false) {\n          this.gameOverResize();\n        }\n\n        else {\n            this.endScrollDone = true;\n            if (this.canvas.height < this.score * this.initialBlockHeight *1.22) {\n              this.canvas.height += 2;\n              this.canvas.width += 3;\n              this.background.y += 2;\n              this.baseBlocks.forEach((bl,idx)=>{\n                bl.y += 2;\n              });\n            } else {\n              clearInterval(myVar);\n            }\n          }\n      }\n\n\n\n    this.collisionCheck();\n    if (this.collision) {\n      this.score += 1;\n      this.drop = false;\n      this.swingingBlock.dx = 0;\n      this.swingingBlock.dy = 0;\n      this.collision = false;\n      this.swingingBlock.removeOverhang(this.baseBlocks[this.baseBlocks.length - 1]);\n      this.addSwingingBlock();\n    }\n\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.background.draw(this.ctx, this.canvas);\n\n\n    if (this.baseBlocks[this.baseBlocks.length-1].y < this.canvas.height * 0.6) {\n      this.background.y += 0.15;\n      this.baseBlocks.forEach((bl)=>{\n        bl.y += 0.15;\n        bl.draw(this.ctx);\n      });\n    } else {\n      this.baseBlocks.forEach((bl)=>{\n        bl.draw(this.ctx);\n      });\n    }\n\n    this.swingingBlock.draw(this.ctx);\n\n    if(this.swingingBlock.x + this.swingingBlock.dx > this.canvas.width-this.swingingBlock.width - 100|| this.swingingBlock.x + this.swingingBlock.dx < 100) {\n       this.swingingBlock.dx = -this.swingingBlock.dx;\n     }\n\n   if (this.drop) {\n     this.swingingBlock.dx = this.swingingBlock.dx*0.997;\n     this.swingingBlock.dy = 3;\n   }\n\n   this.swingingBlock.x += this.swingingBlock.dx;\n   this.swingingBlock.y += this.swingingBlock.dy;\n\n   this.ctx.font = \"30px Arial\";\n   this.ctx.fillStyle = \"red\";\n   this.ctx.textAlign = \"center\";\n   this.ctx.fillText(\"Score: \" + this.score, this.canvas.width/2, 40);\n\n   if (this.gameOver) {\n     this.ctx.font = \"30px Arial\";\n     this.ctx.fillStyle = \"red\";\n     this.ctx.textAlign = \"center\";\n     this.ctx.fillText(\"Game Over\", this.canvas.width/2, 80);\n   }\n\n  }\n\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./skyscraper.js":
/*!***********************!*\
  !*** ./skyscraper.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n\n  const game = new Game(canvas, ctx);\n\n  document.addEventListener(\"keydown\", game.keyDownHandler, false)\n  var myVar = setInterval(() => game.draw(myVar), 5);\n});\n\n\n//# sourceURL=webpack:///./skyscraper.js?");

/***/ })

/******/ });