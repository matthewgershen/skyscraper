const Block = require("./block");
const Game = require("./game");


window.onload = function(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const restart = document.getElementById("restart");

  const game = new Game(canvas, ctx);
  const intervals =[]
  document.addEventListener("keydown", game.keyDownHandler, false)
  intervals.push(setInterval(() => game.draw(intervals), 16));

  restart.addEventListener("click", (e)=>{
    document.getElementById("highScore").hidden = true;
    document.getElementsByClassName("wrapper")[0].focus();
    intervals.forEach((el)=>{
      clearInterval(el);
    });
    const game = new Game(canvas, ctx);
    document.addEventListener("keydown", game.keyDownHandler, false)
    intervals.push(setInterval(() => game.draw(intervals), 16));
  });
};
