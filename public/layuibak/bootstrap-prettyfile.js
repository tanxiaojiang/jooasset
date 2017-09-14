(function($) {
  
    // 在我们插件容器内，创造一个公共变量来构建一个私有方法
    var make_form = function( $el, text, multiple ) {
		
		var files = $el[0].files,
		info = '';
		
		if ( !multiple || files.length == 1 ) {
			var path = $el.val().split('\\');
			info = path[path.length - 1];
		} else if ( files.length > 1 ) {
			// Display number of selected files instead of filenames
			info = "已选择了" + files.length + ' 个文件';
		}
	
        // code here
		$el.wrap('<div></div>');
		
		$el.hide();
		$el.after( '\
		<div class="input-append input-group"">\
			<span class="input-group-btn">\
				<button class="btn btn-white" type="button">' + text + '</button>\
			</span>\
			<input class="input-large form-control" type="text" value="' + info + '"/>\
		</div>\
		' );
		
		return $el.parent();
    };
  	
	var get_form = function( $el ) {
	    // code here
		$el.next().remove();
		$el.unwrap();
		$el.show();
		return $el;
	};
	
	var bind_change = function( $wrap, multiple ) {
	    // code here
		$wrap.find( 'input[type="file"]' ).change(function () {
			// When original file input changes, get its value, show it in the fake input
			var files = $( this )[0].files,
			info = '';
	
			if ( files.length == 0 )
				return false;
	
			if ( !multiple || files.length == 1 ) {
				var path = $( this ).val().split('\\');
				info = path[path.length - 1];
			} else if ( files.length > 1 ) {
				// Display number of selected files instead of filenames
				info = "已选择了" + files.length + ' 个文件';
			}
	
			$wrap.find('.input-append input').val( info );
		});
	};
	
	var bind_button = function( $wrap, multiple ) {
	    // code here
		$wrap.find( '.input-append' ).click( function( e ) {
			e.preventDefault();
			$wrap.find( 'input[type="file"]' ).click();
		});
	};
	
	var unbind_all = function( $el ) {
	    // code here
		$el.next().unbind();
		$el.unbind();
	};
		
	var defaults = {
		text : "选择文件"
	};
	
    // 通过字面量创造一个对象，存储我们需要的共有方法
    var methods = {
        // 在字面量对象中定义每个单独的方法
        init: function() {
  			var options =  $.extend(defaults, options);
			var plugin = this;
            // 为了更好的灵活性，对来自主函数，并进入每个方法中的选择器其中的每个单独的元素都执行代码
            return this.each(function() {
                // 为每个独立的元素创建一个jQuery对象
                var $this = $(this);
  
                // 执行代码
                // 例如： privateFunction();
				if ( $this ) {
					var multiple = $this.attr( 'multiple' );
				
					$wrap = make_form( $this, options.text, multiple );
					bind_change( $wrap, multiple );
					bind_button( $wrap );
				}
            });
        },
        destroy: function() {
            // 对选择器每个元素都执行方法
            return this.each(function() {
                // 执行代码
				var $this = $(this);
				unbind_all($this);
				$wrap = get_form($this);
            });
        }
    };
  
    $.fn.prettyFile = function() {
        // 获取我们的方法，遗憾的是，如果我们用function(method){}来实现，这样会毁掉一切的
        var method = arguments[0];
  
        // 检验方法是否存在
        if(methods[method]) {
  
            // 如果方法存在，存储起来以便使用
            // 注意：我这样做是为了等下更方便地使用each（）
            method = methods[method];
  
        // 如果方法不存在，检验对象是否为一个对象（JSON对象）或者method方法没有被传入
        } else if( typeof(method) == 'object' || !method ) {
  
            // 如果我们传入的是一个对象参数，或者根本没有参数，init方法会被调用
            method = methods.init;
        } else {
  
            // 如果方法不存在或者参数没传入，则报出错误。需要调用的方法没有被正确调用
            $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
            return this;
        }
  
        // 调用我们选中的方法
        // 再一次注意我们是如何将each（）从这里转移到每个单独的方法上的
        return method.call(this);
  
    }
  
})(jQuery);