Q42Logo.WebGL = function(logo){
	this.logo = logo;

	this.aspect = 500/333.2;
	this.ratio = window.devicePixelRatio || 1;

	this.element = document.createElement('canvas');
	this.element.className = 'fill';
	this.gl = this.element.getContext('webgl');

	this.mainColor = new Float32Array(
		logo.theme == 'green' && [132/255, 187/255, 37/255] || [1,1,1]
	);
};

Q42Logo.WebGL.prototype = {
	vertexShader: [
		"attribute vec2 pos;",
		"void main()",
		"{",
				"gl_Position = vec4(pos.x,pos.y,0.0,1.0);",
		"}"
	].join("\n"),

	fragmentShader: [
		"precision mediump float;",
		"uniform vec3 mainCol;",
		"void main()",
		"{",
				"gl_FragColor = vec4(mainCol.r, mainCol.g, mainCol.b, 1.0);",
		"}"
	].join("\n"),

	init: function(){
		this.setupGL();
		this.logo.element.appendChild(this.element);
	},

	setSize: function(){
		this.element.width = this.logo.element.clientWidth * this.ratio;
		this.element.height = this.logo.element.clientHeight * this.ratio;
		this.draw();
	},

	// GL part
	setupGL: function(){
		var gl = this.gl;
		this.program = gl.createProgram();
		this.getShader(this.program, gl.VERTEX_SHADER, this.vertexShader);
		this.getShader(this.program, gl.FRAGMENT_SHADER, this.fragmentShader);
		gl.linkProgram(this.program);

		this.triangleBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vects, gl.STATIC_DRAW);
	},

	getShader: function(program, type, source) {
		var gl = this.gl;
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			gl.deleteProgram(program);
			return;
		}
		gl.attachShader(program, shader);
		gl.deleteShader(shader);
	},

	draw: function(){
		var gl = this.gl;
		var min = Math.min(this.element.width, this.element.height);

		if(this.element.height / this.element.width > 1) min*=this.aspect;
		if(min > this.element.height) min = this.element.height;

		gl.viewport(
			(this.element.width - min)/2,
			(this.element.height - min)/2,
			min,min
		);

		gl.useProgram(this.program);

		// send color
		var unif = gl.getUniformLocation(this.program, 'mainCol');
		gl.uniform3f(unif, this.mainColor[0], this.mainColor[1], this.mainColor[2]);

		// send vectors
		var attr = gl.getAttribLocation(this.program, 'pos');
		gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleBuffer);
		gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(attr);
		gl.drawArrays(gl.TRIANGLES, 0, vects.length/3);
		gl.disableVertexAttribArray(attr);

	}
};

// for minification
Q42Logo['webgl'] = Q42Logo.WebGL;
