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

	var now = new Date();

	var endTS = now.getTime() + 300176000;
	var _months = {
		1: 'Января',
		2: 'Февраля',
		3: 'Марта',
		4: 'Апреля',
		5: 'Мая',
		6: 'Июня',
		7: 'Июля',
		8: 'Августа',
		9: 'Сентября',
		10: 'Октября',
		11: 'Ноября',
		12: 'Декабря'

		//$('.data-s').html( ' ' + (new Date(endTS).toISOString()).replace(/^([^T]+)T(.+)$/,'$1') .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1') )
	};var _date = new Date(endTS).toISOString().replace(/^([^T]+)T(.+)$/, '$1');

	var _day = parseInt(_date.replace(/^(\d+)-(\d+)-(\d+)$/, '$3'));
	var _month = parseInt(_date.replace(/^(\d+)-(\d+)-(\d+)$/, '$2'));
	$('.data-s').html(' ' + _day + ' ' + _months[_month]);

	if (_day >= 28) {
		if (_month == 12) {
			_month = 1;
		} else {
			_month = _month + 1;
		}
	}
	$('.data-m').html(_months[_month]);

	setInterval(function () {
		now = new Date();
		var totalRemains = endTS - now.getTime();
		if (totalRemains > 1) {
			var RemainsSec = parseInt(totalRemains / 1000);
			var RemainsFullDays = parseInt(RemainsSec / (24 * 60 * 60));
			var secInLastDay = RemainsSec - RemainsFullDays * 24 * 3600;
			var RemainsFullHours = parseInt(secInLastDay / 3600);
			if (RemainsFullHours < 10) {
				RemainsFullHours = "0" + RemainsFullHours;
			};
			var secInLastHour = secInLastDay - RemainsFullHours * 3600;
			var RemainsMinutes = parseInt(secInLastHour / 60);
			if (RemainsMinutes < 10) {
				RemainsMinutes = "0" + RemainsMinutes;
			};
			var lastSec = secInLastHour - RemainsMinutes * 60;
			if (lastSec < 10) {
				lastSec = "0" + lastSec;
			};
			if (RemainsFullDays < 10) {
				RemainsFullDays = "0" + RemainsFullDays;
			};
			var str = '<div class=\'timer__el\'><div class=\'timer__numeral\'>' + RemainsFullDays + '</div><div class=\'timer__text\'>\u0414\u043D\u0435\u0439</div></div>';
			str = str + ('<div class=\'timer__el\'><div class=\'timer__numeral\'>' + RemainsFullHours + '</div><div class=\'timer__text\'>\u0427\u0430\u0441\u043E\u0432</div></div>');
			str = str + ('<div class=\'timer__el\'><div class=\'timer__numeral\'>' + RemainsMinutes + '</div><div class=\'timer__text\'>\u041C\u0438\u043D\u0443\u0442\u044B</div></div>');
			str = str + ('<div class=\'timer__el\'><div class=\'timer__numeral\'>' + lastSec + '</div><div class=\'timer__text\'>\u0421\u0435\u043A\u0443\u043D\u0434\u044B</div></div>');
			$('.digits').html(str);

			//$('.digits').html("<span>"+RemainsFullDays+"<div>Дней</div></span> <span>"+RemainsFullHours+"<div>Часов</div></span> <span>"+RemainsMinutes+"<div>Минуты</div></span> <span class='red'>"+lastSec+"<div>Секунды</div></span>");
		} else {
			$("#timer").remove();
		}
	}, 1000);

	var yatarget = 'order';

	$('.callme').click(function (event) {
		yatarget = 'callme';
		$('#modal__callme').openModal();
	});

	$('.order').click(function (event) {
		yatarget = 'order';
		$('#modal__order').openModal();
	});

	$('.order-stock').click(function (event) {
		yatarget = 'order';
		$('#modal__stock').openModal();
	});

	$('.zoom').click(function (event) {
		var img = $(this).data('img');
		$('#zoom__img').attr('src', 'img/' + img);
		$('#modal__zoom').openModal();
	});

	// $('.triggers').waypoint(function() {
	// 	$('.triggers__items').addClass('animated flipInX finish-animate')
	// }, {offset: '90%'})

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

	// let $items = $('.tabs__item')
	// $items.each((index, el) => {
	// 	let $el = $(el)
	// 	$el.children('.tabs__title').click(function(event) {
	// 		$el.toggleClass('tabs__item_active')

	// 		let $progressBar = $el.children('.tabs__text').children('.progress-bar')
	// 		let interest = $progressBar.data('interest')


	// 		if ( $el.hasClass('tabs__item_active') ) {
	// 			$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text('')
	// 			$progressBar.children('.progress-bar__pace').width('0%')
	// 			$el.children('.tabs__text').slideDown(500)
	// 			setTimeout(() => {
	// 				$progressBar.children('.progress-bar__pace').width(interest + '%')
	// 				let n = 0
	// 				let timerId = setInterval(() => {
	// 					++n
	// 					$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text(n + '%')
	// 					// $progressBar.children('.progress-bar__pace').width(n + '%')
	// 				}, 1000 / interest)

	// 				setTimeout(() => {
	// 					clearInterval(timerId)
	// 				},1000)
	// 			}, 500)
	// 		} else {
	// 			$el.children('.tabs__text').slideUp(500)
	// 			setTimeout(() => {
	// 				$progressBar.children('.progress-bar__pace').width('0%')
	// 			}, 500)
	// 		}
	// 	});	
	// })


	$('#questions').click(function (event) {
		var text = '\n\u041E\u0446\u0435\u043D\u043A\u0430 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435: \n\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E \u043A \u0432\u043E\u0434\u043E\u0441\u043D\u0430\u0431\u0436\u0435\u043D\u0438\u044E/\u043A\u0430\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438? - ' + $('.radio__control[name="ok"]:checked').val() + ' \n\n\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0412\u0430\u0441 \u0432\u043E\u043F\u0440\u043E\u0441\u044B? - ' + $('.radio__control[name="ok1"]:checked').val() + ' \n\n\u0412\u044B \u0445\u043E\u0442\u0435\u043B\u0438 \u0431\u044B \u0434\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435 \u0411\u041A \u0418\u043D\u0432\u0435\u043D\u0442? - ' + $('.radio__control[name="ok2"]:checked').val() + ' \n\n\n\t\t';

		yatarget = 'order';
		$('#comment').val(text);
		$('#modal__order').openModal();
	});

	$('.ajax').each(function () {
		$(this).validate({
			unhighlight: function unhighlight(element, errorClass) {
				$(element).addClass('input_ok').removeClass('input_error');
			},
			submitHandler: function submitHandler(form, e) {
				e.preventDefault();

				$('.loader_submit').addClass('loader_active');

				var form = $(form),
				    str = form.serialize();

				var roistat = window.roistat.visit || null;
				str = str + '&roistat=' + roistat;

				var btn = form.children("[type='submit']");
				//let btnText = btn.val()
				//btn.val('Обработка...')
				btn.prop('disabled', true);

				var download = form.children("[name='download']").val();

				$.ajax({
					url: '//lp.bk-invent.ru/send.php',
					type: 'post',
					data: str
				}).done(function () {
					$('.modal').closeModal();

					if (download) {
						yatarget = 'doc';
						$('#modal__download').openModal();
					} else {
						$('#modal__ok').openModal();
					}
					yaCounter51499229.reachGoal(yatarget);
					yatarget = 'order';
					yaCounter53737453.reachGoal('site');
				}).always(function () {
					//btn.val(btnText)
					$('.loader_submit').removeClass('loader_active');
					btn.prop('disabled', false);
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

// $(document).ready(function(){
//   $('.slider__wrapped').bxSlider({
//   	pager: false,
//   	nextText: '',
//   	prevText: '',
//   	touchEnabled: false,
//   	auto: true,
//   	pause: 1400,
//   	stopAutoOnClick: true,
//   	autoHover: true
//   });
// });

$('.reviews2__items').bxSlider({
	// nextSelector: 'reviews__next',
	// prevSelector:'reviews__prev',
	touchEnabled: false,
	nextText: '',
	prevText: '',
	pager: false
});

$(window).on('load', function (e) {
	window.setTimeout(function () {
		$('.loader').removeClass('loader_active');
		$('.offer__text').addClass('animated bounceInLeft finish-animate');
		$('.offer__action').addClass('animated bounceInRight finish-animate');
	}, 100);
});