// Fill these out first
var MODULE_NAME = 'webgl-demo'; // your module id
var MODULE_AUTHOR = 'demo'; // your name/twitter

// WebGL logo boilerplate
Q42Logo[MODULE_NAME] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

// Copy the prototype of the boilerplate
var proto = Q42Logo[MODULE_NAME].prototype = Object.create(Q42Logo.WebGL.prototype);

// Set author
proto.author = MODULE_AUTHOR;

// Margin, in px
proto.margin = 0;

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

	// Timestamp in ms from vertex shader
	"varying float timeVar;",

	// The amplitude of your effect (when mouse-overed) (0-1)
	"varying float ampF;",

	// This function runs for _every_ vector in the shape
	"void main()",
	"{",
			// This variable is shared with the fragment shader
			// The 4th position is used for clipping-- irrelevant here, keep it at 1
			"position = vec4(pos.x*ratio.x,pos.y*ratio.y,0.0,1.0);",

			// Send needed variables to fragment shader
			"timeVar = time;",
			"ampF = amp;",

			// Manipulate the x-position of this vertex based on time
			"position.x *= cos(time*.005);",

			// gl_Position is the default output variable
			"gl_Position = position;",
	"}"
].join("\n");

// The fragment shader gives the pixels their actual color
proto.fragmentShader = [
	// Some default boilerplate mumbo-jumbo
	"precision mediump float;",

	// The color as passed from Javascript
	"uniform vec3 mainCol;",

	// timestamp in MS from vertex shader
	"varying float timeVar;",

	// The amplitude of your effect
	"varying float ampF;",

	// The shared vector position from the vertex shader
	"varying vec4 position;",

	// Color definitions
	"const vec4 white = vec4(1.,1.,1.,1.);",
	"const vec4 transparent = vec4(0.,0.,0.,0.);",

	// This runs for _every_ pixel drawn
	"void main()",
	"{",
			// The output color, inherit from main color
			"vec4 color = vec4(mainCol,1.);",

			// Play with the colors
			"color.r = mainCol.r * cos(timeVar*.002);",
			"color.g = mainCol.g * cos(timeVar*.01);",
			"color.b = mainCol.b * cos(timeVar*.04);",

			// What to do with the white letters
			//"if(mainCol == white.rgb) {",
				// ampF becomes 1 when hovered

				// Keep them white,
				//"color = white;",

				// ..or make them transparent on hover
				//"color = (1.-ampF) * white + ampF * transparent;",
			//"}",

			// gl_FragColor is the color rendered on screen
			"gl_FragColor = color;",
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
