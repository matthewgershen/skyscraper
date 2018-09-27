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

/***/ "./block.js":
/*!******************!*\
  !*** ./block.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Block {\n  constructor(options) {\n    this.x = options.x;\n    this.y = options.y;\n    this.width = options.width;\n    this.height = options.height;\n    this.color = options.color;\n    this.dx = options.dx;\n    this.dy = options.dy;\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  incrementColor(){\n    let end = this.color.indexOf(\",\");\n    let colorValue = parseInt(this.color.slice(5,end));\n    colorValue += 4;\n    colorValue = (colorValue % 360);\n    return colorValue;\n  }\n\n  removeOverhang(baseBlock){\n    if (this.x > baseBlock.x) {\n      this.width = baseBlock.x + baseBlock.width - this.x;\n    } else {\n      this.width = this.x + this.width - baseBlock.x;\n      this.x = baseBlock.x;\n    }\n  }\n}\n\nmodule.exports = Block;\n\n\n//# sourceURL=webpack:///./block.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\n\nclass Game {\n  constructor() {\n    let baseColorValue = Math.floor(Math.random() * 361);\n    const bl = new Block (\n      {x: 282, y: 526, width: 300, height: 50, color:\"hsla(\" + `${baseColorValue}` +\", 73%, 50%, 1)\", dx: 0, dy: 0 }\n    );\n    const sw = new Block (\n      {x: 282, y: 80, width: 300, height: 50, color:\"hsla(\" + `${baseColorValue + 4}` +\", 73%, 50%, 1)\", dx: 1, dy: 0 }\n    );\n    this.baseBlocks = [bl];\n    this.swingingBlock = sw;\n    this.drop = false;\n    this.collision = false;\n    this.score = 0;\n    this.gameOver = false;\n    this.addSwingingBlock = this.addSwingingBlock.bind(this);\n    this.keyDownHandler = this.keyDownHandler.bind(this);\n    this.collisionCheck = this.collisionCheck.bind(this);\n    this.gameOverCheck = this.gameOverCheck.bind(this);\n    this.gameOverResize = this.gameOverResize.bind(this);\n  }\n\n  addSwingingBlock() {\n    let newColor = this.swingingBlock.incrementColor();\n    let lastWidth = this.swingingBlock.width\n    this.baseBlocks.push(this.swingingBlock);\n    this.swingingBlock = new Block({\n      x: 282,\n      y: 80,\n      width: lastWidth,\n      height: 50,\n      color: \"hsla(\" + `${newColor}` + \", 73%, 50%, 1)\",\n      dx: 1,\n      dy: 0\n    });\n  }\n\n  keyDownHandler(e){\n    if (e.keyCode === 32) {\n      this.drop = true;\n    }\n  }\n\n  collisionCheck(){\n    if ((this.swingingBlock.x < this.baseBlocks[this.baseBlocks.length - 1].x + this.baseBlocks[this.baseBlocks.length - 1].width &&\n   this.swingingBlock.x + this.swingingBlock.width > this.baseBlocks[this.baseBlocks.length - 1].x &&\n   this.swingingBlock.y < this.baseBlocks[this.baseBlocks.length - 1].y + this.baseBlocks[this.baseBlocks.length - 1].height &&\n   this.swingingBlock.y + this.swingingBlock.height > this.baseBlocks[this.baseBlocks.length - 1].y)) {\n      this.collision = true;\n    }\n  }\n\n  gameOverCheck(){\n    let bottom = this.swingingBlock.y + this.swingingBlock.height;\n    let top = this.baseBlocks[this.baseBlocks.length - 1].y + 2;\n    if (bottom > top) {\n      this.gameOver = true;\n    }\n  }\n\n\n  gameOverResize(canvas){\n    const newHeight = 50 * ((canvas.height/(this.score * 50)) * .75);\n    const yAdj = (this.baseBlocks[0].y - (canvas.height - 50));\n    this.baseBlocks.forEach((bl,idx)=>{\n      bl.height = newHeight;\n      bl.y = bl.y - yAdj + ((50 - newHeight)*(idx+1));\n    });\n  }\n\n  draw(ctx, canvas, myVar){\n    this.gameOverCheck();\n    if (this.gameOver) {\n      if (this.score > 5) {\n        this.gameOverResize(canvas);\n      }\n      clearInterval(myVar);\n    }\n\n    this.collisionCheck();\n    if (this.collision) {\n      this.score += 1;\n      this.drop = false;\n      this.swingingBlock.dx = 0;\n      this.swingingBlock.dy = 0;\n      this.collision = false;\n      this.swingingBlock.removeOverhang(this.baseBlocks[this.baseBlocks.length - 1]);\n      this.addSwingingBlock();\n    }\n\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    this.baseBlocks.forEach((bl)=>{\n      if (this.baseBlocks[this.baseBlocks.length-1].y < 300) {\n        bl.y += .15;\n        bl.draw(ctx);\n      } else {\n        bl.draw(ctx);\n      }\n    });\n    this.swingingBlock.draw(ctx);\n\n    if(this.swingingBlock.x + this.swingingBlock.dx > canvas.width-300 || this.swingingBlock.x + this.swingingBlock.dx < 0) {\n       this.swingingBlock.dx = -this.swingingBlock.dx;\n     }\n\n   if (this.drop) {\n     this.swingingBlock.dx = this.swingingBlock.dx*0.997;\n     this.swingingBlock.dy = 1;\n   }\n\n   this.swingingBlock.x += this.swingingBlock.dx;\n   this.swingingBlock.y += this.swingingBlock.dy;\n\n  }\n\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./skyscraper.js":
/*!***********************!*\
  !*** ./skyscraper.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n\n  const game = new Game();\n\n  document.addEventListener(\"keydown\", game.keyDownHandler, false)\n  var myVar = setInterval(() => game.draw(ctx,canvas,myVar), 5);\n});\n\n\n//# sourceURL=webpack:///./skyscraper.js?");

/***/ })

/******/ });