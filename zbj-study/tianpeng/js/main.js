/**
 * Created by mlf on 2015/9/16.
 */

(function () {

    // 页面中需要用到的dom对象
    var obj = {
        slide : document.getElementById('slide'),
        item_list : document.getElementById('item-list'),
        oPrev : document.getElementsByClassName('prev')[0],
        oNext : document.getElementsByClassName('next')[0],
        product : document.getElementById('product'),
        showBox : document.getElementsByClassName('show-box')[0],
        works_list : document.getElementsByClassName('works-list')
    }
        autoPlay();
    function countPlus (){
        iNow ++;
        if (iNow > itemList_li.length - 1){
            iNow = 0;
        }
    }
    // 标记出当前元素状态
    function markCurrent (index,arr){
        for (var i = 0; i < arr.length; i++){
            arr[i].classList.remove('active');
        }
        arr[index].classList.add('active');
        obj.slide.style.left = -iNow * slideLi[0].offsetWidth +'px';
    }
    function autoPlay (){
        timer = setInterval(function () {
            countPlus();
            markCurrent(iNow,itemList_li);
        },2000);
    }

    // slide
    var slideLi = obj.slide.getElementsByTagName('li');
    var itemList_li = obj.item_list.getElementsByTagName('li');
    var timer = null;
    var iNow = 0; // 当前元素下标
    obj.slide.style.width = slideLi[0].offsetWidth * slideLi.length + 'px'; // 初始化ul的宽
    for (var i = 0; i < itemList_li.length; i++) {
        itemList_li[i].index = i;
        itemList_li[i].onmouseover = function () {
            iNow = this.index;
            markCurrent(this.index,itemList_li);
        }
    }

    obj.slide.onmouseover
        = obj.item_list.onmouseover
        = obj.oPrev.onmouseover
        = obj.oNext.onmouseover
        = function () {
        clearInterval(timer);
        obj.oPrev.style.display = 'block';
        obj.oNext.style.display = 'block';
    }
    obj.slide.onmouseout = obj.item_list.onmouseout = function () {
        autoPlay();
        obj.oPrev.style.display = 'none';
        obj.oNext.style.display = 'none';
    }
    obj.oNext.onclick = function () {
        countPlus();
        markCurrent(iNow,itemList_li);
    }
    obj.oPrev.onclick = function () {
        iNow --;
        if (iNow < 0){
            iNow = itemList_li.length - 1;
        }
        markCurrent(iNow,itemList_li);
    }

    // tabChange
    var productLi = obj.product.getElementsByTagName('li');
    var aUl = obj.showBox.getElementsByTagName('ul');
    for (var i = 0; i < productLi.length; i++){
        productLi[i].index = i;
        productLi[i].onclick = function () {
            markCurrent(this.index,productLi);
            markCurrent(this.index,aUl);
        }
    }

    // pop layer
    var allPop = [];
    var allImg = []
    // 将页面中所有的pop层获取添加到allPop数组
    for (var i = 0; i < obj.works_list.length; i++){
        var aImg = obj.works_list[i].getElementsByTagName('a');
        var aPop = obj.works_list[i].getElementsByClassName('pop-layer');
        for (var j = 0; j < aPop.length; j++){
            allPop.push(aPop[j]);
            allImg.push(aImg[j]);
        }
    }
    for (var i = 0; i < allImg.length; i++){
        allImg[i].index = i;
        allImg[i].onmouseover = function () {
            markCurrent(this.index,allPop);
        }
        allImg[i].onmouseout = function () {
            for (var i = 0; i < allPop.length; i++){
                allPop[i].classList.remove('active');
            }
        }
    }
})();