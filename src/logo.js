// The library of renderers
// Add yours if you want it included in random selection for plain <q42></q42>
var Renderers = [
	'webgl-freak',
	'webgl-wave',
	'webgl-flap',
	'webgl-bouncing'
];

// Logo main constructor
function Q42Logo(element){
	this.element = element;

	this.theme = element.getAttribute('theme') || 'green';
	this.colors = {
		background: '#ffffff',
		foreground: 'transparent'
	};

	switch(this.theme){
		case 'green':
			this.colors.background = '#84bc2d';
			this.colors.foreground = '#ffffff';
			break;
		case 'black':
			this.colors.background = '#000000';
			break;
	}

	// Prototype bindings to instance
	this.setSize = this.setSize.bind(this);
	this.setSizeDeferred = this.setSizeDeferred.bind(this);

	// Credits and a11y
	element.setAttribute('title', 'Q42');
	element.setAttribute('role', 'logo');
	element.setAttribute('aria-role', 'image');
	element.setAttribute('aria-label', 'Q42 Logo');

	// Internals
	this._setSizeAf = null;

	this.preload();
	this.init();
};

Q42Logo.prototype = {
	aspect: 500/333.2,
	width: 100/3*2,
	height: 100/3*2 * 500/333.2,
	ratio: window.devicePixelRatio || 1,

	preload: function(){
		this.rendererName = this.element.getAttribute('renderer');

		// If no renderer specified, pick a random one from Renderers
		if(!this.rendererName)
			this.rendererName = Renderers[Math.round(Math.random() * (Renderers.length - 1))];

		if(!Q42Logo[this.rendererName]) {
			console.warn('No renderer ' + this.rendererName + ' found.');
			this.element.setAttribute('renderer', this.rendererName = 'svg');
		}

		this.renderer = new Q42Logo[this.rendererName](this);
	},

	init: function(){
		this.renderer.init && this.renderer.init();
		if(this.renderer.error) {
			console.warn('Renderer [' + this.rendererName + '] gave error, defaulting to SVG.');
			this.element.setAttribute('renderer', this.rendererName = 'svg');
			this.preload();
			return this.init();
		}

		addEventListener('resize', this.setSize);
		this.setSize();
	},

	// Set (dynamic) width/height
	setSize: function(){
		cancelAnimationFrame(this._setSizeAf);
		this._setSizeAf = requestAnimationFrame(this.setSizeDeferred);
	},

	setSizeDeferred: function(){
		if(this.renderer.setSize)
			this.renderer.setSize();
	}
};

// For minification
window['Q42Logo'] = Q42Logo;

// Default <q42-logo> css
var style = document.createElement('style');
style.textContent = 'q42 { display: inline-block; vertical-align: bottom; position: relative; } q42 > canvas { position: relative; } q42 > .fill { width: 100%; height: 100%; pointer-events: none; }';
document.head.insertBefore(style, document.head.firstChild);
