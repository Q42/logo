Q42Logo['canvas-demo'] = function(logo){
	this.logo = logo;
};

var proto = Q42Logo['canvas-demo'].prototype = Object.create(Q42Logo.Canvas.prototype);

// Overwrite Q42Logo.Canvas prototype methods below

proto.draw = function(){
	console.log('draw!');
	var canvas = this.element;
	var ctx = this.ctx;
	var xo = canvas.width / 2;
	var yo = canvas.height / 2;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(xo, yo);
	this.drawLogo();
	ctx.translate(-xo, -yo);
};
