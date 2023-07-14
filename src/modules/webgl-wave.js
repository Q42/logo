Q42Logo['webgl-wave'] = function(logo){
	this.logo = logo;
	this.started = 0;
	this.leaving = 0;
};

var proto = Q42Logo['webgl-wave'].prototype = Object.create(Q42Logo.WebGL.prototype);

proto.author = 'Sjoerd';

proto.uniforms['amp'] = 1;

proto.vertexShader = glsl`
	attribute vec2 pos;
	uniform float time;
	uniform float amp;
	uniform vec2 mousePos;
	varying vec2 mousePosF;
	varying float ampF;
	varying float timeF;
	uniform vec2 ratio;
	varying vec3 position;

	void main() {
		float offset = .02 * cos(time/100. - pos.x*5. + pos.y*15.);
		position = vec3(pos,0.) + amp * vec3(pos.x*offset,pos.y*offset,0.);
		position.xy *= ratio;
		position.z *= .001;
		mousePosF = mousePos;
		ampF = amp;
		timeF = time;
		gl_Position = vec4(position,1.0);
	}
`

proto.fragmentShader = glsl`
	precision mediump float;
	uniform vec3 mainCol;
	varying float ampF;
	varying vec2 mousePosF;
	varying float timeF;
	varying vec3 position;

	void main() {
		float mouseDist = length(mousePosF);
		vec3 color = mainCol;
		float lighten = .15*sin(timeF/100. - position.x*5. + position.y*15.);
		color.r = mainCol.r + ampF * lighten;
		color.g = mainCol.g + ampF * lighten;
		color.b = mainCol.b + ampF * lighten;
		gl_FragColor = vec4(color , 1.0);
	}
`

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
	this.leaving = this.uniformValues['amp'][0];
},
proto.left = function(e){
	this.started = 0;
	this.uniformValues['amp'][0] = 0;
	this.leaving = 0;
	this.animating = false;
};
proto.updateValues = function(){
	if(!this.started) return;
	this.uniformValues['time'][0] = performance.now() - this.started;
	this.uniformValues['amp'][0] = Beziers[(this.leaving && 'easeOut' || 'easeInOutQuint')](Math.min(1000,(performance.now()-this.started)*(this.leaving && 4 || 2))/1000);
	if(this.leaving && (this.uniformValues['amp'][0] = this.leaving - this.uniformValues['amp'][0]) <= 0)
		this.left();
};
