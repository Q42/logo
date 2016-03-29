// Render logo as SVG element
Q42Logo['SVG'] = function(logo){
	this.logo = logo;
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	this.element.setAttribute('viewBox', '0 0 965 682.3');
	this.theme = logo.element['dataset']['theme'] || 'green';
};

Q42Logo['SVG'].prototype = {
	paths: {
		shape: 'M482.5,578.9c48.2-154.3,106.4-181,150.3-267.1C687,205.3,598.4,78.9,482.5,78.9S277.9,205.3,332.2,311.8 C376.1,397.8,434.3,424.6,482.5,578.9z',
		q: 'M447.3,312.8l-22.7,33.9h22.7V312.8z M405.9,347.7l41.4-57.9H466v56.9h11.3v16.4H466v16.6h-18.7v-16.6h-41.5 V347.7z',
		four: 'M490.8,321.7c0,0-0.1-2-0.1-4.2c0.2-16.2,12-30.2,33-30.2c20.2,0,32.6,13.4,32.6,29.1 c0,11.7-6.4,21.2-17.6,28l-17.4,10.6c-3.5,2.2-6.4,4.7-7.8,8.2h43.3v16.6H490c0.1-15.9,5.1-28.8,21.3-38.6l14.9-8.9 c7.7-4.6,10.7-9.3,10.7-15.6c0-6.6-4.6-12.4-13.7-12.4c-9.6,0-14.3,6.5-14.3,15c0,1.7,0.1,2.4,0.1,2.4H490.8z',
		two: 'M572.3,245.6l-19.4-14.9c6.9-12,10.9-25.8,10.9-40.7c0-44.9-36.4-81.3-81.3-81.3s-81.3,36.4-81.3,81.3 c0,44.9,36.4,81.3,81.3,81.3c20.6,0,39.3-7.6,53.6-20.2l19.8,15.2L572.3,245.6z M482.4,240.1c-27.7,0-50.1-22.4-50.1-50.1 s22.4-50.1,50.1-50.1s50.1,22.4,50.1,50.1c0,7.7-1.7,14.9-4.8,21.4l-21.1-16.2L490.2,216l20.3,15.6 C502.5,236.9,492.9,240.1,482.4,240.1z'
	},

	init: function(){
		this.print();
		this.logo.element.appendChild(this.element);
	},

	print: function(){
		for(var x in this.paths) {
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', this.paths[x]);
			switch(this.theme) {
				case 'green':
					switch(x) {
						case 'shape':
							path.setAttribute('fill', '#84bc2d');
						break;
						default:
							path.setAttribute('fill', '#ffffff');
						break;
					}
				break;
				case 'white':
					switch(x) {
						case 'shape':
							path.setAttribute('fill', '#ffffff');
						break;
						default:
							path.setAttribute('fill', '#000000');
						break;
					}
				break;
			}
			this.element.appendChild(path);
		}
	}
};

// Default canvas css
var style = document.createElement('style');
style.textContent = 'q42-logo > svg { width: 100%; height: 100%; }';
document.head.insertBefore(style, document.head.firstChild);
