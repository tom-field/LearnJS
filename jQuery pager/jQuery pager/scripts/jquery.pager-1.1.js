;(function($) {

    $.fn.pager = function(options) {
	
        var opts = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {
		
			// empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(parseInt(options.currentPage), parseInt(options.pageCount), options.choosePageCallBack));
			
            // specify correct cursor activity
            $('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
			
			if (opts.select) {
				
				var $goto = $("<span class=\"span-page-lable\">\u8F6C\u5230</span>");
					
				$(this).append($goto);
				
				if (opts.type == "select") {
				
					var $selPage = $("<select></select>");     
					
					$(this).append($selPage);
					
					for (var i = 1; i <= options.pageCount; i++) {
						$(this).find("select").append('<option value="' + i + '">\u7B2C' + i + '\u9875</option>');
					}
					
					$(this).find("select").find("option[value=" + options.currentPage + "]").attr("selected", "selected");
					
					$(this).change(function() {
						options.choosePageCallBack($(this).find("select").val());
					});							
					
				} else {
					
					var $textPage = $("<input class=\"text-pager\" value=\"" + options.currentPage + "\">");
				
					var $lablePage = $("<span class=\"span-page-lable\">\u9875</span>");
					
					var $spanError = $("<span class=\"span-pager-error\"></span>");
					
					$(this).append($textPage);
					
					$(this).append($lablePage);
					
					$(this).append($spanError);
					
					$(this).keydown(function(event){
						if (event.keyCode == 13) {
							var val = $(".text-pager").val();
							var exp = /^\+?[1-9][0-9]*$/;
							if (!exp.test(val)) {
								$(".span-pager-error").html("\u8BF7\u6B63\u786E\u8F93\u5165\u9875\u7801\uFF01");
								return;
							}
							if (val < 1 || val > options.pageCount) {
								$(".span-pager-error").html("\u8BF7\u6B63\u786E\u8F93\u5165\u9875\u7801\uFF0C\u6700\u5927\u9875\u6570\u4E3A" + options.pageCount);
								return;
							}
							options.choosePageCallBack(val);
						}
					});
					
				}
				
			}
			
        });
    };

    // render and return the pager with the supplied options
    function renderpager(currentPage, pageCount, choosePageCallBack) {

        // setup $pager to hold render
        var $pager = $('<ul class="pages"></ul>');

        // add in the previous and next buttons
        $pager.append(renderButton('\u9996\u9875', currentPage, pageCount, choosePageCallBack))

            .append(renderButton('\u672B\u9875', currentPage, pageCount, choosePageCallBack))

            .append(renderButton('\u4E0A\u4E00\u9875', currentPage, pageCount, choosePageCallBack));

        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases
        var startPoint = 1;
        var endPoint = 9;

        if (currentPage > 4) {
            startPoint = currentPage - 4;
            endPoint = currentPage + 4;
        }

        if (endPoint > pageCount) {
            startPoint = pageCount - 8;
            endPoint = pageCount;
        }

        if (startPoint < 1) {
            startPoint = 1;
        }
		
        // loop thru visible pages and render buttons
        for (var page = startPoint; page <= endPoint; page++) {

            var currentButton = $('<li class="page-number">' + (page) + '</li>');

            page == currentPage ? currentButton.addClass('pgCurrent') : currentButton.click(function() { choosePageCallBack(this.firstChild.data); });
            currentButton.appendTo($pager);
        }

        // render in the next and last buttons before returning the whole rendered control back.
        $pager.append(renderButton('\u4E0B\u4E00\u9875', currentPage, pageCount, choosePageCallBack)).append(renderButton('\u672B\u9875', currentPage, pageCount, choosePageCallBack));

        return $pager;
    }

    // renders and returns a 'specialized' button, ie 'next', 'previous' etc. rather than a page number button
    function renderButton(buttonLabel, currentPage, pageCount, choosePageCallBack) {

        var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');

        var destPage = 1;

        // work out destination page for required button type
        switch (buttonLabel) {
            case "\u9996\u9875":
                destPage = 1;
                break;
            case "\u4E0A\u4E00\u9875":
                destPage = currentPage - 1;
                break;
            case "\u4E0B\u4E00\u9875":
                destPage = currentPage + 1;
                break;
            case "\u672B\u9875":
                destPage = pageCount;
                break;
        }

        // disable and 'grey' out buttons if not needed.
        if (buttonLabel == "\u9996\u9875" || buttonLabel == "\u4E0A\u4E00\u9875") {
            currentPage <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function() { choosePageCallBack(destPage); });
        } else {
            currentPage >= pageCount ? $Button.addClass('pgEmpty') : $Button.click(function() { choosePageCallBack(destPage); });
        }

		return $Button;
    }

    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the next version
    $.fn.pager.defaults = {
        currentPage: 1,					// current page number
        pageCount: 1,					// page count
		select: true,					// Whether to display the page number. input or page number select
		type: "select"					// page number choose type. options: select or input
    };

})(jQuery);





