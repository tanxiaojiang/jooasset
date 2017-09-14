/** 
 处理全选或全部反选
**/
function selectAll(obj) {
    var status = jQuery(obj).attr("checked");
    alert(status);
    var id = jQuery(obj).attr("id");
    if (status == "checked") {
        jQuery("#ListForm").find(":checkbox[id!=" + id + "]").attr("checked", "checked");
    } else {
        jQuery("#ListForm").find(":checkbox[id!=" + id + "]").attr("checked", false);
    }
}
/* 
系统通用方法，根据参数来决定处理的url和参数
*/
function cmd() {
    var url = arguments[0];
    var mulitId = "";
    jQuery("#ListForm").find(".i-checks:checked").each(function() {
        if (jQuery(this).val() != "") {
            mulitId += jQuery(this).val() + ",";
        }
    });
    if (mulitId != "") {
        swal({
            title: "您确定要执行该操作？",
            text: "执行该操作不可恢复，是否继续？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        },
        function() {
            //swal("删除成功！", "您已经永久删除了这条信息。", "success");
            jQuery("#ListForm #mulitId").val(mulitId);
            jQuery("#ListForm").attr("action", url);
            jQuery("#ListForm").submit();
        });
    } else {
        swal("至少选择一条数据！");
    }
}
/**/
/* 火狐下取本地全路径 */
function getFullPath(obj) {
    if (obj) {
        //ie
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            if (window.navigator.userAgent.indexOf("MSIE") == 25) {
                obj.blur();
            }
            return document.selection.createRange().text;
        } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) { //firefox
            if (obj.files) {
                return window.URL.createObjectURL(obj.files.item(0));
            }
            return obj.value;
        }
        return obj.value;
    }
}
//自动生成查询条件
function query() {
    jQuery("#queryCondition").empty();
    jQuery.each(jQuery("#queryForm :input"),
    function() {
        if (this.type != "button" && this.value != "") {
            jQuery("#queryCondition").append("<input name='q_" + this.name + "'type='hidden' id='q_" + this.name + "' value='" + this.value + "' />");
        }
    });
    jQuery("#ListForm").submit();
}
//表单方式分页
function gotoPage(n) {
    jQuery("#currentPage").val(n);
    jQuery("#ListForm").submit();
}
/**增加系统提示*/
function tipStyle() {
    if (jQuery.isFunction(jQuery().poshytip)) {
        jQuery("input[title!='']").poshytip({
            className: 'tip-skyblue',
            timeOnScreen: 2000,
            alignTo: 'cursor',
            alignX: 'right',
            alignY: 'bottom',
            offsetX: 3,
            offsetY: 3
        });
        jQuery("img[title!='']").poshytip({
            className: 'tip-skyblue',
            timeOnScreen: 2000,
            alignTo: 'cursor',
            alignX: 'right',
            alignY: 'bottom',
            offsetX: 3,
            offsetY: 3
        });
        jQuery("a[title!='']").poshytip({
            className: 'tip-skyblue',
            timeOnScreen: 2000,
            alignTo: 'cursor',
            alignX: 'right',
            alignY: 'bottom',
            offsetX: 3,
            offsetY: 3
        });
        jQuery("textarea[title!='']").poshytip({
            className: 'tip-skyblue',
            timeOnScreen: 2000,
            alignTo: 'cursor',
            alignX: 'right',
            alignY: 'bottom',
            offsetX: 3,
            offsetY: 3
        });
    }
}
//模拟alert
var alert_timer_id;
function showDialog() {
    var id = arguments[0]; //窗口id
    var title = arguments[1]; //窗口标题
    var content = arguments[2]; //提示内容
    var type = arguments[3]; //0为倒计时提示框，1为确认框（包含2个按钮，点击确定执行回调）,2为提示确认框（只含有一个确认按钮）
    var icon = arguments[4]; //显示图标，包括warning,succeed,question,smile,sad,error
    var second = arguments[5]; //倒计时时间数,默认时间5秒，
    var confirm_action = arguments[6]; //callback方法
    var back_function_args = arguments[7]; //带参数回调函数发送的参数
    var callbacktext = arguments[8]; //确认按钮的文字
    var isblack_overlay = arguments[9]; //是否有背景0有，1没有。
    var position = arguments[10]; //弹框位置right，left，center。
    if (id == undefined || id == "") {
        id = 1;
    }
    if (title == undefined || title == "") {
        title = "系统提示";
    }
    if (type == undefined || type == "") {
        type == 0;
    }
    if (icon == undefined || icon == "") {
        icon = "succeed";
    }
    if (second == undefined || second == "") {
        second = 5;
    }
    if (callbacktext == undefined || callbacktext == "") {
        callbacktext = "确定";
    }
    if (isblack_overlay == undefined || isblack_overlay == "") {
        isblack_overlay = 0;
    }
    if (position == undefined || position == "") {
        position = 'center';
    }

    if (isblack_overlay == 1) {
        if (position == 'right') {
            var s = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div><div class='message_white_iframe'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box'><span class='message_white_img_" + icon + "'></span><span class='message_white_font'>" + content + "</span></div><h3 class='message_white_title_bottom'><span id='time_down'>" + second + "</span>秒后窗口关闭</h3></div></div></div>";

            var c = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box1'><input id='sure' type='button' value='" + callbacktext + "'/><input id='cancel' type='button' value='取消'/></div>    </div></div></div>";
            var t = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box2'><input id='ok' type='button' value='确定'/></div></div></div></div>";

        } else {
            var s = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div><div class='message_white_iframe'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box'><span class='message_white_img_" + icon + "'></span><span class='message_white_font'>" + content + "</span></div><h3 class='message_white_title_bottom'><span id='time_down'>" + second + "</span>秒后窗口关闭</h3></div></div></div>";

            var c = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box1'><input id='sure' type='button' value='" + callbacktext + "'/><input id='cancel' type='button' value='取消'/></div>    </div></div></div>";
            var t = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box2'><input id='ok' type='button' value='确定'/></div></div></div></div>";

        }

    } else {
        if (position == 'right') {
            var s = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div><div class='message_white_iframe'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box'><span class='message_white_img_" + icon + "'></span><span class='message_white_font'>" + content + "</span></div><h3 class='message_white_title_bottom'><span id='time_down'>" + second + "</span>秒后窗口关闭</h3></div></div></div><div class='black_overlay'></div>";

            var c = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box1'><input id='sure' type='button' value='" + callbacktext + "'/><input id='cancel' type='button' value='取消'/></div>    </div></div></div><div class='black_overlay'></div>";
            var t = "<div id='" + id + "'><div class='message_right_top_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box2'><input id='ok' type='button' value='确定'/></div></div></div></div><div class='black_overlay'></div>";

        } else {
            var s = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div><div class='message_white_iframe'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box'><span class='message_white_img_" + icon + "'></span><span class='message_white_font'>" + content + "</span></div><h3 class='message_white_title_bottom'><span id='time_down'>" + second + "</span>秒后窗口关闭</h3></div></div></div><div class='black_overlay'></div>";

            var c = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box1'><input id='sure' type='button' value='" + callbacktext + "'/><input id='cancel' type='button' value='取消'/></div>    </div></div></div><div class='black_overlay'></div>";
            var t = "<div id='" + id + "'><div class='message_white_content'> <a href='javascript:void(0);' class='white_close' onclick='javascript:jQuery(\"#" + id + "\").remove();'></a><div ><div class='message_white_iframe_del'><h3 class='message_white_title'><span>" + title + "</span></h3><div class='message_white_box_del'><span class='message_white_img_" + icon + "'></span><span class='message_white_font' style='font-size:14px;'>" + content + "</span></div>   <div class='message_white_box2'><input id='ok' type='button' value='确定'/></div></div></div></div><div class='black_overlay'></div>";

        }

    }
    if (type == 0) { //消息框
        jQuery("body").append(s);
    }
    if (type == 1) { //确认并回调框
        jQuery("body").append(c);
    }
    if (type == 2) { //确认框
        jQuery("body").append(t);
    }
    var top = jQuery(window).scrollTop() + (jQuery(window).height() - jQuery(document).outerHeight()) / 2;
    jQuery(".message_white_content").css("margin-top", jQuery(window).scrollTop() + "px");
    var h = jQuery(document).height();
    jQuery('.black_overlay').css("height", h);
    //设置关闭时间
    if (confirm_action == undefined || confirm_action == "") {
        alert_timer_id = window.setInterval("closewin('" + id + "','')", 1000);
    } else {
        if (back_function_args == undefined || back_function_args == "") {
            alert_timer_id = window.setInterval("closewin('" + id + "'," + confirm_action + ")", 1000);
        } else {
            alert_timer_id = window.setInterval("closewin('" + id + "'," + confirm_action + ",'" + back_function_args + "')", 1000);
        }
    }
    //点击确定执行回调
    jQuery("#sure").click(function() {
        jQuery("#" + id).remove();
        runcallback(confirm_action);
    });
    //点击确定关闭窗口
    jQuery("#ok").click(function() {
        jQuery("#" + id).remove();
        runcallback(confirm_action);
    });
    function runcallback(callback) {
        if (confirm_action != undefined && confirm_action != "") {
            if (back_function_args == undefined || back_function_args == "") {
                callback();
            } else {
                callback(back_function_args);
            }
        }
    }
    //点击取消
    jQuery("#cancel").click(function() {
        jQuery("#" + id).remove();
    });
    //点击选择发布类型，将参数添加到页面隐藏域中
    jQuery("a[id^=share_select_]").click(function() {
        jQuery("#share_select_mark").val(jQuery(this).attr("share_mark"));
        jQuery("#" + id).remove();
        runcallback(confirm_action);
    });
}

function closewin(id, callback, args) {
    var count = parseInt(jQuery("#" + id + " span[id=time_down]").text());
    count--;
    if (count == 0) {
        window.clearInterval(alert_timer_id);
        if (callback != "") {
            if (args == undefined || args == "") {
                callback();
            } else {
                callback(args);
            }
        } else { //没有回调，移除当前弹框
            jQuery("#" + id).remove();
        }
    } else {
        jQuery("#" + id + " span[id=time_down]").text(count);
    }
}
//打开系统聊天组件 
function open_im() {
    var goods_id = arguments[0];
    var url = arguments[1];
    var type = arguments[2]; //打开类型，user为用户打开，store为商家打开，plat为平台打开
    var to_type = arguments[3];
    var store_id = arguments[4];
    if (type == "store") {
        window.open(url + "/store_chatting.htm", 'store', 'height=660,width=1000,top=200,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
    }
    if (type == "user") {
        window.open(url + "/user_chatting.htm?gid=" + goods_id + "&type=" + to_type + "&store_id=" + store_id, '', 'height=660,width=1000,top=200,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
    }
    if (type == "plat") {
        window.open(url + "/admin/plat_chatting.htm", 'plat', 'height=660,width=1000,top=200,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
    }
}