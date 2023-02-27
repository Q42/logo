Q42Logo['webgl-bouncing'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-bouncing'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.author = 'Katja';

// Custom variable used in shaders, the value is the size of the actual value
// 1: float, 2: vec2(x,y), 3: vec3(x,y,z)/(r,g,b), 4: vec4(x,y,z,w)/(r,g,b,a)
proto.uniforms['amp'] = 1;

proto.vertexShader = glsl`
	attribute vec2 pos;
	uniform float time;
	varying float timeVar;
	uniform float amp;
	uniform vec2 mousePos;
	varying vec2 mousePosF;
	varying float ampF;
	varying float timeF;
	uniform vec2 ratio;
	varying vec4 position;

	void main() {
		// This variable is shared with the fragment shader
		// The 4th position is used for clipping-- irrelevant here, keep it at 1
		position = vec4(pos.x*ratio.x,pos.y*ratio.y,0.0,1.0);
		// Share time with fragment shader
		timeVar = time;
		ampF = amp;
		// position = vec4(pos.x*ratio.x*.5, pos.y*ratio.y*.5, 0.0, 1.0);
		// Manipulate the position of this vertex based on time
		position.xy *= 1.0 - ampF * .5;
		float bla = ampF * abs(cos(time*.005));
		position.y += bla * .6 * (position.y + 1.0);
		position.y += ampF * position.y * -.3;
		position.y += bla * .7;
		position.y += ampF * max(-.7, min(-.7, position.y));

		// gl_Position is the default output variable
		gl_Position = position;
	}
`

// The fragment shader gives the pixels their actual colour
proto.fragmentShader = glsl`
	// Some default boilerplate mumbo-jumbo
	precision mediump float;

	// The colour as passed from Javascript
	uniform vec3 mainCol;
	varying float ampF;

		// timestamp in MS from vertex shader
	varying float timeVar;

	// The shared vector position from the vertex shader
	varying vec4 position;

	const vec3 white = vec3(1.,1.,1.);

	// This runs for _every_ pixel drawn
	void main() {
		vec3 initialColor = vec3(132. / 255., 187. / 255., 37. / 255.);
		vec3 rainbowColor = vec3(abs(cos(timeVar * .0012)), abs(cos(timeVar * .0016)), abs(cos(timeVar * .0029)));
		// amp == 1 mouse over, amp == 0 mouse leave
		vec3 col = mix(initialColor, rainbowColor, ampF);

		if (mainCol == white) {
			col = white;
		}
		gl_FragColor = vec4(col.rgb, 1.0);
	}
`


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
