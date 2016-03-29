// Embedding logic using HTML5-tag / selector
Q42Logo.Embeds = function(){
	this.elements = [];
	this.instances = [];

	this.init();
};

Q42Logo.Embeds.prototype = {
	querySelector: 'q42-logo',

	init: function(){
		this.elements = document.querySelectorAll(this.querySelector);
		for(var i=0;i<this.elements.length;i++)
			this.print(this.elements[i]);
	},

	print: function(el) {
		if(el.printed) return;
		this.instances.push(new Q42Logo(el));
		el.printed = true;
	}

};

// dynamic element detector
addEventListener('DOMContentLoaded',function(){
	var embedder = new Q42Logo.Embeds;
	addEventListener('DOMNodeInserted',function(e){
		if(!e.target) return;
		if(e.target.tagName == 'Q42-LOGO') {
			embedder.print(e.target);
		}
		else if(e.target.querySelectorAll) {
			var els = e.target.querySelectorAll(embedder.querySelector);
			for(var i=0;i<els.length;i++)
				embedder.print(els[i]);
		}
	});
});
