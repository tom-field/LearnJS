/**
 * Created by zhousg on 2016/1/9.
 */
window.onload = function(){
    deleteOption();
}
/*删除操作*/
var deleteOption = function(){
    /*拿到 需要的DOm*/
    /*弹出层*/
    var popWin = document.getElementsByClassName("jd_popWin")[0];
    /*弹出框*/
    var box = popWin.getElementsByClassName("jd_popWin_box")[0];

    /*所有的删除按钮*/
    var deleteList = document.getElementsByClassName('option_delete_product');

    /*点击的那个删除按钮*/
    var up;

    /*给他们加上事件*/
    for(var i = 0 ; i < deleteList.length ; i++ ){
        deleteList[i].index = i;
        /*tom.tap(deleteList[i],function(e){
            console.log(this.index);
        });*/
        deleteList[i].onclick = function(){
            console.log(this.index);
            /*显示弹出层*/
            popWin.style.display = "block";

            /*定好框的位置*/
            /*因为是隐藏的*/
            /*层的高度*/
            var popWinHeight = popWin.offsetHeight;
            /*框的高度*/
            var boxHeight = box.offsetHeight;

            box.style.marginTop = (popWinHeight-boxHeight)/2+"px";
            /*加上动画class*/
            box.className = "jd_popWin_box jump";
            /*setTimeout(function(){
                //是最后执行的
            },0);*/

            /*打开盖子*/
            up = this.firstElementChild;

            /*加过渡*/
            up.style.transition = "all 1s ease";
            up.style.webkitTransition = "all 1s ease";

            /*加动画*/

            up.style.transformOrigin ="0 5px";
            up.style.webkitTransformOrigin ="0 5px";
            up.style.transform = "rotate(-45deg)";
            up.style.webkitTransform = "rotate(-45deg)";
            console.log(up);

        }
    }

    box.getElementsByClassName('cancel')[0].onclick = function(){
        popWin.style.display = 'none';
        if(up){
            up.style.transform = "none";
            up.style.webkitTransform = "none";
        }
    }


}
