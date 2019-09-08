/**
 * Created by xuhui on 2016/12/15.
 * 自定义的一些验证写在这里
 */
// 字符验证

jQuery.validator.addMethod("stringCheck",
    function(value, element) {return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);},
    "只能包括中文字、英文字母、数字和下划线");

// 身份证号码验证

jQuery.validator.addMethod("isIdCardNo",
    function(value, element) {return this.optional(element) || /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value);},
    "请正确输入您的身份证号码");

//验证邮政编码

jQuery.validator.addMethod( "checkPost",function(value,element){

    var pattern =/^[0-9]{6}$/;

    if(value !=''){if(!pattern.exec(value)){return false;}};

    return true;

} ,  "请输入有效的邮政编码");

//添加转换小写功能
jQuery.validator.addMethod("toLowerCase", function(value, element) {
    value = $.trim(String(value));//去空
    if(value==""){element.value = ""; return this.optional(element)|| true;}
    if(value.toLowerCase()!=value) element.value = value.toLowerCase();
    return this.optional(element)|| true;
}, "");

// 联系电话(手机/电话皆可)验证

jQuery.validator.addMethod("isPhone", function(value,element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
    var tel = /^\d{3,4}-?\d{7,9}$/;
    return this.optional(element) || (tel.test(value) || mobile.test(value));
}, "请正确填写您的联系电话");

//验证手机

jQuery.validator.addMethod( "checkMobile",function(value,element){

    var reg0 = /^13\d{5,9}$/;

    var reg1 = /^15\d{5,9}$/;

    var reg2 = /^189\d{4,8}$/;

    var reg3 = /^0\d{10,11}$/;

    var my = false;

    if (reg0.test(value))my=true;

    if (reg1.test(value))my=true;

    if (reg2.test(value))my=true;

    if (reg3.test(value))my=true;

    if(value!=''){if(!my){return false;}};

    return true;

} ,  " 请输入有效的手机号码");

//验证固定电话

jQuery.validator.addMethod( "checkTel",function(value,element){

    var pattern =/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

    if(value!=''){if(!pattern.exec(value)){return false;}};

    return true;

} ,  "请输入有效的固定电话");

//验证密码 6-18位由字符数字和特殊符号组成 排除空格..

jQuery.validator.addMethod("checkPassword",function(value, element) {
    var myreg = /^[^\s]{6,18}$/;
    if (value != '') {if (!myreg.test(value)) {return false;}};
    return true;}, "请输入有效密码!");

//验证邮箱

jQuery.validator.addMethod( "checkEmail",function(value,element){

    var myreg = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;

    if(value !=''){if(!myreg.test(value)){return false;}};

    return true;

} ,  " 请输入有效的E_mail");

//验证名称是否重复

jQuery.validator.addMethod( "checkName",function(value,element){

    var returnMsg=true;

    jQuery.ajax({type:"get",url:"url",

        async:false,cache:false,data:{ toinName:value,method:"get"},dataType:"html",scriptCharset:"UTF-8",success:function(msg){

            if(msg=="1"){

                returnMsg=false;

            }

        }});

    return returnMsg;

} ,  "此名称已经被占用！请您更换其它名称");