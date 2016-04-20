Q42Logo['webgl-demo'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-demo'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.uniforms['amp'] = 1;

// The vertex shader transforms vertex coordinates to on-screen pixels
proto.vertexShader = [
	// x, y position for each vertex
	"attribute vec2 pos;",

	// timestamp in MS
	"uniform float time;",

	// amp
	"uniform float amp;",

	// Logo width, height ratio for correct rendering
	"uniform vec2 ratio;",

	// Mouse position [x,y], where center is [0,0]
	"uniform vec2 mousePos;",

	// This function runs for _every_ vector in the shape
	"void main()",
	"{",
			// gl_Position is the default output variable
			"gl_Position = vec4(pos.x*ratio.x,pos.y*ratio.y,0.0,1.0);",
	"}"
].join("\n");

proto.fragmentShader = [
	"precision mediump float;",
	"uniform vec3 mainCol;",
	"void main()",
	"{",
			"gl_FragColor = vec4(mainCol.r, mainCol.g, mainCol.b, 1.0);",
	"}"
].join("\n");

proto.initModule = function(){
	this.logo.element.addEventListener('mouseenter', this.enter.bind(this));
	this.logo.element.addEventListener('mouseleave', this.leave.bind(this));
};

proto.enter = function(e){
	this.started = performance.now();
	this.leaving = 0;
	this.animating = true;
	this.render();
};
proto.leave = function(e){
	this.started = performance.now();
	if(this.uniformValues['amp'])
		this.leaving = this.uniformValues['amp'][0];
	else {
		this.started = 0;
		this.animating = false;
	}
},
proto.left = function(e){
	this.started = 0;
	if(this.uniformValues['amp'])
		this.uniformValues['amp'][0] = 0;
	this.leaving = 0;
	this.animating = false;
};
proto.updateValues = function(){
	if(!this.started) return;
	if(this.uniformValues['time'])
		this.uniformValues['time'][0] = performance.now() - this.started;

	if(this.uniformValues['amp']) {
		this.uniformValues['amp'][0] = Beziers[(this.leaving && 'easeOut' || 'easeInOutQuint')](Math.min(1000,(performance.now()-this.started)*(this.leaving && 4 || 2))/1000);
		if(this.leaving && (this.uniformValues['amp'][0] = this.leaving - this.uniformValues['amp'][0]) <= 0)
			this.left();
	}
};
