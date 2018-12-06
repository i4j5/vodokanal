'use strict';

(function ($) {
	$.fn.extend({
		openModal: function openModal() {
			$(this).addClass('modal_visible');
			$('body').addClass('modal-open');

			$(this).on('click', function (event) {
				if ($(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper')) {
					event.preventDefault();
					$(this).closeModal();
				}
			});
		}
	});

	$.fn.extend({
		closeModal: function closeModal() {
			$(this).removeClass('modal_visible');
			$('body').removeClass('modal-open');
		}
	});
})(jQuery);

$(document).ready(function () {

	$('.callme').click(function (event) {
		$('#modal__callme').openModal();
	});

	$('.order').click(function (event) {
		$('#modal__order').openModal();
	});

	$('.zoom').click(function (event) {
		var img = $(this).data('img');
		$('#zoom__img').attr('src', 'img/' + img);
		$('#modal__zoom').openModal();
	});

	$('.triggers').waypoint(function () {
		$('.triggers__items').addClass('animated flipInX finish-animate');
	}, { offset: '90%' });

	$('#doc').waypoint(function () {
		$('#doc .l').addClass('animated fadeInLeft finish-animate');
		$('#doc .r').addClass('animated fadeInRight finish-animate');
	}, { offset: '90%' });

	$('#scheme').waypoint(function () {
		$('.scheme__item_step_1, .scheme__item_step_3, .scheme__item_step_5').addClass('animated zoomInLeft finish-animate');
		$('.scheme__item_step_2, .scheme__item_step_4, .scheme__item_step_6').addClass('animated zoomInRight finish-animate');
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

	$('.ajax').each(function () {
		$(this).validate({
			unhighlight: function unhighlight(element, errorClass) {
				$(element).addClass('input_ok').removeClass('input_error');
			},
			submitHandler: function submitHandler(form, e) {
				e.preventDefault();

				var form = $(form),
				    str = form.serialize();

				var download = form.children("[name='download']").val();

				$.ajax({
					url: './',
					type: 'get',
					data: str
				}).done(function () {
					$('.modal').closeModal();

					if (download) {
						$('#modal__download').openModal();
					} else {
						$('#modal__ok').openModal();
					}
				}).always(function () {
					// После завершения
				});
			},
			rules: {
				'phone': {
					required: true
				},
				'name': {
					required: true
				}
			},
			errorPlacement: function errorPlacement(error, element) {
				$(element).addClass('input_error').removeClass('input_ok');
			}
		}); //validate
	}); //ajax


	ymaps.ready(init);
	var map;

	function init() {
		map = new ymaps.Map("map", {
			center: [47.229409, 39.678002],
			zoom: 17,
			controls: ['zoomControl']
		});

		map.behaviors.disable(['scrollZoom']);

		var placemark = new ymaps.Placemark([47.229409, 39.678002], {
			hintContent: 'БК Инвент ул. Текучева, 23, эт. 3'
			//balloonContent: 'html'
		}, {
			iconLayout: 'default#image',
			iconImageHref: './img/maps.png',
			iconImageSize: [90, 108],
			iconImageOffset: [-38, -110]
		});

		map.geoObjects.add(placemark);
	}
});

$(document).ready(function () {
	$('.slider').bxSlider({
		pager: true,
		nextText: '',
		prevText: '',
		// touchEnabled: false,
		auto: true,
		pause: 2000,
		stopAutoOnClick: true,
		autoHover: true
	});
});

$(window).on('load', function (e) {
	window.setTimeout(function () {
		$('.loader').removeClass('loader_active');
	}, 100);
});