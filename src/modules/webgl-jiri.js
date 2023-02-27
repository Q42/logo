Q42Logo['webgl-jiri'] = function (logo) {
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-jiri'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.author = 'Jiri';

// Custom variable used in shaders, the value is the size of the actual value
// 1: float, 2: vec2(x,y), 3: vec3(x,y,z)/(r,g,b), 4: vec4(x,y,z,w)/(r,g,b,a)
proto.uniforms['amp'] = 1;

// fetch('../src/modules/shaders/jiri.vs').then(async (r) => {
// 	console.log("hoi got vertex shader", await r.text())
// })

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
		//position.x += ;
		// vec2 posAmpNearCenter = vec2(sin(pos.x*.5*PI), cos(pos.y*.5*PI));
		// vec2 posAmpNearCenter = vec2(sin(pos.x*.5*PI), smoothstep(-1.,-.2,pos.y)-smoothstep(-.2,1.,pos.y));
		vec2 posAmpNearCenter = vec2(sin(pos.x*.5*PI), 1. - 1.*pow((pos.y+.4*cos(pos.y*.5*PI)), 2.));
		
		position.y += sin(time*.005)*.1*amp*(posAmpNearCenter.y*2.);
		position.x += sin(time*.006)*.1*amp*(posAmpNearCenter.x);
		position.x += sin(time*.004+pos.y*3.)*.05*amp*(pos.y*pos.y-1.);

		timeVar = time;
		timeF = time;
		ampF = amp;
		// position.xy *= 1.0 - ampF * .5;
		// float bla = ampF * abs(cos(time * .005));
		// position.y += bla * .6 * (position.y + 1.0);
		// position.y += ampF * position.y * -.3;
		// position.y += bla * .7;
		// position.y += ampF * max(-.7, min(-.7, position.y));
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
	
	void main() {
		// todo: trippy patroon hiervan maken
		// todo: light-pass om het wat 3d-gevoel te geven
		vec3 initialColor = vec3(132.0 / 255.0, 187.0 / 255.0, 37.0 / 255.0);
		float red = mix(initialColor.r, abs(cos(timeVar * .0012)), ampF);
		float green = mix(initialColor.g, abs(cos(timeVar * .0016)), ampF);
		float blue = mix(initialColor.b, abs(cos(timeVar * .0029)), ampF);

		if (mainCol == vec3(1.0, 1.0, 1.0)) {
			red = 1.0;
			green = 1.0;
			blue = 1.0;
		}
		gl_FragColor = vec4(red, green, blue, 1.0);
		// gl_FragColor = vec4(mainCol.rgb, 1.0);
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
