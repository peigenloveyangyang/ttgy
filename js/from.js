;(function($){
    $.fn.extend({
        "checkForm":function(options){
            var root=this; //当前应用对象存入root
            var isok=false; //控制表单提交的开关
            var pwd; //密码存储

            var defaults={
                // 提示信息
                tip_success:'成功', //验证成功提示
                tip_required:'不能为空',
                tip_email:'邮箱格式有误',
                tip_user:"必须是中文",
                tip_phone:'手机号码格式不正确',
                tips_pwdequal: '两次密码不一致',
                // 正则验证
                reg_email:/^\w+\@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/i,
                reg_chinese:/^[\u4E00-\u9FA5]+$/,
                reg_phone:/^1[3458]{1}[0-9]{9}$/
            }

            if(options){        //如果不为空就合并参数
                $.extend(defaults,options)
            }

            // 文本框失去焦点时验证
            // console.log($(":text,:password",root))
            // $(":text,:password",root).each(function(){
            //     $(this).blur(function(){
            //         var _validate=$(this).attr("check");
            //         if(_validate){
            //             var arr=_validate.split(" ");
            //             for(var i=0;i<arr.length;i++){
            //                 check($(this),arr[i],$(this).val())
            //             }
            //         }
            //     })
            // })

            //表单提交时验证
            function _onSubmit(){
                isok=true;
                $(".inputs").each(function(index){
                    var _validate=$(this).attr("check");
                    if(_validate){
                        var arr=_validate.split(" ");
                        console.log(arr);
                        for(var i=0;i<arr.length;i++){
                            check($(this),arr[i],$(this).val());
                            isok=false;
                        }
                    }
                })
            }
            if(root.is("form")){
                _onSubmit();
                return isok;
            }
            // 验证方法
            const check=function(obj,_match,_val){
                switch(_match){
                    case 'required':
                        return _val?showMsg(obj,defaults.tip_success,true):showMsg(obj,defaults.tip_required,false);
                        break;
                    // case 'email':
                    //     return chk(_val,defaults.reg_email)?showMsg(obj,defaults.tip_success,true):showMsg(obj,defaults.tip_email,false);
                    //     break;
                    // case 'chinese':
                    //     return chk(_val,defaults.reg_chinese)?showMsg(obj,defaults.tip_success,true):showMsg(obj,defaults.tip_user,false);
                    //     break;
                    case 'pw1':
                        return pwd=_val;  //实时储存
                        break;
                    case 'pw2':
                        return pwdEqual(_val,pwd)?showMsg(obj,defaults.tip_success,true):showMsg(obj,defaults.tips_pwdequal,false);
                        break;
                    case 'phone':
                        return chk(_val,defaults.reg_phone)?showMsg(obj,defaults.tip_success,true):showMsg(obj,defaults.tip_phone,false);
                        break;
                }
            }
            //判断两次密码是否一致
            var pwdEqual=function(val1,val2){
                return val1==val2?true:false;
            }
            //正则验证
            var chk=function(str,reg){
                return reg.test(str);
            }
            //显示信息
            var showMsg=function(obj,msg,mark){
                $(obj).next(".errormsg").remove();
                $(obj).css({
                    borderColor:"#ccc"
                })
                var html_true="<span class='errormsg true' ></span>"
                var html_false="<span class='errormsg false' ></span>"
                if(mark){
                    $(obj).after(html_true);
                }else{
                    $(obj).after(html_false);
                    $(obj).css({
                        borderColor:"red"
                    })
                }
                console.log(msg)
                return mark;
            }

        }
    })
})(jQuery);