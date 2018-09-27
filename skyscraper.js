const Block = require("./block");
const Game = require("./game");


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const game = new Game(canvas, ctx);

  document.addEventListener("keydown", game.keyDownHandler, false)
  var myVar = setInterval(() => game.draw(myVar), 5);
});
