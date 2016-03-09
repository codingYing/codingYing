/*
(function(){
    var titList = document.getElementsByClassName('tit-list');
    var dropBox = document.getElementsByClassName('drop-box');

    for(var i = 0; i < titList.length; i++){
        var _this = titList[i];
        _this.onMouseOver = function(i){
            dropBox[i].style.top = titList[i].getBoundingClientRect().top + 30;
            dropBox[i].style.left = titList[i].getBoundingClientRect().left;
            dropBox[i].style.display = 'inline';
        };
    }
})();*/


function showSup(divId){
    var eventObj = document.getElementsByClassName('gqj-drop')[0];
    eventObj.style.top = divId.getBoundingClientRect().top + 30 + 'px';
    eventObj.style.left = divId.getBoundingClientRect().left + 'px';
    eventObj.style.display = 'block';
}

function hideSup(divId){
    var eventObj = document.getElementsByClassName('gqj-drop')[0];
    eventObj.style.display = 'none';
}