const selectedHover = (() => {
	const me = {};
	me.mouseinside = false;
	me.mouseenter = e => {
		let card = e.currentTarget;
		let input = [...e.target.parentNode.parentNode.getElementsByClassName("product__checkbox")];
		me.mouseinside = true;
		if (!input[0].checked) {
			if (card.classList.contains('selected')) {
				card.classList.remove('selected');
			}
		}
	};
	me.mouseleave = e => {
		let card = e.currentTarget;
		let input = [...e.target.parentNode.parentNode.getElementsByClassName("product__checkbox")];
		me.mouseinside = false;
		if (input[0].checked) {
			if (!card.classList.contains('selected')) {
				card.classList.add('selected');
			}
		}
	};
	me.changeInput = e => {
		console.log(e);
		let input = e.currentTarget;
		let card = [...e.target.parentNode.getElementsByClassName("product__card")];
		console.log('me.mouseinside', me.mouseinside);
		if (input.checked && !me.mouseinside) {
			if (!card[0].classList.contains('selected')) {
				card[0].classList.add('selected');
			}
		} else {
			if (card[0].classList.contains('selected')) {
				card[0].classList.remove('selected');
			}
		}
	};
	me.init = () => {
		const products = document.querySelectorAll('.product__card');
		const inputs = document.querySelectorAll('.product__checkbox');
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener('change', me.changeInput);
		}
		for (let i = 0; i < products.length; i++) {
			products[i].addEventListener('mouseenter', me.mouseenter);
			products[i].addEventListener('mouseleave', me.mouseleave);
		}
	};

	return me;
})();
var initPage = function initPage() {
	document.querySelector('.product') && selectedHover.init();
};

var DOMReady = function (a, b, c) {
	b = document, c = 'addEventListener';
	b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a)
}

DOMReady(initPage);