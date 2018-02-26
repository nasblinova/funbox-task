var initPage = function initPage() {
	document.querySelector('.product') && selectedHover.init();
};

var DOMReady = function (a, b, c) {
	b = document, c = 'addEventListener';
	b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a)
}

DOMReady(initPage);