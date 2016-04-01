Q42Logo['webgl-freak'] = function(logo){
	this.logo = logo;
};

Q42Logo['webgl-freak'].prototype = Object.create(Q42Logo.WebGL.prototype);
Q42Logo['webgl-freak'].prototype.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
	"void main()",
	"{",
			"gl_Position = vec4(pos.x*sin((pos.y*time)/200.),pos.y*cos(pos.x*time/1000.),pos.y*cos(time/2000.),1.0);",
	"}"
].join("\n");
