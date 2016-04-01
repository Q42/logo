Q42Logo['webgl-freak'] = function(logo){
	this.logo = logo;
};

var proto = Q42Logo['webgl-freak'].prototype = Object.create(Q42Logo.WebGL.prototype);
proto.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
	"uniform vec2 mousePos;",
	"varying vec2 mousePosF;",
	"varying vec3 position;",
	"void main()",
	"{",
		"position = vec3(pos.x*mousePos.x+pos.x*sin((pos.y*time)/200.),mousePos.y*pos.y+pos.y*cos(pos.x*time/1000.),pos.y*cos(time/2000.));",
		"mousePosF = mousePos;",
		"gl_Position = vec4(position,1.0);",
	"}"
].join("\n");

proto.fragmentShader = [
	"precision mediump float;",
	"uniform vec3 mainCol;",
	"varying vec2 mousePosF;",
	"varying vec3 position;",
	"void main()",
	"{",
		"float mouseDist = length(mousePosF);",
		"gl_FragColor = vec4(mainCol.r + mouseDist * 1. + position.x, mainCol.g + position.z, mainCol.b + position.y, 1.0);",
	"}"
].join("\n");
