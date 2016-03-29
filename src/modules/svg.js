// Render logo as SVG element
Q42Logo['SVG'] = function(logo){
	this.logo = logo;
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	this.element.setAttribute('viewBox', '0 0 173 260');
	this.theme = logo.element['dataset']['theme'] || 'green';
};

Q42Logo['SVG'].prototype = {
	paths: {
		shape: 'M89.856,253.353c-5.553-22.699-11.744-40.749-18.563-54.153c-6.818-13.404-17.121-27.871-30.903-43.396 l-5.954-6.607C16.467,129.154,7.319,108.972,6.998,88.657c-0.354-22.445,7.217-41.828,22.716-58.151 C45.213,14.175,63.955,5.843,85.932,5.495c21.865-0.347,40.803,7.39,56.811,23.22c16.008,15.825,24.189,34.958,24.545,57.403 c0.322,20.316-8.181,40.777-25.507,61.379l-5.74,6.793c-13.279,15.952-23.117,30.739-29.508,44.352 C100.14,212.254,94.581,230.49,89.856,253.353z',
		q: 'M87.345,78.291l7.837,5.602c-2.939,1.154-6.096,1.565-8.817,1.565c-8.813,0-21.22-4.119-21.22-20.68 s12.406-20.68,21.22-20.68c8.817,0,21.225,4.119,21.225,20.68c0,5.521-1.417,9.64-3.593,12.688l-8.271-5.848L87.345,78.291z M124.239,91.967l-8.491-6.097c4.79-4.613,8.164-11.369,8.164-21.092c0-27.766-27.208-31.143-37.548-31.143 c-10.339,0-37.546,3.377-37.546,31.143c0,27.766,27.207,31.143,37.546,31.143c4.571,0,12.624-0.658,20.026-3.954l9.251,6.673 L124.239,91.967z',
		four: 'M54.775,131.222l13.243-15.479h0.147c0,1.116-0.222,6.75-0.222,15.479H54.775z M84.237,131.222h-5.879 v-22.533H66.531l-19.419,21.924v6.141h20.832v7.968h10.414v-7.968h5.879V131.222z',
		two: 'M89.7,121.216c0-11.723,12.573-12.737,17.26-12.737c10.117,0,18.152,4.06,18.152,11.366 c0,6.193-5.877,9.34-11.011,11.725c-6.993,3.349-10.64,4.975-11.828,6.647h22.914v6.295H89.106 c0.368-4.214,0.816-8.63,12.274-14.313c9.522-4.719,13.317-6.547,13.317-10.605c0-2.386-2.232-5.126-7.292-5.126 c-7.292,0-7.516,4.11-7.588,6.749H89.7z'
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
