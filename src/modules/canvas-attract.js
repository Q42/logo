// Constructor, []'s because of minification when compiling
Q42Logo['canvas-attract'] = function(logo){
	this.logo = logo;
	this.amx = 0;
	this.amy = 0;
	this.mx = 0;
	this.my = 0;
};

// Use the Q42Logo.Canvas prototype (canvas2d.js)
var proto = Q42Logo['canvas-attract'].prototype = Object.create(Q42Logo.Canvas.prototype);

proto.initModule = function() {
	this.logo.element.addEventListener('mousemove', this.move.bind(this), false);
};

proto.move = function(evt){
	var rect = this.element.getBoundingClientRect();
	this.amx = evt.clientX - rect.left;
	this.amy = evt.clientY - rect.top;
};

proto.draw = function(){

	this.draw = this.draw.bind(this);
	requestAnimationFrame(this.draw);

	var canvas = this.element;
	var ctx = this.ctx;
  var xo = canvas.width / 2;
  var yo = canvas.height / 2;

	var r = canvas.width;
  var t_dist = canvas.width; // radius of area in which logo starts to interact
  var rspeed = 0.2; // easing curve
  var amx = this.amx, amy = this.amy; // actual mouse

	var r_dist = Math.sqrt(Math.pow(amx-xo,2) + Math.pow(amy-yo,2));

  // easing function + interactivity switch
  // todo use logistic curve (1/(1+e^(-steepness*(x-r))))
  if(r_dist < t_dist)
  {
    this.mx = this.mx + (amx - this.mx) * rspeed;
    this.my = this.my + (amy - this.my) * rspeed;
  }
  else {
    this.mx = this.mx + (xo + 0 - this.mx) * rspeed;
    this.my = this.my + (yo + 2 * r - this.my) * rspeed;
  }


  var m_angle = Math.atan2(this.mx-xo, this.my-yo);
  var m_dist = Math.sqrt(Math.pow(this.mx-xo,2) + Math.pow(this.my-yo,2));

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(xo, yo);

	ctx.rotate(-m_angle);
	this.drawShape();
	ctx.rotate(m_angle);
	this.drawText();

	ctx.translate(-xo, -yo);
};
