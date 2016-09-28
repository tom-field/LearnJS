$(function () {

	//所有默认行为都可以在这里设置
	//$.validator.setDefaults({
	//	debug : true,
	//});


	$('#reg').validate({
		//debug : true,
		
		submitHandler : function (form) {
			//alert(form);
			//当验证成功后执行，而且阻止了默认提交
			//一般用于ajax提交使用
			//$('.myerror').hide();
			alert('验证成功，准备提交！');
		},
		
		//ignore : '#pass',
		
		//groups : {
		//	myerror : 'user pass',
		//},
		/*
		focusInvalid : false,
		errorPlacement : function (error, element) {
			//alert(element[0]);
			//alert(error);
			$.each(error, function (index, value) {
				//alert(index + ' ' + $(value).html());
				$('.myerror').html($('.myerror').html() + $(value).html());
			});
		},
		
		
		groups : {
			error_user : 'user',
			error_pass : 'pass',
		},
		
		
		errorPlacement : function (error, element) {
			error.appendTo('.myerror');
		},
		
		errorClass : 'abc',
		errorElement : 'p',
		
		
		errorLabelContainer : 'ol.myerror',
		wrapper : 'li',
		*/
		
		success : 'abc',
		//success : function (label) {
		//	label.addClass('abc').text('ok');
		//},
		/*
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid red');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '0px solid red');
		},
		*/
		/*
		invalidHandler : function (event, validator) {
			var error = validator.numberOfInvalids();
			
			if (error) {
				$('.myerror').html('您有' + error + '条错误信息！');
			}
		},
		*/
		
		showErrors : function (errorMap, errorList) {
			//$.each(errorMap, function (index,value) {
				//alert(index + ' ' + value);
			//});
			//alert(errorMap.user);
			//alert(errorList[0].element);
			//alert(errorList[0].message);
			
			var error = this.numberOfInvalids();
			
			if (error) {
				$('.myerror').html('您有' + error + '条错误信息！');
			} else {
				$('.myerror').hide();
			}
			
			this.defaultShowErrors();
		},
	
	
	
		rules : {
			user : {
				required : true,
				minlength : 2,
				//rangelength : [5,10]
			}, 
			pass : {
				required : true,
				minlength : 6,
			}
		},
		messages : {
			user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
				//rangelength : jQuery.format('帐号必须在{0}-{1}之间！'),
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
			},
		}
	});

});


























