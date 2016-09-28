$(function () {

	$('#reg').validate({
		rules : {
			user : {
				required : true,
				minlength : 2,
			}, 
			email : {
				email : true,
			}, 
			url : {
				url : true,
			}, 
			date : {
				date : true,
			}, 
			dateISO : {
				dateISO : true,
			}, 
			number : {
				number : true,
			}, 
			digits : {
				digits : true,
			}, 
			creditcard : {
				creditcard : true,
			},
			notpass : {
				equalTo : '#pass',
			},
			min : {
				min : 5,
			},
			range : {
				range : [5, 10],
			},
			rangelength : {
				rangelength : [5, 10],
			}
		},
		messages : {
			user : {
				required : '帐号不得为空！',
				minlength : '帐号不得小于2位！',
			},
		}
	});

});


























