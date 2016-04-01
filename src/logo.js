// Logo main constructor
function Q42Logo(element){
	this.element = element;

	this.theme = element.getAttribute('theme') || 'green';
	this.colors = {
		background: this.theme == 'green' && '#84bc2d' || '#ffffff',
		foreground: this.theme == 'green' && '#ffffff' || 'transparent'
	};

	if(!element.getAttribute('renderer')) element.setAttribute('renderer', 'svg');

	this.rendererName = element.getAttribute('renderer');
	this.renderer = Q42Logo[this.rendererName] && new Q42Logo[this.rendererName](this) || new Q42Logo['svg'](this);

	// prototype bindings to instance
	this.setSize = this.setSize.bind(this);
	this.setSizeDeferred = this.setSizeDeferred.bind(this);

	// internals
	this._setSizeAf = null;

	this.init();
};

Q42Logo.prototype = {
	aspect: 500/333.2,
	width: 100/3*2,
	height: 100/3*2 * 500/333.2,
	ratio: window.devicePixelRatio || 1,

	init: function(){
		this.renderer.init && this.renderer.init();

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
style.textContent = 'q42-logo { display: inline-block; } q42-logo > .fill { width: 100%; height: 100%; pointer-events: none; }';
document.head.insertBefore(style, document.head.firstChild);
