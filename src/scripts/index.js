const cssLoader = function (src) {
	const stylesheet = document.createElement('link');
  stylesheet.href = src;
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(stylesheet);
};

document.addEventListener('DOMContentLoaded', () => {
	cssLoader('/assets/stylesheets/style.css');
});