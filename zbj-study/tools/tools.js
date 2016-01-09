var utils = {
    // 生成唯一ID
    uuid: function(){ 
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    },

    // 給 DOM 添加 className
    addClass: function( domObj, className ){
        if (!domObj.className)
        {
            domObj.className = className;
        } else {
            domObj.className += className;
        }
    },

    // 去掉 DOM 上的某个 className
    removeClass: function( domObj, className ){
        var reg = new RegExp('\\b'+ trim(className) +'\\b', 'g');
        domObj.className = domObj.className.replace(reg, '');
    },

    // 在当前的 domcument 上加载一个 script 脚本，加载完成后执行 cb
    loadScript: function( url, cb ){
        var script = document.createElement("script"),
            body = document.getElementsByTagName('body')[0];
        script.setAttribute('src',url);
        body.appendChild(script);
        if ( 'onload' in script){ // chrome，FF 及 IE9以上
            script.onload = cb;
        } else { // IE8及其以下
            script.onreadystatechange = function(){
                if(this.readyState == "loaded" || this.readyState == "complete"){
                    cb();
                }
            }
        }
    },

    // 返回一个不重复的数组
    uniqueArray: function( array ){
        //array = array.sort();
        var json = {},result = [];
        for(var i = 0; i < array.length; i++)
        {
            if (!json[array[i]])
            {
                json[array[i]] = true;
                result.push(array[i]);
            }
        }
        return result;
    },

    // parent为父类的构造函数，sub为子类的构造函数。实现继承。用尽量多的方法完善该函数，例如原型链的方式，深克隆的方式等
    extend: function( parent, sub ) {},
    // 类型判断
    isString: function( val ){
        return (Object.prototype.toString.call(val)=='[object String]');
    },
    isNumber: function( val ){
        return (Object.prototype.toString.call(val)=='[object Number]');
    },
    isObject: function( val ){
        return (Object.prototype.toString.call(val)=='[object Object]');
    },
    isArray: function( val ){
        return (Object.prototype.toString.call(val)=='[object Array]');
    },
    isFunction: function( val ){
        return (Object.prototype.toString.call(val)=='[object Function]');
    }
};

// 方式1  原型链继承
function Child (){}
function Parent (){}
Child.prototype = new Parent();

// 方式2  通过构造函数继承
function Parent(){}
function Child(){
    Parent.call(this);
}
var test = new Child();

 // 方式3
 function Parent(){}
 var p = Object.create(Parent);