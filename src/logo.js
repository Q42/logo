// Logo main constructor
function Q42Logo(element){
	this.element = element;

	this.theme = element.getAttribute('theme') || 'green';
	this.colors = {
		background: this.theme == 'green' && '#84bc2d' || '#ffffff',
		foreground: this.theme == 'green' && '#ffffff' || 'transparent'
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

	this.preload();

	// internals
	this._setSizeAf = null;

	this.init();
};

Q42Logo.prototype = {
	aspect: 500/333.2,
	width: 100/3*2,
	height: 100/3*2 * 500/333.2,
	ratio: window.devicePixelRatio || 1,

	preload: function(){
		if(!this.element.getAttribute('renderer')) this.element.setAttribute('renderer', 'svg');

		this.rendererName = this.element.getAttribute('renderer');
		this.renderer = Q42Logo[this.rendererName] && new Q42Logo[this.rendererName](this) || new Q42Logo['svg'](this);

		// prototype bindings to instance
		this.setSize = this.setSize.bind(this);
		this.setSizeDeferred = this.setSizeDeferred.bind(this);
	},

	init: function(){
		this.renderer.init && this.renderer.init();
		if(this.renderer.error) {
			console.warn('Renderer [' + this.rendererName + '] gave error, defaulting to SVG.');
			this.element.removeAttribute('renderer');
			this.preload();
			this.init();
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
style.textContent = 'q42 { display: inline-block; } q42 > .fill { width: 100%; height: 100%; pointer-events: none; }';
document.head.insertBefore(style, document.head.firstChild);
