const _ = (function () {

    const methods = {}

    //returns the type of object.
    methods.objectType = function (obj) {
        return Object.prototype.toString.call(obj)
    }

    //tells if it is an object.
    methods.isObject = function (obj) {
        const type = typeof obj;
        return type === 'function' || type === 'object';
    }

    //Checks if the passed object is a function.
    methods.isFunc = function (obj) {
        return (typeof (obj) === "function") ? true : false;
    }

    //Checks if the passed object is a Number.
    methods.isNum = function (obj) {
        return (!isNaN(obj) ? true : false)
    }

    //Checks if the passed object is a Null.
    methods.isNull = function (obj) {
        return obj === null;
    }

    //Checks if the passed object is a Undefined.
    methods.isUndefined = function (obj) {
        return obj === undefined
    }

    //get all the keys of an object in the form of an Array
    methods.getKeys = function (obj) {
        if (!_.isObject(obj)) return [];
        const keys = []
        for (let key in obj) {
            if (!obj.hasOwnProperty(key))
                continue
            keys.push(key)
        }
        return keys;
    }

    //returns all the values of an object in the form of an Array
    methods.getValues = function (obj) {
        if (obj == null)
            return;
        const length = _.getKeys(obj).length;
        if (!length)
            return [];
        const _keys = _.getKeys(obj);
        const values = [];
        for (let i = 0; i < length; i++)
            values[i] = obj[_keys[i]]
        return values;
    }

    //Check if an object,String,Array is empty.
    methods.isEmpty = function (obj) {
        if (obj == null)
            return true;
        if (typeof (obj) === "string")
            return obj.length === 0;
        return _.getKeys(obj).length === 0;
    }

    //checks if the passed object is boolean.
    methods.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]'
    }

    //checks if the object is a dom element.
    methods.isDom = function (obj) {
        return (obj && obj.nodeType === 1) ? true : false;
    }

    //check if the object contains the properties
    methods.containsAttr = function (obj = {}, attr = []) {
        const _keys = _.getKeys(attr);
        for (let i = 0; i < _keys.length; i++) {
            if (obj.hasOwnProperty(_keys[i])) //Only takes object's properties and not it's prototype.
                continue;
            return false;
        }
        return true;
    }

    //call a function after certain amount of time( milliseconds) after passing an argument.
    /* methods.delayCall=async(callback,time,...args)=>{
         callback(null,args)
          return setTimeout( async ()=>{
              return callback.apply(null,args);
          }, time);
        
      }*/

    //Reverse Key and values;
    methods.reverseObject = function (obj) {
        const _keys = _.getKeys(obj);
        const _values = _.getValues(obj);
        let result = {};
        if (!_keys.length)
            return obj;
        for (let i = 0; i < _keys.length; i++) {
            if (typeof (_values[i]) === 'function')
                continue;
            if (typeof (_values[i]) === 'object') {
                let StringifyObj = JSON.stringify(_values[i]);
                result[StringifyObj] = _keys[i]
                continue;
            }
            result[obj[_keys[i]]] = _keys[i];
        }
        return result;
    }

    //Find a random number between Min and Max.
    methods.random = function (min = 0, max) {
        if (max == null || max < min) {
            max = min;
        }
        return min + Math.floor(Math.random() * (max - min));
    }

    //Determines if an object or an array contains an element.
    methods.contains = function (obj, val) {
        const _values = _.getValues(obj)
        return _values.indexOf(val) >= 0;
    }

    //takes an array and converts it into an array with unique values
    methods.uniq = function (arr) {
        if (!Array.isArray(arr) || arr.length == 0)
            return [];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (result.indexOf(arr[i]) >= 0)
                continue;
            result.push(arr[i])
        }
        return result;
    }

    //extend an object to another object's own property
    /*override parameter is defaulted to false so that common properties are
    not overridden.*/

    methods.extend = function (obj1 = null, obj2 = null, override = false) {
        if (obj2 === null)
            return obj1;
        if (obj1 === null)
            return obj2;
        const _keys = _.getKeys(obj2);
        const _values = _.getValues(obj2);
        if (override) {
            for (let i = 0; i < _keys.length; i++) {
                obj1[_keys[i]] = _values[i];
            }
        }
        else {
            for (let i = 0; i < _keys.length; i++) {
                if (!obj1.hasOwnProperty(_keys[i]))
                    obj1[_keys[i]] = _values[i];
            }

        }
        return obj1;
    }

    //Converts an object into a list of keys and values.
    methods.pairs = function (obj) {
        const _keys = _.getKeys(obj);
        const arr = [];
        for (let i = 0, length = _keys.length; i < length; i++) {
            arr.push('[' + _keys[i] + ',' + obj[_keys[i]] + ']')
        }
        return arr;
    }

    // Return a sorted list of the function names available on the object.
    methods.functions = function (obj) {
        const _keys = _.getKeys(obj)
        const arr = [];
        for (let i = 0, length = _keys.length; i < length; i++) {
            if (typeof (obj[_keys[i]]) === 'function')
                arr.push(_keys[i])
        }
        return arr;
    }

    // returns the number of times given array contains a particular element;
    // return -1 if the argument is invalid.(non-array,null,undefined)
    methods.howMany = function (arr, ele) {
        if (!Array.isArray(arr))
            return -1;
        let count = 0;
        for (let i in arr) {
            if (arr[i] === ele)
                ++count;
        }
        return count;
    }

    //Filter out all negative values in an array.
    methods.bePositive = function (arr) {
        if (!Array.isArray(arr))
            return -1;
        const a = []
        for (let i = 0, length = arr.length; i < length; i++) {
            if (_.isNum(arr[i]) && arr[i] > 0)
                a.push(arr[i])
        }
        return a;
    }

    //remove every element that is mentioned.
    methods.without = function (arr = [], ...values) {
        let a = [];
        const res = []
        if (!Array.isArray(arr) || arr === null || arr === undefined)
            return a;
        a = values;
        for (let i = 0; i < arr.length; i++) {
            if (a.indexOf(arr[i]) >= 0)
                continue;
            res.push(arr[i])
        }
        return res;
    }
    //returns array with .
    methods.intersection = function (arr = [], ...values) {
        let a = []; const res = []
        if (!Array.isArray(arr) || arr === null || arr === undefined)
            return a;
        a = values;
        for (let i = 0; i < arr.length; i++) {
            if (a.indexOf(arr[i]) >= 0)
                res.push(arr[i]);
        }
        return res;
    }

    //Call a method n times.
    methods.times = function (func, times = 1, args) {
        if (func === null || func === undefined || typeof (func) !== 'function')
            return -1;
        const arr = [];
        for (let i = 0; i < times; i++) {
            arr.push(func.apply(null, args));
        }
        return arr;
    }

    //Search based on a particular key
    methods.linearSearch = function (arr, val) {
        if (val === null || val === undefined || typeof (val) != 'number')
            return -1;
        const _keys = _.getKeys(arr)
        for (let i = 0, length = 0; i < arr.length; i++) {
            if (arr[_keys[i]] === val)
                return _keys[i];
        }
        return -1;
    }

    //Binary Search: time complexity:o(logn)
    methods.binarySearch = function (arr, val) {
        let _keys = _.getKeys(arr)
        if (val === null || val === undefined || typeof (val) != 'number' || !_keys.length)
            return -1;
        let min = 0;
        let max = arr.length - 1;
        let mid = -1;
        while (min <= max) {
            mid = Math.floor(min + (max - min) / 2);
            if (val == arr[mid])
                return mid;
            else if (val < arr[mid])
                max = mid - 1;
            else
                min = mid + 1;
        }
        return mid;
    }

    //get values of particular keys.
    methods.pluck = function (obj, model) {
        const _arr = _.getValues(obj)
        const _res = [];
        for (let i = 0; i < _arr.length; i++) {
            if (_arr[i].hasOwnProperty(model))
                _res.push(_arr[i][model])
        }
        return _res;
    }

    //is it a Json object?.
    methods.isJSON = function (obj) {
        try {
            let jsonObj = JSON.parse(obj)
            console.log(jsonObj)
            if (!jsonObj || !typeof (jsonObj) === 'object')
                return false;
        }
        catch (e) {
            return false;
        }
        return true;
    }

    //Check if the property belongs to the prototype of the object.
    methods.isProtoProp = function (obj, key) {
        if (obj === undefined || obj === null || key === undefined || typeof (obj) != 'object')
            return false;
        if (obj[key]) {
            if (obj.hasOwnProperty(key))
                return false;
            return true;
        }
        return false;
    }

    //get a random value in the array.
    methods.randomArr = function (arr) {
        if (!Array.isArray(arr) || !arr.length) {
            return;
        }
        const index = _.random(0, arr.length - 1)
        return arr[index];
    }

    //Call the function only after certain number of calls.
    methods.after = function (times = 0, func = () => { }, ...args) {
        return function () {
            if (--times < 0)
                return func.apply(null, ...args)
        }
    }
    //Limit the maximum number of calls that can be made to a function.
    methods.before = function (times = 0, func = () => { }, ...args) {
        return function () {
            if (--times >= 0)
                return func.apply(null, ...args)
        }
    }
    //Limit the function call to only once.
    methods.once = function (func = () => { }, ...args) {
        let times = 0;
        return function () {
            if (++times == 1)
                return func.apply(null, ...args)
        }
    }

    //Capitalize the first letter of the String.
    methods.capitalize = function (str) {
        if (typeof (str) !== 'string')
            return str;
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    //Split the string in line breaks and return a list.
    methods.splitLines = function (str) {
        if (typeof (str) !== 'string')
            return;
        const arr = str.split("\n")
        return arr;
    }

    //Capitalize Every first word of the sentence and trim spaces.
    methods.prettyString = function (str) {
        if (typeof (str) !== 'string')
            return;
        let arr = str.split(".")
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            arr[i] = _.capitalize(arr[i].trim());
            result += (i == 0) ? arr[i] + "." : " " + arr[i] + ".";
        }
        return result;
    }
    //Check if the string is a palindrome.
    methods.isPalindrome = function (str) {
        if (typeof (str) !== 'string')
            return;
        let j = str.length;
        for (let i = 0; i < str.length; i++) {
            --j;
            if (i > j)
                break;
            if (str[i] === str[j])
                continue;
            return false;
        }
        return true;
    }

    //Return size of any collection.
    methods.size = function (obj) {
        return _.getKeys(obj).length;
    }

    //Difference between the first and the second array.
    methods.difference = function (arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2))
            return;
        let arr = [];
        for (let i = 0, length = arr1.length; i < length; i++) {
            if (!arr2.includes(arr1[i]))
                arr.push(arr1[i])
        }
        return arr;
    }

    //delete a key with a certain value.
    methods.deleteKey = function (obj, val) {
        if (!_.isObject(obj))
            return;
        let _keys = _.getKeys(obj);
        for (let i = 0, length = _keys.length; i < length; i++) {
            if (obj[_keys[i]] === val)
                delete obj[_keys[i]]
        }
        return obj;
    }

    //Slice the first n elements of the array.
    methods.drop = function (arr = [], num = 0) {
        if (!Array.isArray(arr) || !_.isNum(num))
            return;

        const res = [];
        if (num >= 0) {
            if (num > arr.length)
                return res;
            for (let i = num; i < arr.length; i++)
                res.push(arr[i])
            return res;
        }

        if (Math.abs(num) > arr.length)
            return res;
        for (let i = 0; i < arr.length + num; i++)
            res.push(arr[i])
        return res;
    }

    //get every element of the array except for the last one.
    methods.initial = function (arr = []) {
        if (!Array.isArray(arr))
            return;

        let result = [];
        if (!arr.length || arr.length == 1)
            return result;
        for (let i = 0; i < arr.length - 1; i++)
            result.push(arr[i])
        return result;
    }

    //Takes the array and converts into a string with a separator.
    methods.join = function (arr = [], sep = " ") {
        if (!Array.isArray(arr) || typeof (sep) !== 'string')
            return;
        let str = "";
        for (let i = 0, length = arr.length; i < length - 1; i++)
            str += arr[i] + sep;
        return str + arr[arr.length - 1];
    }

    //return true if number is prime
    methods.isPrime = function (num = 0) {
        if (!_.isNum(num))
            return false;
        if (num <= 1)
            return false;
        if (num === 2)
            return true;
        for (let i = 2; i < num; i++) {
            if (num % i === 0)
                return false;
        }
        return true;
    }

    //return GCD of two Integers
    methods.calcGCD = function (num1 = 0, num2 = 0) {
        if (!_.isNum(num1) || !_.isNum(num2))
            return -1;
        if (num1 % num2 === 0 || num2 % num1 === 0)
            return (num1 <= num2) ? num1 : num2;

        let gcd = 1;
        let small = (num1 <= num2) ? num1 : num2;
        let half = (small / 2) + 1;
        for (let i = 2; i <= half; i++) {
            if (num1 % i === 0 && num2 % i === 0)
                gcd = i;
        }
        return gcd;
    }

    //return LCM of two numbers.
    methods.calcLCM = function (num1 = 0, num2 = 0) {
        if (!_.isNum(num1) || !_.isNum(num2))
            return -1;
        if (num1 % num2 === 0 || num2 % num1 === 0)
            return (num1 <= num2) ? num2 : num1;

        let lcm = 1;
        let big = (num1 <= num2) ? num2 : num1;
        let end = num1 * num2;
        for (let i = big + 1; i <= end; i++) {
            if (i % num1 === 0 && i % num2 === 0)
                lcm = i;
        }
        return lcm;
    }

    //return an array containing all the positive divisors of a number.
    methods.divisors = function (num = 1) {
        const arr = [];
        if (num == 0)
            return arr;
        if (num < 0)
            num = num * -1;
        let half = num / 2 + 1;
        for (let i = 1; i <= half; i++) {
            if (num % i == 0)
                arr.push(i);
        }
        arr.push(num);
        return arr;
    }

    //Tell if 3 sides can form a right angle triangle.
    methods.isRightTriangle = function (s1 = 1, s2 = 1, s3 = 1) {
        if (!_.isNum(s1) || !_.isNum(s2) || !_.isNum(s3))
            return;

        if (s1 * s1 === s2 * s2 + s3 * s3)
            return true;
        else if (s2 * s2 === s1 * s1 + s3 * s3)
            return true;
        else if (s3 * s3 === s2 * s2 + s1 * s1)
            return true;
        else
            return false;
    }

    //Return area of a triangle on given sides.
    methods.areaTriangle = function (b = 1, h = 1) {
        if (b <= 0 || h <= 0)
            return;
        return 0.5 * b * h;
    }

    //Return true if all the elements of the array are numbers.
    methods.isNumArray = function (arr = []) {
        for (let i = 0; i < arr.length; i++) {
            if (!_.isNum(arr[i]))
                return false;
        }
        return true;
    }

    //Return mean of all the numbers in the array. 
    //If the datatype other than a number is present in the array, return 0.

    methods.findMean = function (arr = []) {
        if (!arr.length || !_.isNumArray(arr))
            return 0;
        let total = 0;

        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total / arr.length;
    }

    //Return median of the array.
    methods.findMedian = function (arr = []) {
        if (!arr.length || !_.isNumArray(arr))
            return null;
        arr.sort();
        let i = 0, j = arr.length - 1;
        for (i = 0; i < arr.length; i++) {
            if (i == j || i + 1 == j)
                break;
            --j;
        }
        return arr[i];
    }

    //Return Mode of a set of numbers in an array.
    methods.findMode = function (arr = []) {
        if (!arr.length || !_.isNumArray(arr))
            return null;
        if (arr.length == 1)
            return arr[0];
        arr.sort();
        let mode = arr[0];
        let count = 0, temp = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                ++temp;
                if (temp > count) {
                    count = temp;
                    mode = arr[i];
                }
            }
            else
                temp = 0;
        }
        return mode;
    }

    //Reverse a String.
    methods.reverseString = function (str) {
        if (!str.length || !_.objectType(str) === "string")
            return;
        return str.split('').reverse().join('');
    }

    //Return a binary String of a positive Integer.MSB represents sign of the integer.
    methods.binaryString = function (num = 1) {

        if (num === 0 || !_.isNum(num))
            return 0;
        let sign = (num > 0) ? 1 : 0;
        if (num < 0)
            num = Math.abs(num);
        let bin = "";
        while (num >= 1) {
            bin += (num % 2);
            num /= 2;
            num = Math.floor(num)
        }
        bin += (sign) ? 1 : 0;
        return _.reverseString(bin);
    }
    //Helper-Check if the given string is a binary string.
    methods.isBinary = function (str = "") {
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === '0' || str.charAt(i) === '1')
                continue;
            return false;
        }
        return true;
    }

    //Convert Binary String to Integer.MSB should represent the sign.
    methods.toDecimal = function (str) {
        if (!_.objectType(str) === "string")
            return null;
        if (str.length <= 1 || !_.isBinary(str))
            return null;
        str = _.reverseString(str);
        let dec = 0;
        for (let i = 0; i < str.length - 1; i++) {
            if (str.charAt(i) == '1')
                dec += Math.pow(2, i);
        }
        dec *= (str.charAt(str.length - 1) === '1') ? 1 : -1;
        return dec;
    }

    //Find Standard Deviation of set of numbers.
    methods.standardDeviation = function (arr = []) {
        if (arr.length <= 1 || !_.isNumArray(arr))
            return;
        let mean = _.findMean(arr);
        let total = 0;
        for (let i = 0; i < arr.length; i++)
            total += Math.pow((mean - arr[i]), 2);
        return Math.sqrt(total / arr.length)
    }

    //Is leap year?
    methods.isLeapYear = function (year = 0) {
        if (year < 0 || year > 99999999 || !_.isNum(year))
            return null;
        return (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
    }

    //When is the next leap year?
    methods.nextLeapYear = function () {
        let currentYear = new Date().getFullYear()
        let flag = 0;
        currentYear += 1;
        while (flag == 0) {
            if (_.isLeapYear(currentYear))
                flag = 1;
            else
                currentYear += 1;
        }
        return currentYear;
    }

    // return the number of occurance of a digit in a number.
    methods.totalOccurence = function (num, digit) {
        if (num == null || !_.isNum(num) || !_.isNum(digit) || num.length > 9 || digit.length > 1)
            return;

        let arr = num.toString().split('')
        let filteredArr = arr.filter((num) => {
            return num === digit.toString();
        })
        return filteredArr.length;
    }

    // returns the number of occurance of specific string in an array
    methods.totalStringOccurence = function (arr = [], myString) {
        if (myString.isString == false || arr.length === 0)
            return null;

        let filteredArr = arr.filter((s) => {
            return s === myString;
        })
        return filteredArr.length;
    }

    //Checks the sign of a number. 1-positive,-1-negative,0-zero.
    methods.checkSign = function (num) {
        if (!_.isNum(num))
            return null;
        if (num === 0)
            return 0;
        else
            return (num > 0) ? 1 : -1;
    }
    return methods;
})()

exports._ = _;

