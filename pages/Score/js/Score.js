

//----------Бургер-------------------------------------
const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
	const menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

//-------------Выподающие меню---------------------------------------

let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};

let body = document.querySelector('body');
if (isMobile.any()) {
	body.classList.add('touch');
	let arrow = document.querySelectorAll('.arrow')
	for (i = 0; i < arrow.length; i++) {
		let thisLink = arrow[i].previousElementSibling
		let subMenu = arrow[i].nextElementSibling;
		let thisArrow = arrow[i];
		thisLink.classList.add('parent');
		arrow[i].addEventListener('click', function () {
			subMenu.classList.toggle('open');
			thisArrow.classList.toggle('active');
		})
	}
} else {
	body.classList.add('mouse');
}

//-------------Кнопка на вверх------------------------------

let goTopBtn = document.querySelector('.back_to_top');


(function () {

	function trackScroll() {
		let scrolled = window.pageYOffset;
		let coords = document.documentElement.clientHeight;

		if (scrolled > coords) {
			goTopBtn.classList.add('back_to_top-show');
		}
		if (scrolled < coords) {
			goTopBtn.classList.remove('back_to_top-show');
		}
	}

	function backToTop() {
		if (window.pageYOffset > 0) {
			window.scrollBy(0, -80);
			setTimeout(backToTop, 0);
		}
	}

	let goTopBtn = document.querySelector('.back_to_top');

	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);
})();


//-------------Погода----------------------------------------


const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
	weatherBlock.innerHTML = `
	<div class="weather__loading">
		<img src="images/GuFC6.gif" alt="Loading..."
	</div>
	`
	"use strict"
	const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Gomel&appid=21523fc40f592ac8aaa03c8ce960b04a';
	const response = await fetch(server, {
		method: 'GET',
	});
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult);
	} else {
		weatherBlock.innerHTML = responseResult.message;
	}
}


function getWeather(data) {

	const location = data.name;
	const temp = Math.round(data.main.temp);
	const feelsLike = Math.round(data.main.feels_like);
	const weatherStatus = data.weather[0].main;

	const template = `									
	<div class="weather__header">
		<div class="weather__main">
			<div class="weather__city">${location}</div>
			<div class="weather__status">${weatherStatus}</div>
		</div>
	</div>
	<div class="weather__temp">${temp}</div>
	<div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

	weatherBlock.innerHTML = template;

}


if (weatherBlock) {
	loadWeather();
}


//-------------Регистрация-------------------------


function show(state) {
	document.getElementById('window').style.display = state
	document.getElementById('opacity').style.display = state
}