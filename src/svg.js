// Render logo as SVG element
var cnt = 0;
Q42Logo.SVG = function(logo){
	this.logo = logo;
	this.index = cnt++;
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	this.element.setAttribute('viewBox', '0 0 333.2 500');
	if(this.logo.theme != 'green') {
		this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		this.mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
		this.mask.id = 'mask_'+this.index;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.rect.setAttribute('width','100%');
		this.rect.setAttribute('height','100%');
		this.rect.setAttribute('fill','white');
		this.mask.appendChild(this.rect);
		this.defs.appendChild(this.mask);
		this.element.appendChild(this.defs);
	}
};

Q42Logo.SVG.prototype = {
	paths: {
		shape: 'M166.6,500C214.8,345.7,273,319,316.9,232.9C371.2,126.5,282.5,0,166.6,0C50.7,0-37.9,126.5,16.4,232.9 C60.2,319,118.4,345.7,166.6,500z',
		q: 'M131.5,243l-22.7,33.9h22.7V243z M90,277.8l41.4-57.9h18.8v56.9h11.3v16.4h-11.3v16.6h-18.7v-16.6H90V277.8z',
		four: 'M175,251.8c0,0-0.1-2-0.1-4.2c0.2-16.2,12-30.2,33-30.2c20.2,0,32.6,13.4,32.6,29.1c0,11.7-6.4,21.2-17.6,28 l-17.4,10.6c-3.5,2.2-6.4,4.7-7.8,8.2H241v16.6h-66.8c0.1-15.9,5.1-28.8,21.3-38.6l14.9-8.9c7.7-4.6,10.7-9.3,10.7-15.6 c0-6.6-4.6-12.4-13.7-12.4c-9.6,0-14.3,6.5-14.3,15c0,1.7,0.1,2.4,0.1,2.4H175z',
		two: 'M256.4,175.7L237,160.8c6.9-12,10.9-25.8,10.9-40.7c0-44.9-36.4-81.3-81.3-81.3s-81.3,36.4-81.3,81.3 c0,44.9,36.4,81.3,81.3,81.3c20.6,0,39.3-7.6,53.6-20.2l19.8,15.2L256.4,175.7z M166.6,170.3c-27.7,0-50.1-22.4-50.1-50.1 s22.4-50.1,50.1-50.1s50.1,22.4,50.1,50.1c0,7.7-1.7,14.9-4.8,21.4l-21.1-16.2l-16.4,20.7l20.3,15.6 C186.7,167.1,177,170.3,166.6,170.3z'
	},

	init: function(){
		this.print();
		this.logo.element.appendChild(this.element);
	},

	print: function(){
		for(var x in this.paths) {
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', this.paths[x]);
			if(x != 'shape' && this.logo.colors.foreground == 'transparent') {
				path.setAttribute('fill', 'black');
				this.mask.appendChild(path);
			}
			else {
				if(x=='shape') {
					path.setAttribute('fill', this.logo.colors.background);
					if(this.logo.colors.foreground == 'transparent')
						path.setAttribute('mask', 'url(#mask_'+this.index+')');
				}
				else
					path.setAttribute('fill', this.logo.colors.foreground);

				this.element.appendChild(path);
			}
		}
	}
};

// Default canvas css
var style = document.createElement('style');
style.textContent = 'q42-logo > svg { width: 100%; height: 100%; pointer-events: none; }';
document.head.insertBefore(style, document.head.firstChild);

// For minification
Q42Logo['svg'] = Q42Logo.SVG;
