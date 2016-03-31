Q42Logo.WebGLFreak = function(logo){
	this.logo = logo;

	this.aspect = 500/333.2;
	this.ratio = window.devicePixelRatio || 1;

	this.element = document.createElement('canvas');
	this.element.className = 'fill';
	this.gl = this.element.getContext('webgl');

	this.af = null;
	this.render = this.render.bind(this);
	this.draw = this.draw.bind(this);

	this.mainColor = new Float32Array(
		logo.theme == 'green' && [132/255, 187/255, 37/255] || [1,1,1]
	);
};

Q42Logo.WebGLFreak.prototype = Object.create(Q42Logo.WebGL.prototype);

Q42Logo.WebGLFreak.prototype.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
	"void main()",
	"{",
			"gl_Position = vec4(pos.x*sin((pos.y*time)/200.),pos.y*cos(pos.x*time/1000.),pos.y*cos(time/2000.),1.0);",
	"}"
].join("\n"),

Q42Logo.WebGLFreak.prototype.constructor = Q42Logo.WebGLFreak;


Q42Logo['webgl-freak'] = Q42Logo.WebGLFreak;
