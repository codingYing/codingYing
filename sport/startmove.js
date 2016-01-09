function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function startMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(var attr in json){
            //ȡ��ǰֵ
            var iCur = 0;
            if(attr == 'opacity'){
                iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                iCur = parseInt(getStyle(obj,attr));
            }

            //�ٶ�
            var speed = (json[attr] - iCur)/10;
            speed = (speed > 0)? Math.ceil(speed) : Math.floor(speed);

            //ֹͣ
            if(iCur == json[attr]){
                clearInterval(obj.timer);
                if(fn()){
                    fn();
                }
            }else{
                if(attr == 'opacity'){
                    obj.style.filter = 'alpha(opacity:' + (iCur + speed) + ')';
                    obj.style.opacity = (iCur + speed) / 100;
                }
                obj.style[attr] = iCur + speed + 'px';
            }
        }
    },30);

}
