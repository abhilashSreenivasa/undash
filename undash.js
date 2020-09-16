var _=(function(){

    var methods={}

    methods.objectType=function(obj){
        return Object.prototype.toString.call(obj)
    }
    
    //Checks if the passed object is a function.
    methods.isFunc=function(obj){
        return (typeof(obj)==="function")? true:false;
    }
    
    //Checks if the passed object is a Number.
    methods.isNum=function(obj){
        return (!isNaN(obj)?true:false)
    }

    //Checks if the passed object is a Null.
    methods.isNull= function(obj){
        return obj===null;
    }

    //Checks if the passed object is a Undefined.
    methods.isUndefined=function(obj){
        return obj===undefined
    }
    
    methods.isBoolean=function(obj){
        return obj===true || obj===false || toString.call(obj) === '[object Boolean]'
    }
    return methods;
    })()

    module.exports=_;