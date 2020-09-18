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

    //Check if an object,String,Array is empty.
    methods.isEmpty=function(obj){
        if(obj==null)
        return true;
        if(typeof(obj)==="string")
        return obj.length===0;
        return _.getKeys(obj).length===0;
    }
    
    //checks if the passed object is boolean.
    methods.isBoolean=function(obj){
        return obj===true || obj===false || toString.call(obj) === '[object Boolean]'
    }

    //checks if the object is a dom element.
    methods.isDom=function(obj){
        return (obj && obj.nodeType===1) ? true:false;
    }

     //check if the object contains the properties
     methods.containsAttr=function(obj={},attr=[]){
        var _keys=_.getKeys(attr);
        for(let i=0;i<_keys.length;i++){
            if(obj.hasOwnProperty(_keys[i])) //Only takes object's properties and not it's prototype.
            continue;
            return false;
        }
        return true;
    }
    
    //Reverse Key and values;
    methods.reverseObject=function(obj){
        var _keys=_.getKeys(obj);
        var _values=_.getValues(obj);
        var result={};
        if(!_keys.length)
        return obj;
        for(let i=0;i<_keys.length;i++){
            if(typeof(_values[i])==='function')
            continue;
            if(typeof(_values[i])==='object')
            {
                var StringifyObj=JSON.stringify(_values[i]);
                result[StringifyObj]=_keys[i]
                continue;
            }
            result[obj[_keys[i]]]=_keys[i];
        }
        return result;
    }

    return methods;
    })()

   
    module.exports=_;

    