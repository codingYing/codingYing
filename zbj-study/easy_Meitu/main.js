var canvas = document.getElementById('myCanvas');
var drawPathBtn = document.getElementById('drawPath');  
var drawImgBtn = document.getElementById('drawImg');
var drawFont = document.getElementById('drawFont');
var clearBtn = document.getElementById('clearBtn')
var redMaxValue = document.getElementById('redMaxValue');
var greenMaxValue = document.getElementById('greenMaxValue');
var blueMaxValue = document.getElementById('blueMaxValue');
var alphaMaxValue = document.getElementById('alphaMaxValue');
var file = document.getElementById('uploadFile');

var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var alpha = document.getElementById('alpha');

if(canvas.getContext){
    var pic = canvas.getContext('2d');
}

//绘制路径
function drawPath(){  
    pic.beginPath();
    pic.moveTo(0,0);
    pic.lineTo(200,100); //终点
    pic.lineWidth = 2.0;
    pic.strokeStyle = "#cc0000";
    pic.lineTo(200,50);
    pic.lineTo(0,0);
    pic.stroke();
    pic.closePath();
}

//绘制图片
function drawImg(src){
    var img = new Image();
    img.src = src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        pic.drawImage(img,0,0);
    }
}

//改变颜色通道
function imgEffect(options){
    var imgData = pic.getImageData(0,0,canvas.width,canvas.height);
    var d = imgData.data;
    for(var i = 0; i < d.length; i += 4){
        options.red?d[i] = d[i] + d[i]*((options.red-50)/100):null;
        options.green?d[i+1] = d[i+1] + d[i+1]*((options.green-50)/100):null;
        options.blue?d[i+2] = d[i+2] + d[i+2]*((options.blue-50)/100):null;
        options.alpha?d[i+3] = d[i+3] + d[i+3]*((options.alpha-50)/100):null;
    }
    pic.putImageData(imgData,0,0);
}

drawImgBtn.onclick = drawImg;//添加图片

file.onchange = function(){  //上传图片
    if(file.files.length === 0) return false;
    var reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = function(){
        var src = event.target.result;
        drawImg(src);
        //添加path
        drawPathBtn.addEventListener('click',drawPath,false);
        //添加文本
        drawFont.onclick = function(){  
            var inputBox = document.getElementById('fontText')
            var inputText = inputBox.value;
            if(inputText == ""){
                alert('请输入文字');
                inputBox.focus();
            }else{
                pic.font = "Bold 30px Arial";
                pic.textAlign = "left";
                pic.fillStyle = "#008600";
                pic.fillText(inputText,10,10);
                pic.strokeText(inputText,30,30);
            }
        };
    }
};

//改变颜色通道事件
red.addEventListener('mousemove',function(){
    redMaxValue.innerHTML = this.value;
    var options = {red:this.value};
    imgEffect(options);
},false);
green.addEventListener('mousemove',function(){
    greenMaxValue.innerHTML = this.value;
    var options = {green:this.value};
    imgEffect(options);
},false);
blue.addEventListener('mousemove',function(){
    blueMaxValue.innerHTML = this.value;
    var options = {blue:this.value};
    imgEffect(options);
},false);
alpha.addEventListener('mousemove',function(){
    alphaMaxValue.innerHTML = this.value;
    var options = {alpha:this.value};
    imgEffect(options);
},false);

//清除图像
function clearImg(){
    pic.fillStyle = "#fff";
    pic.fillRect(0,0,700,500);
}
clearBtn.onclick = clearImg;
