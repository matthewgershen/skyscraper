const Block = require("./block");
const Game = require("./game");


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const restart = document.getElementById("restart");

  const game = new Game(canvas, ctx);
  const intervals =[]
  document.addEventListener("keydown", game.keyDownHandler, false)
  intervals.push(setInterval(() => game.draw(intervals), 5));


  restart.addEventListener("click", (e)=>{
    document.getElementsByClassName("wrapper")[0].focus();
    intervals.forEach((el)=>{
      clearInterval(el);
    });
    const game = new Game(canvas, ctx);
    document.addEventListener("keydown", game.keyDownHandler, false)
    intervals.push(setInterval(() => game.draw(intervals), 5));
  });
});
