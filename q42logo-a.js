

var r = 33.3; //logo radius
var t_dist = r * 4; // radius of area in which logo starts to interact
var rspeed = 0.2; // easing curve


var canvas = document.getElementById('q42logo');
canvas.width = canvas.style.width || 66 * 3;
canvas.height = canvas.style.height || 100 * 3;

var pr = window.devicePixelRatio || 1; // pixel ration (2 for retina)
canvas.width *= pr;
canvas.height *= pr;

var ctx = canvas.getContext('2d');
ctx.scale(pr,pr)

var c = 0.551915024494; //magic!
var mx = 0, my = 0; // virtual mouse
var amx = 0, amy = 0 // actual mouse
var xo = canvas.width / 2 / pr;
var yo = canvas.height / 2 / pr;

      // begin custom shape

function draw() {

  requestAnimationFrame(draw);

  var r_dist = Math.sqrt(Math.pow(amx-xo,2) + Math.pow(amy-yo,2));

  // easing function + interactivity switch
  // todo use logistic curve (1/(1+e^(-steepness*(x-r))))
  if(r_dist < t_dist)
  {
    mx = mx + (amx - mx)*rspeed;
    my = my + (amy - my)*rspeed;
  }
  else {
    mx = mx + (xo + 0 - mx)*rspeed;
    my = my + (yo + 2 * r - my)*rspeed;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(xo, yo);
  //ctx.scale(scale, scale);

  // 1: drop shape

  // rotate path towards mouse
  var m_angle = Math.atan2(mx-xo, my-yo);
  var m_dist = Math.sqrt(Math.pow(mx-xo,2) + Math.pow(my-yo,2));

  ctx.rotate(-m_angle);

  ctx.beginPath();
  ctx.moveTo(0,-r);
  ctx.bezierCurveTo(c*r,-r, r,-c*r, r,0);
  ctx.bezierCurveTo(r,c*r,  r/2,r,  0, m_dist);
  ctx.bezierCurveTo(-r/2,r, -r,c*r, -r,0);
  ctx.bezierCurveTo(-r,-c*r,-c*r,-r,0,-r);
  ctx.closePath();

  ctx.rotate(m_angle);

  ctx.fillStyle = '#4C4';
  ctx.fill();


  ctx.rotate(-m_angle);
  // q42/Path
  ctx.beginPath();
  ctx.moveTo(33.3, 100.0);
  ctx.bezierCurveTo(43.0, 69.1, 54.6, 63.8, 63.4, 46.6);
  ctx.bezierCurveTo(74.2, 25.3, 56.5, 0.0, 33.3, 0.0);
  ctx.bezierCurveTo(10.2, 0.0, -7.6, 25.3, 3.3, 46.6);
  ctx.bezierCurveTo(12.0, 63.8, 23.7, 69.1, 33.3, 100.0);
  ctx.closePath();
  ctx.rotate(m_angle);
  ctx.fillStyle = "#84bc2d";
  ctx.fill();

//  ctx.scale(1/scale, 1/scale);
  ctx.translate(-xo, -yo);

}

canvas.addEventListener('mousemove', function(evt) {
    var rect = canvas.getBoundingClientRect();
    amx = evt.clientX - rect.left;
    amy = evt.clientY - rect.top;
  }, false);

draw();



/*var canvas = document.getElementById("q42logo");
canvas.width = 200;
canvas.height = 200;
canvas.style.width = 100;
canvas.style.height = 100;

var ctx = canvas.getContext("2d");
ctx.scale(2,2);

draw(ctx);
*/
function mehh(ctx) {

  // q42/Path
  ctx.beginPath();
  ctx.translatae(-33.3,-100.0);
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
  ctx.translate(0,2); // dependent on angle
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
