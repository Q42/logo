Q42Logo['webgl-freak'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-freak'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.uniforms['amp'] = 1;

proto.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
	"uniform float amp;",
	"uniform vec2 mousePos;",
	"varying vec2 mousePosF;",
	"varying float ampF;",
	"uniform vec2 ratio;",
	"varying vec3 position;",
	"void main()",
	"{",
		"position = vec3(pos*(1.-amp),0.) + amp * vec3(pos.x*mousePos.x+pos.x*sin((pos.y*time)/200.),-mousePos.y*pos.y+pos.y*cos(pos.x*time/1000.),pos.y*cos(time/2000.));",
		"position.xy *= ratio;",
		"mousePosF = mousePos;",
		"ampF = amp;",
		"gl_Position = vec4(position,1.0);",
	"}"
].join("\n");

proto.fragmentShader = [
	"precision mediump float;",
	"uniform vec3 mainCol;",
	"varying float ampF;",
	"varying vec2 mousePosF;",
	"varying vec3 position;",
	"const vec4 white = vec4(1.,1.,1.,1.);",
	"const vec4 transparent = vec4(0.,0.,0.,0.);",
	"void main()",
	"{",
		"float mouseDist = length(mousePosF);",
		"vec4 color = vec4(mainCol,1.);",
		"color.r = (1.-ampF) * mainCol.r + ampF * (mainCol.r + mouseDist * 1. + position.x);",
		"color.g = (1.-ampF) * mainCol.g + ampF * (mainCol.g + position.z);",
		"color.b = (1.-ampF) * mainCol.b + ampF * (mainCol.b + position.y);",

		"if(mainCol == white.rgb) {",
				"color = (1.-ampF) * white + ampF * transparent;",
		"}",

		"gl_FragColor = color;",
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
	this.uniformValues['amp'][0] = Beziers[(this.leaving && 'easeOut' || 'easeInOutQuint')](Math.min(1000,(performance.now()-this.started)*(this.leaving && 4 || 2))/1000);
	if(this.leaving && (this.uniformValues['amp'][0] = this.leaving - this.uniformValues['amp'][0]) <= 0)
		this.left();
};
