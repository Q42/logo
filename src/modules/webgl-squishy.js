Q42Logo['webgl-squishy'] = function (logo) {
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-squishy'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.author = 'Jiri';

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

	#define PI 3.1415926535897932384626433832795

	void main() {
		position = vec4(pos.x * ratio.x, pos.y * ratio.y, 0.0, 1.0);
		vec2 posAmpNearCenter = vec2(sin(pos.x*.5*PI), 1. - 1.*pow((pos.y+.4*cos(pos.y*.5*PI)), 2.));
		
		position.y += sin(time*.005)*.1*amp*(posAmpNearCenter.y*2.);
		position.x += sin(time*.006)*.1*amp*(posAmpNearCenter.x);
		position.x += sin(time*.004+pos.y*3.)*.05*amp*(pos.y*pos.y-1.);

		timeVar = time;
		timeF = time;
		ampF = amp;
		gl_Position = position;
	}
`

// The fragment shader gives the pixels their actual colour
proto.fragmentShader = glsl`
	precision mediump float;
	uniform vec3 mainCol;
	varying float ampF;
	varying float timeVar;
	varying vec4 position;

	const vec3 white = vec3(1.,1.,1.);
	
	void main() {
		vec3 rainbowColor = vec3(
			abs(cos(timeVar * .0012 + position.x * cos(timeVar*.0008) * 1.5) * (.9 + .3*position.y)),
			abs(cos(timeVar * .0016 + position.y * sin(timeVar*.0005) * 1.0) * (.9 - .4*position.x)),
			abs(cos(timeVar * .0029))
		);
		vec3 col = mix(mainCol, rainbowColor, ampF);

		if (mainCol == white) {
			col = white;
		}
		gl_FragColor = vec4(col.rgb, 1.0);
	}
`


// Module specifics -- fade-in and fade-out animation on mouse enter / leave
proto.initModule = function () {
	this.logo.element.addEventListener('mouseenter', this.enter.bind(this));
	this.logo.element.addEventListener('mouseleave', this.leave.bind(this));
};

proto.enter = function (e) {
	this.started = performance.now();
	this.leaving = 0;
	this.animating = true;
	this.render();
};
proto.leave = function (e) {
	this.started = performance.now();
	if (this.uniformValues['amp'])
		this.leaving = this.uniformValues['amp'][0];
	else {
		this.started = 0;
		this.animating = false;
	}
},
	proto.left = function (e) {
		this.started = 0;
		if (this.uniformValues['amp'])
			this.uniformValues['amp'][0] = 0;
		this.leaving = 0;
		this.animating = false;
	};
proto.updateValues = function () {
	if (!this.started) return;
	if (this.uniformValues['time'])
		this.uniformValues['time'][0] = performance.now() - this.started;

	if (this.uniformValues['amp']) {
		this.uniformValues['amp'][0] = Beziers[(this.leaving && 'easeOut' || 'easeInOutQuint')](Math.min(1000, (performance.now() - this.started) * (this.leaving && 4 || 2)) / 1000);
		if (this.leaving && (this.uniformValues['amp'][0] = this.leaving - this.uniformValues['amp'][0]) <= 0)
			this.left();
	}
};
