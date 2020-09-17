var _=(function(){

    var methods={}
    
    //returns the type of object.
    methods.objectType=function(obj){
        return Object.prototype.toString.call(obj)
    }

    //tells if it is an object.
    methods.isObject=function(obj){
        var type=typeof obj;
        return type==='function' || type==='object';
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

    //get all the keys of an object in the form of an Array
    methods.getKeys=function(obj){
         if(!_.isObject(obj)) return [];
         let keys=[]
         for (var key in obj) {
            if (!obj.hasOwnProperty(key))
                continue
            keys.push(key)
        }
        return keys;
    }

    //returns all the values of an object in the form of an Array
    methods.getValues=function(obj){
        if(obj==null)
        return;
        const length=_.getKeys(obj).length;
        if(!length)
        return [];
         var _keys = _.getKeys(obj);
         var values=[];
         for(let i=0;i<length;i++)
         values[i]=obj[_keys[i]]
         return values;
    }
    
    //checks if the passed object is boolean.
    methods.isBoolean=function(obj){
        return obj===true || obj===false || toString.call(obj) === '[object Boolean]'
    }

    //checks if the object is a dom element.
    methods.isDom=function(obj){
        return (obj && obj.nodeType===1) ? true:false;
    }
    return methods;
    })()

    module.exports=_;