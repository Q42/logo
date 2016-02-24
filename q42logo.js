
var canvas = document.getElementById("q42logo");
canvas.width = 200;
canvas.height = 200;
canvas.style.width = 100;
canvas.style.height = 100;

var ctx = canvas.getContext("2d");
ctx.scale(2,2);

draw(ctx);

function draw(ctx) {

  // q42/Path
  ctx.beginPath();
  ctx.moveTo(33.3, 100.0);
  ctx.bezierCurveTo(43.0, 69.1, 54.6, 63.8, 63.4, 46.6);
  ctx.bezierCurveTo(74.2, 25.3, 56.5, 0.0, 33.3, 0.0);
  ctx.bezierCurveTo(10.2, 0.0, -7.6, 25.3, 3.3, 46.6);
  ctx.bezierCurveTo(12.0, 63.8, 23.7, 69.1, 33.3, 100.0);
  ctx.closePath();
  ctx.fillStyle = "#84bc2d";
  ctx.fill();


  // q42/Compound Path
  ctx.beginPath();
  ctx.translate(0,2);
  ctx.moveTo(33.3, 31.3);
  ctx.bezierCurveTo(28.0, 31.3, 23.7, 27.0, 23.7, 21.6);
  ctx.bezierCurveTo(23.7, 19.1, 24.7, 16.6, 26.5, 14.8);
  ctx.bezierCurveTo(28.4, 13.0, 30.8, 12.0, 33.3, 12.0);
  ctx.bezierCurveTo(38.7, 12.0, 43.0, 16.3, 43.0, 21.6);
  ctx.bezierCurveTo(43.0, 23.1, 42.7, 24.5, 42.1, 25.8);
  ctx.lineTo(38.0, 22.6);
  ctx.lineTo(34.8, 26.6);
  ctx.lineTo(38.8, 29.6);
  ctx.bezierCurveTo(37.2, 30.7, 35.3, 31.3, 33.3, 31.3);
  ctx.moveTo(47.5, 36.3);
  ctx.lineTo(50.7, 32.3);
  ctx.lineTo(46.9, 29.5);
  ctx.bezierCurveTo(48.3, 27.1, 49.0, 24.4, 49.0, 21.6);
  ctx.bezierCurveTo(49.0, 13.0, 42.0, 6.0, 33.3, 6.0);
  ctx.lineTo(33.3, 6.0);
  ctx.bezierCurveTo(29.2, 6.0, 25.2, 7.6, 22.3, 10.6);
  ctx.bezierCurveTo(19.3, 13.5, 17.7, 17.5, 17.7, 21.6);
  ctx.bezierCurveTo(17.7, 30.3, 24.7, 37.3, 33.4, 37.3);
  ctx.bezierCurveTo(37.2, 37.3, 40.8, 35.9, 43.7, 33.4);
  ctx.lineTo(47.5, 36.3);
  ctx.closePath();
  ctx.fillStyle = "#FFF";
  ctx.fill();

  // 4 inside
  ctx.beginPath();
  ctx.moveTo(26.8, 45.1);
  ctx.lineTo(22.4, 51.6);
  ctx.lineTo(26.8, 51.6);
  ctx.lineTo(26.8, 45.1);
  ctx.closePath();
  ctx.moveTo(18.8, 51.8);
  ctx.lineTo(26.8, 40.7);
  ctx.lineTo(30.4, 40.7);
  ctx.lineTo(30.4, 51.6);
  ctx.lineTo(32.6, 51.6);
  ctx.lineTo(32.6, 54.8);
  ctx.lineTo(30.4, 54.8);
  ctx.lineTo(30.4, 58.0);
  ctx.lineTo(26.8, 58.0);
  ctx.lineTo(26.8, 54.8);
  ctx.lineTo(18.8, 54.8);
  ctx.lineTo(18.8, 51.8);
  ctx.closePath();
  ctx.fill();

  // 2
  ctx.beginPath();
  ctx.moveTo(35.0, 46.8);
  ctx.bezierCurveTo(35.0, 46.8, 34.9, 46.4, 34.9, 46.0);
  ctx.bezierCurveTo(35.0, 42.9, 37.2, 40.2, 41.3, 40.2);
  ctx.bezierCurveTo(45.2, 40.2, 47.6, 42.7, 47.6, 45.8);
  ctx.bezierCurveTo(47.6, 48.0, 46.3, 49.9, 44.2, 51.2);
  ctx.lineTo(40.8, 53.2);
  ctx.bezierCurveTo(40.2, 53.6, 39.6, 54.1, 39.3, 54.8);
  ctx.lineTo(47.7, 54.8);
  ctx.lineTo(47.7, 58.0);
  ctx.lineTo(34.8, 58.0);
  ctx.bezierCurveTo(34.8, 54.9, 35.8, 52.4, 38.9, 50.6);
  ctx.lineTo(41.8, 48.8);
  ctx.bezierCurveTo(43.3, 47.9, 43.8, 47.0, 43.8, 45.8);
  ctx.bezierCurveTo(43.8, 44.6, 43.0, 43.4, 41.2, 43.4);
  ctx.bezierCurveTo(39.4, 43.4, 38.5, 44.7, 38.5, 46.3);
  ctx.bezierCurveTo(38.5, 46.7, 38.5, 46.8, 38.5, 46.8);
  ctx.lineTo(35.0, 46.8);
  ctx.closePath();
  ctx.fill();

}
