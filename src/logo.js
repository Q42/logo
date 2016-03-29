// Logo main constructor
function Q42Logo(element){
  console.info('New logo!', element);

  this.element = element;

  this.rendererName = element['dataset']['renderType'] || 'SVG';
  this.renderer = Q42Logo[this.rendererName] && new Q42Logo[this.rendererName](this) || new Q42Logo['SVG'](this);

  // prototype bindings to instance
  this.setSize = this.setSize.bind(this);
  this.setSizeDeferred = this.setSizeDeferred.bind(this);

  // internals
  this._setSizeAf = null;

  this.init();
};

Q42Logo.prototype = {
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
