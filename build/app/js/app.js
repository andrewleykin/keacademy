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
		$('html, body').stop().animate({
			scrollTop: $( selector ).offset().top + offset
		}, 400);
	}

	if ($('.js-scroll-to').length) {
		$('.js-scroll-to').on("click", function(){ 
			const href =  $(this).data('href')
			const num = isMobile ? 0 : 70
			const offset = href === '#video' ? -isMobile : isMobile
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
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();
// функция валидации формы
(function(){

	if ($('[data-validation]').length) {
		initializeValidate();
	}
	if($('.form')) {
		clearForm();
	}

	function clearForm(){
		var inputs = $('.form').find('input, textarea'),
			newVal = '';

		for(i=0;i<inputs.length;i++) {
			inputs.eq(i).val(newVal);
		}
	}

	/* Validate Form */
	function initializeValidate() {
		$('[data-validation]').each(function () {
		    var validator = $(this),
		        inputs = validator.find('input:not(:checkbox, [type=hidden]), textarea'),
						submit = validator.find('button[type=submit]'),
						isSubmited = false,
						stopSubmitIndex = 0;
			
		    inputs.each(function() {
		    	$(this).focus(function() {
		    		$(this).parent().removeClass('invalid')
		    	});
				});
				
		    validator.on('change keyup', 'input[data-name]', function () {
						var elm = $(this);
						if (elm.val().trim() === '₽' || elm.val().trim() === '@') elm.val('')
		        if (isSubmited) checkValidity(elm);
				});

		    submit.on('click', function (e) {
					isSubmited = true

					inputs.each((index, item) => {
						if ($(item).data('name')) checkValidity(item)
						if ($(item).parent().hasClass('invalid')) stopSubmitIndex++;
					})

					if (stopSubmitIndex > 0) {
						e.preventDefault();
					}
		    });
		});
	}

	function checkSelect(item) {
		var self = $(item),
			placeholder = self.data('placeholder'),
			active = self.find('.select-field__active');
		
		if (placeholder === active.text()) {
			self.parent().removeClass('valid').addClass('invalid')
		}
	}

	function checkValidity(elm) {
	    var elm = $(elm),
	        val = elm.val(),
	        block = elm.parent(),
	        name_reg = /^[A-Za-zА-Яа-яЁё\-\s]+$/,
					text_reg = /^[(A-Za-zА-Яа-яёЁ|@)\s\d]/,
	        mail_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	        phone_reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/,
	        num_reg = /^\d+$/;


	    if (elm.prop('disabled')) {
	        return;
	    } else if (elm.is('[data-name="name"]')) {
	        if (name_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="email"]')) {
	        if (mail_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="phone"]')) {
	        if (phone_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="num"]')) {
	        if (num_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="text"]')) {
	        if (text_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } 
	}
})();