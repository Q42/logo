Q42Logo['webgl-freak'] = function(logo){
	this.logo = logo;
	this.started = 0;
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
	"varying vec3 position;",
	"void main()",
	"{",
		"position = vec3(pos*(1.-amp),0.) + amp * vec3(pos.x*mousePos.x+pos.x*sin((pos.y*time)/200.),-mousePos.y*pos.y+pos.y*cos(pos.x*time/1000.),pos.y*cos(time/2000.));",
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
	"void main()",
	"{",
		"float mouseDist = length(mousePosF);",
		"vec3 color = mainCol;",
		"color.r = (1.-ampF) * mainCol.r + ampF * (mainCol.r + mouseDist * 1. + position.x);",
		"color.g = (1.-ampF) * mainCol.g + ampF * (mainCol.g + position.z);",
		"color.b = (1.-ampF) * mainCol.b + ampF * (mainCol.b + position.y);",
		"gl_FragColor = vec4(color , 1.0);",
	"}"
].join("\n");

proto.initModule = function(){
	console.log('imod!');
	this.logo.element.addEventListener('mouseenter', this.enter.bind(this));
	this.logo.element.addEventListener('mouseleave', this.leave.bind(this));
};

proto.enter = function(e){
	this.started = performance.now();
};
proto.leave = function(e){
	this.started = 0;
	this.uniformValues['amp'][0] = 0;
};
proto.updateValues = function(){
	if(!this.started) return;
	this.uniformValues['amp'][0] = Math.min(1000,(performance.now()-this.started)/3)/1000;
};
