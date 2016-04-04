// Constructor, []'s because of minification when compiling
Q42Logo['canvas-demo'] = function(logo){
	this.logo = logo;
};

// Use the Q42Logo.Canvas prototype (canvas2d.js)
var proto = Q42Logo['canvas-demo'].prototype = Object.create(Q42Logo.Canvas.prototype);

// Overwrite its methods below
// This is called once onload, use requestAnimationFrame on mouse hover
// for animation. Check out webgl.js for a .render() example.
proto.draw = function(){
	var canvas = this.element;
	var ctx = this.ctx;
	var xo = canvas.width / 2;
	var yo = canvas.height / 2;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(xo, yo);

	// Draw the druppel
	this.drawShape();

	// Draw Q42
	this.drawText();

	ctx.translate(-xo, -yo);
};
