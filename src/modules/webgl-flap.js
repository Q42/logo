Q42Logo['webgl-flap'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-flap'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.uniforms['amp'] = 1;

proto.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
	"uniform float amp;",
	"uniform vec2 mousePos;",
	"varying vec2 mousePosF;",
	"varying float ampF;",
	"varying float timeF;",
	"varying float flap;",
	"uniform vec2 ratio;",
	"varying vec3 position;",
	"void main()",
	"{",
		"float a = amp * 3.1415 * 2.;",
		"float curve = (1. - cos(a)) * .5;",
		"flap = sin(time / 100.) * pow(pos.x, 2.) * pow(amp, .3);",
		"position = vec3(pos.x * cos(flap), pos.y, 1.0 - curve * (1. - cos(pos.y)) - flap * (1. - amp*.5));",
		"position = vec3(position.x, position.y * cos(a) + position.z * sin(a), position.z * cos(a) - position.y * sin(a));",
		"position = vec3(position.xy / ((2.5 - position.z) / 1.5) * ratio, 0.);",
		"mousePosF = mousePos;",
		"ampF = amp;",
		"timeF = time;",
		"gl_Position = vec4(position,1.0);",
	"}"
].join("\n");

proto.fragmentShader = [
	"precision mediump float;",
	"uniform vec3 mainCol;",
	"varying float ampF;",
	"varying vec2 mousePosF;",
	"varying float timeF;",
	"varying vec3 position;",
	"void main()",
	"{",
		"float mouseDist = length(mousePosF);",
		"vec3 color = mainCol;",
		"float lighten = sin(timeF / 100.) * pow(position.x, 1.) * pow(ampF, .3) * -1.;",
		"color.r = 1. - (1. - mainCol.r) * (1. - ampF * lighten);",
		"color.g = 1. - (1. - mainCol.g) * (1. - ampF * lighten);",
		"color.b = 1. - (1. - mainCol.b) * (1. - ampF * lighten);",
		"gl_FragColor = vec4(color , 1.0);",
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
	this.leaving = this.uniformValues['amp'][0];
},
proto.left = function(e){
	this.started = 0;
	this.uniformValues['amp'][0] = 0;
	this.leaving = 0;
	this.animating = false;
};
proto.updateValues = function(){
	if(!this.started) return;
	this.uniformValues['time'][0] = performance.now() - this.started;
	this.uniformValues['amp'][0] = Beziers[this.leaving ? 'easeIn' : 'easeOut'](Math.min(1000,(performance.now()-this.started)*0.5)/1000);
	if(this.leaving && (this.uniformValues['amp'][0] = this.leaving - this.uniformValues['amp'][0]) <= 0)
		this.left();
};
