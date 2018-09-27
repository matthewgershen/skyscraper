const Block = require("./block");
const Game = require("./game");


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const game = new Game();

  document.addEventListener("keydown", game.keyDownHandler, false)
  setInterval(() => game.draw(ctx,canvas), 5);

});
