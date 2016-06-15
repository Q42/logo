Q42Logo['webgl-bouncing'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-bouncing'].prototype = Object.create(Q42Logo.WebGL.prototype);

// Custom variable used in shaders, the value is the size of the actual value
// 1: float, 2: vec2(x,y), 3: vec3(x,y,z)/(r,g,b), 4: vec4(x,y,z,w)/(r,g,b,a)
proto.uniforms['amp'] = 1;

proto.vertexShader = [
	"attribute vec2 pos;",
	"uniform float time;",
  "varying float timeVar;",
	"uniform float amp;",
	"uniform vec2 mousePos;",
	"varying vec2 mousePosF;",
	"varying float ampF;",
	"varying float timeF;",
	"uniform vec2 ratio;",
	"varying vec4 position;",
	"void main()",
	"{",
			// This variable is shared with the fragment shader
			// The 4th position is used for clipping-- irrelevant here, keep it at 1
			"position = vec4(pos.x*ratio.x*.5, pos.y*ratio.y*.5, 0.0, 1.0);",

			// Share time with fragment shader
			"timeVar = time;",

			// Manipulate the position of this vertex based on time
			"float bla = abs(sin(time*.005));",
			"position.y += bla * .6 * (position.y + 1.0);",
			"position.y += position.y * -.3;",
			"position.y += bla * .7;",
			"position.y += max(-.7, min(-.7, position.y));",

			// gl_Position is the default output variable
			"gl_Position = position;",
	"}"
].join("\n");

// The fragment shader gives the pixels their actual colour
proto.fragmentShader = [
	// Some default boilerplate mumbo-jumbo
	"precision mediump float;",

	// The colour as passed from Javascript
	"uniform vec3 mainCol;",

	// timestamp in MS from vertex shader
	"varying float timeVar;",

	// The shared vector position from the vertex shader
	"varying vec4 position;",

	// This runs for _every_ pixel drawn
	"void main()",
	"{",
			// Play with the colours
			"float red = abs(cos(timeVar*.0012));",
			"float green = abs(cos(timeVar*.0016));",
			"float blue = abs(cos(timeVar*.0029));",

			// Output is RGBA
			"gl_FragColor = vec4(red, green, blue, 1.0);",
	"}"
].join("\n");


// Module specifics -- fade-in and fade-out animation on mouse enter / leave
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