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