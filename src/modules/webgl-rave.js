Q42Logo['webgl-rave'] = function (logo) {
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-rave'].prototype = Object.create(Q42Logo.WebGL.prototype);

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

		float xAbs = abs(position.x);

		vec2 offset = vec2(0., 0.);
		offset +=
			pow((max(position.y, 0.)), .8)
			* vec2(
				xAbs*.4*sign(position.x),
				(pow(xAbs,.4) - .6) + (1.-sqrt(xAbs))*.1
			) * amp;
		position += vec4(offset, 0., 0.);

		timeVar = time;
		timeF = time;
		ampF = amp;
		
		vec2 posAmpNearCenter = vec2(sin(position.x*.5*PI), 1. - 1.*pow((position.y+.4*cos(position.y*.5*PI)), 2.));
		position.y += sin(time*.024)*.03*amp*(posAmpNearCenter.y*2.);
		position.x += sin(time*.2)*.03*amp*(posAmpNearCenter.x);
		position.x += sin(time*.007+position.y*3.)*.05*(position.y*position.y-1.)*amp;

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

	const vec3 white = vec3(1.);
	
	void main() {
		float x = -position.x * position.x * 2. + sin(timeVar*.0023) * cos(timeVar*.00051);
		if (x == 0.) x = .0001;
		float y = position.y * position.y * 2. + sin(timeVar*.0011) * cos(timeVar*.00061);
		vec3 raveCol = vec3(
			abs(cos(timeVar * .0029 + (1. - 1. / x * sin(10.*x)*cos(x*0.88)) + (1. - 1. / x * cos(10.*y)*3.*sin(x*1.1)))),
			abs(cos(timeVar * .0012)*sin(timeVar*.00063)),
			abs(cos(timeVar * .0023)*sin(timeVar*.00071) + position.x*cos(timeVar*.0005)+position.y*sin(timeVar*.0008))
		);
		raveCol *= mix(0.8, 1.2, abs(sin(timeVar*.9)));

		vec3 col = mix(mainCol, raveCol, ampF);
		float a = 1.;

		if (mainCol == white) {
			col = mix(white, white - raveCol * .5, abs(sin(timeVar*.01))*ampF);
			col = mix(white, vec3(0.), ampF);
			a = 0.;
		}
		gl_FragColor = vec4(col.rgb, a);
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
