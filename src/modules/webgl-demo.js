Q42Logo['webgl-demo'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-demo'].prototype = Object.create(Q42Logo.WebGL.prototype);

// Custom variable used in shaders, the value is the size of the actual value
// 1: float, 2: vec2(x,y), 3: vec3(x,y,z)/(r,g,b), 4: vec4(x,y,z,w)/(r,g,b,a)
proto.uniforms['amp'] = 1;

// The vertex shader transforms vertex coordinates to on-screen pixels
proto.vertexShader = [
	// x, y position for each vertex
	"attribute vec2 pos;",

	// timestamp in MS
	"uniform float time;",

	// Effect amplitude
	"uniform float amp;",

	// Logo width, height ratio for correct rendering
	"uniform vec2 ratio;",

	// Mouse position [x,y], where center is [0,0]
	"uniform vec2 mousePos;",

	// Send the vector to the fragment shader
	"varying vec4 position;",

	// timestamp in MS from vertex shader
	"varying float timeVar;",

	// This function runs for _every_ vector in the shape
	"void main()",
	"{",
			// This variable is shared with the fragment shader
			// The 4th position is used for clipping-- irrelevant here, keep it at 1
			"position = vec4(pos.x*ratio.x,pos.y*ratio.y,0.0,1.0);",

			// Share time with fragment shader
			"timeVar = time;",

			// Manipulate the x-position of this vertex based on time
			"position.x *= sin(time*.005);",

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
			"float red = mainCol.r * sin(timeVar*.002);",
			"float green = mainCol.g * sin(timeVar*.01);",
			"float blue = mainCol.b * sin(timeVar*.04);",

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
