'use strict';

$(document).ready(function () {

	$('.triggers').waypoint(function () {
		$('.triggers__items').addClass('animated flipInX finish-animate');
	}, { offset: '90%' });

	$('#doc').waypoint(function () {
		$('#doc .l').addClass('animated fadeInLeft finish-animate');
		$('#doc .r').addClass('animated fadeInRight finish-animate');
	}, { offset: '90%' });

	$('.scheme').waypoint(function () {
		$('.scheme__item_step_1, .scheme__item_step_3, .scheme__item_step_5').addClass('animated zoomInLeft');
		$('.scheme__item_step_2, .scheme__item_step_4, .scheme__item_step_6').addClass('animated zoomInRight');
	}, { offset: '90%' });

	$('.logos').waypoint(function () {
		$('.logos img').addClass('animated zoomIn');
	}, { offset: '90%' });

	var $items = $('.tabs__item');

	$items.each(function (index, el) {
		var $el = $(el);
		$el.children('.tabs__title').click(function (event) {
			$el.toggleClass('tabs__item_active');

			var $progressBar = $el.children('.tabs__text').children('.progress-bar');
			var interest = $progressBar.data('interest');

			if ($el.hasClass('tabs__item_active')) {
				$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text('');
				$progressBar.children('.progress-bar__pace').width('0%');
				$el.children('.tabs__text').slideDown(500);
				setTimeout(function () {
					$progressBar.children('.progress-bar__pace').width(interest + '%');
					var n = 0;
					var timerId = setInterval(function () {
						++n;
						$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text(n + '%');
						// $progressBar.children('.progress-bar__pace').width(n + '%')
					}, 1000 / interest);

					setTimeout(function () {
						clearInterval(timerId);
					}, 1000);
				}, 500);
			} else {
				$el.children('.tabs__text').slideUp(500);
				setTimeout(function () {
					$progressBar.children('.progress-bar__pace').width('0%');
				}, 500);
			}
		});
	});
});

$(document).ready(function () {
	$('.slider').bxSlider({
		pager: true,
		nextText: '',
		prevText: ''
	});
});

$(window).on('load', function (e) {
	window.setTimeout(function () {
		$('.loader').removeClass('loader_active');
	}, 100);
});