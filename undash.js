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

    //call a function after certain amount of time( milliseconds) after passing an argument.
  /*  methods.delayCall=async (func,time,args)=>{
        
        return await setTimeout(async ()=>{
          
            return await func.call(delayCall,args);
        }, time);
    }*/
    
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

    //Find a random number between Min and Max.
    methods.random=function(min=0,max){
        if(max==null || max<min){
        max=min;
        }
       return min+Math.floor(Math.random()*(max-min));
    }

    //Determines if an object or an array contains an element.
    methods.contains=function(obj,val){
        var _values=_.getValues(obj)
        return _values.indexOf(val)>=0;
    }

    //takes an array and converts it into an array with unique values
    methods.uniq=function(arr){
        if(!Array.isArray(arr) || arr.length==0)
        return [];
        var result=[];
        for(let i=0;i<arr.length;i++){
            if(result.indexOf(arr[i])>=0)
            continue;
            result.push(arr[i])
        }
        return result;
    }

    //extend an object to another object's own property
    /*override parameter is defaulted to false so that common properties are
    not overridden.*/

    methods.extend=function(obj1=null,obj2=null,override=false){
        if(obj2===null)
        return obj1;
        if(obj1===null)
        return obj2;
        var _keys=_.getKeys(obj2);
        var _values=_.getValues(obj2);
        if(override){
            for(var i=0;i<_keys.length;i++){
                obj1[_keys[i]]=_values[i];
            }
        }
        else{
            for(var i=0;i<_keys.length;i++){
                if(!obj1.hasOwnProperty(_keys[i]))
                obj1[_keys[i]]=_values[i];
            }

        }
        return obj1;
    }
     
    //Converts an object into a list of keys and values.
    methods.pairs=function(obj){
        var _keys=_.getKeys(obj);
        var arr=[];
        for(var i=0,length=_keys.length;i<length;i++){
            arr.push('['+_keys[i]+','+obj[_keys[i]]+']')
        }
        return arr;
    }

     // Return a sorted list of the function names available on the object.
     methods.functions=function(obj){
        var _keys=_.getKeys(obj)
        var arr=[];
        for(var i=0,length=_keys.length;i<length;i++){
            if(typeof(obj[_keys[i]])==='function')
            arr.push(_keys[i])
        }
        return arr;
     }
     
    // returns the number of times given array contains a particular element;
    // return -1 if the argument is invalid.(non-array,null,undefined)
    methods.howMany=function(arr,ele){
        if(!Array.isArray(arr))
        return -1;
        let count=0;
        for(let i in arr){
        if(arr[i]===ele)
        ++count;
        }
        return count;
    }

    //Filter out all negative values in an array.
    methods.bePositive=function(arr){
        if(!Array.isArray(arr))
        return -1;
        var a=[]
        for(let i=0,length=arr.length;i<length;i++)
        {
            if(_.isNum(arr[i]) && arr[i]>0)
            a.push(arr[i])
        }
        return a;
    }

    //remove every element that is mentioned.
    methods.without=function(arr=[],...values){
       var a=[],res=[]
       if(!Array.isArray(arr) || arr===null || arr===undefined)
       return a;
       a=values;
       for(let i=0;i<arr.length;i++){
         if(a.indexOf(arr[i])>=0)
            continue;
         res.push(arr[i])
       }
       return res;
   }
   //remove every element of the array that is not mentioned.
   methods.intersection=function(arr=[],...values){
    var a=[],res=[]
    if(!Array.isArray(arr) || arr===null || arr===undefined)
    return a;
    a=values;
    for(let i=0;i<arr.length;i++){
      if(a.indexOf(arr[i])>=0)
        res.push(arr[i]);
    }
    return res;
}


    return methods;
    })()

    module.exports=_;

    