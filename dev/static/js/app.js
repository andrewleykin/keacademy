// Начальная функция

(function(){

	const isMobile = window.innerWidth <= 768

	if (isMobile) {
		$('.hero__actions-btn span').eq(0).text('Программа курса')
		$('.hero__actions-btn span').eq(1).text('Подробнее')

		const toggleMenu = () => {
			$('.header__burger').toggleClass('active')
			$('.header__menu').toggleClass('active')
		}

		$('.header__burger').click(toggleMenu)
		$('.header__menu .menu__item').click(toggleMenu)

		$(document).click(function(e) {
			var el = '.header';
			if ($(e.target).closest(el).length) return;
			if ($('.header__menu').hasClass('active')) {
				toggleMenu()
			}
		})
	}

	if ($('.hero__slider-slider').length) {
		const slider = $('.hero__slider-slider')
		const arrows = $('.hero__slider-arrow')
		const disabledClass = 'disabled'

		slider.slick({
			infinite: false,
			arrows: false,
			dots: true,
			adaptiveHeight: true,
			customPaging: function(_, i) {
				return `<button type="button"></button>`
			}
		})

		slider.on('afterChange', function(event, { slideCount }, currentSlide){
			arrows.removeClass(disabledClass)
			if (currentSlide === slideCount - 1) {
				arrows.filter('.next').addClass(disabledClass)
			} else if (currentSlide === 0) {
				arrows.filter('.prev').addClass(disabledClass)
			}
		});

		arrows.click(function() {
			if ($(this).hasClass(disabledClass)) return false
			slider.slick($(this).hasClass('prev') ? 'slickPrev' : 'slickNext')
		})
	}

	if ($('.faq__list').length) {
		const items = $('.faq__item')

		items.click(function() {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open')
				$(this).find('.faq__content').slideUp()
			} else {
				$(this).addClass('open').siblings().removeClass('open').find('.faq__content').slideUp()
				$(this).find('.faq__content').slideDown()
			}
		})

		items.each((_, item) => {
			if ($(item).hasClass('open')) {
				$(item).addClass('open')
				$(item).find('.faq__content').slideDown()
			}
		})
	}

	if ($('.payment__form-select').length) {
		const selects = $('.payment__form-select')

		selects.each((index, item) => {
			const select = $(item)
			const placeholder = select.data('placeholder')
			const active = select.find('.payment__form-select-active')
			const items = select.find('.payment__form-select-item')
	
			active.click(function() {
				select.toggleClass('open')
			})
	
			items.click(function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active')
					active.text(placeholder)
					select.removeClass('active')
				} else {
					$(this).addClass('active').siblings().removeClass('active')
					active.text($(this).text())
					select.addClass('active')
				}
				select.removeClass('open')
			})
		})

		$(document).click(function (e) {
			var el = '.payment__form-select';
			if ($(e.target).closest(el).length) return;
			$(el).removeClass('open')
		});
	}

	if ($('[data-phone]').length) {
		$('[data-phone]').mask('+7 (000) 000 00 00')
	}

	if ($('.program').length) {
		const slider = $('.program__slider-slider')
		const lectures = $('.program__lectures')
		const slides = $('.program__slide')

		slides.each((index, item) => {
			$(item).find('.program__slide-count').text(`${index+1}/${slides.length}`)
		})

		const changeTabs = (tabs, contents, index) => {
			$(tabs).eq(index).addClass('active').siblings().removeClass('active')
			$(contents).eq(index).addClass('active').siblings().removeClass('active')
		}

		if (isMobile) {
			$('.program__slider-mobile-count').text(`1/${slides.length}`)
		}

		slider.slick({
			arrows: false,
			asNavFor: lectures,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						variableWidth: true
					}
				}
			]
		})

		lectures.slick({
			draggable: false,
			arrows: false,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			asNavFor: slider,
		})

		lectures.on('beforeChange', function(event, slick, _, nextSlide){
			const currentBlock = slick.$slides.eq(nextSlide)
			const tabs = currentBlock.find('.program__lectures-tabs li')
			const contents = currentBlock.find('.program__lectures-content')
			const index = 0

			changeTabs(tabs, contents, index)
			if (isMobile) {
				$('.program__slider-mobile-count').text(`${nextSlide+1}/${slides.length}`)
			}
		});

		$('.program__slider-arrow').click(function() {
			slider.slick($(this).hasClass('prev') ? 'slickPrev' : 'slickNext')
		})

		$('.program__lectures-tabs li').click(function() {
			const tabs = $(this).closest('.program__lectures-tabs').find('li')
			const contents = $(this).closest('.program__lectures-wrap').find('.program__lectures-content')
			const index = $(this).index()
			
			changeTabs(tabs, contents, index)
		})
	}

	const scrollBody = (selector, offset = 70) => {
		if ($(selector).length) {
			$('html, body').stop().animate({
				scrollTop: $( selector ).offset().top + offset
			}, 400);
		}

		window.location = $(selector).length ? `${window.location.pathname}${selector}` : `/${selector}`
	}

	if ($('.js-scroll-to').length) {
		$('.js-scroll-to').on("click", function(){ 
			const href =  $(this).data('href')
			const num = isMobile ? 0 : 70
			const offset = href === '#program' && !isMobile 
				? 110 
				: href === '#video' 
					? -num 
					: num

			scrollBody(href, offset)
			return false;
		});
	}

	if ($('.js-payment-scroll').length) {
		$('.js-payment-scroll').click(function() {
			const date = $(this).data('date')
			const select = $('.payment__form .payment__form-select')

			if (!select.hasClass('active')) {
				select.addClass('active')
			}
			select.find('.payment__form-select-active').text(date)
			select.find('.payment__form-select-item').each((_, item) => {
				if ($(item).text().trim() === date.trim()) {
					$(item).addClass('active').siblings().removeClass('active')
				}
			})

			scrollBody('#payment')
		})
	}

	if ($('.video__wrap').length) {
		const wrap = $('.video__wrap')
		const video = wrap.find('video')
		const src = video.attr('src')

		video.get(0).currentSrc = ''
		$('.video__wrap').click(function() {
			if (wrap.hasClass('active')) {
				wrap.removeClass('active')
				video.get(0).pause()
				video.get(0).currentSrc = ''
			} else {
				wrap.addClass('active')
				video.currentSrc = src
				video.get(0).play()
			}
		})
	}

	function getQueryStringValue (key) {  
		return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
	}  

	if ($('.payment-page').length) {
		$('.payment-page__btn').click((e) => {
			$(e.target).addClass('active').siblings().removeClass('active')
			$('.payment-page__tab').eq($(e.target).index()).addClass('active').siblings().removeClass('active')
		})

		$(document).ready(function() {
			if (getQueryStringValue("email").length) {
				$('input[data-email]').val(getQueryStringValue("email"))
			}
			if (getQueryStringValue("phone").length) {
				$('input[data-phone]').val(getQueryStringValue("phone"))
			}
			if (getQueryStringValue("data").length) {
				const date = getQueryStringValue("data")
				const select = $('.payment__form-select')

				if (!select.hasClass('active')) {
					select.addClass('active')
				}
				select.find('.payment__form-select-active').text(date)
				select.find('.payment__form-select-item').each((_, item) => {
					if ($(item).text().trim() === date.trim()) {
						$(item).addClass('active').siblings().removeClass('active')
					}
				})
			}
		})

	}

	if ($('.payment__timer').length) {
		const deadline = $('.payment__timer').data('deadline')
		initializeClock("countdown", deadline);
		
		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			};
		}
		
		function initializeClock(id, endtime) {
			var clock = document.getElementById(id);
			var daysSpan = clock.querySelector(".days");
			var hoursSpan = clock.querySelector(".hours");
			var minutesSpan = clock.querySelector(".minutes");
			var secondsSpan = clock.querySelector(".seconds");
		
			function updateClock() {
				var t = getTimeRemaining(endtime);
		
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
		
				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
				minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
				secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
			}
		
			updateClock();
			var timeinterval = setInterval(updateClock, 1000);
		}
	}
})();