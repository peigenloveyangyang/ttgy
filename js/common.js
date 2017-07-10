/**
 * Created by lanou on 2017/6/26.
 */
    //    头部
var bol = true;
$(".c_down").click(function(){
    $(this).parent().find(".down_list").slideToggle();
    bol = !bol;
    if(bol){
        $(this).parent().find(".arrows").removeClass("active");
    }else{
        $(this).parent().find(".arrows").addClass("active");
    }
})
// 购物车的显示
$(".shop").click(function(){
    $("#shop").slideToggle();
})
/*// 购物车
$("#shop").click(function(e){
    if(e.target.className == "sub"){
        var t_num = e.target.parentNode.children[1].innerHTML;
        var num = parseInt(t_num);
        if(t_num > 1){
            e.target.parentNode.children[1].innerHTML = --num;
        }
    }else if(e.target.className == "add"){
        var t_num = e.target.parentNode.children[1].innerHTML;
        var num = parseInt(t_num);
        e.target.parentNode.children[1].innerHTML = ++num;
    }
    // 总价
    var price_num = 0;
    $(".u_price").each(function(index,ele){
        $(".price").html(function(){
            price_num += parseFloat(ele.innerHTML)*parseInt($(".g_num").eq(index).html());
            return price_num.toFixed(2);
        })
    })
    // 购物车--删除
    if(e.target.className == "f_r"){
        e.target.parentNode.parentNode.parentNode.remove();
    }
    // 无商品时
    if($("#shop_list li").length == 0){
        $("#shop_list").hide();
        $(".zj").hide();
        $("#no_shop").show();
    }
    // 购物车--商品数量
    $(".number").html(function(){
        return $("#shop_list li").length
    })
    $(".shop span").html(function(){
        return $("#shop_list li").length
    })
})
// 购物车--商品数量
$(".number").html(function(){
    return $("#shop_list li").length
})
$(".shop span").html(function(){
    return $("#shop_list li").length
})*/

// 弹窗
function _alertFn(secFn,falFn){
    $("#_alert").fadeIn(300);
    $(".al_box").attr("class","al_box");
    $(".al_box").addClass("_alertIn")
    $(".al_box").click(function(e){
        if(e.target.className == "iconfont"){
            $("#_alert").fadeOut(300);
            $(".al_box").addClass("_alertOut")
            if(falFn != null) falFn();
        }
        if(e.target.className == 'false'){
            $("#_alert").fadeOut(300);
            $(".al_box").addClass("_alertOut")
            if(falFn != null) falFn();
        }
        if(e.target.className == 'true'){
            $("#_alert").fadeOut(300);
            $(".al_box").addClass("_alertOut")
            if(secFn != null) secFn();
        }
    })
}
/**
 * cookie
 */
function setCookie(name, value)
{
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if(expires!=null)
    {
        var LargeExpDate = new Date ();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
    }
    document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString()));
}

function getCookie(Name)
{
    var search = Name + "="
    if(document.cookie.length > 0)
    {
        offset = document.cookie.indexOf(search)
        if(offset != -1)
        {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if(end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
}

function deleteCookie(name)
{
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}