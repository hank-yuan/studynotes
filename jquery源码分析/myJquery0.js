(function () {
  function jQuery() {
    // 一个对象工厂，以后生成新对象不用new了，直接执行这个方法即可。
    return new jQuery.fn.init()
  }

  // jQuery的初始方法
  jQuery.fn = jQuery.prototype = {
    init: function () {

    }
  }

  jQuery.prototype.init.prototype = jQuery.fn
  // 修正构造器指向
  jQuery.prototype.constructor = jQuery

  // 扩展方法
  // 这个方法外部用依赖jQuery.type和jQuery.isPlainObject方法。
  // 内部第一次用不会用到jQuery.type和jQuery.isPlainObject。
  // 1.只有一个参数，且类型是对象，则对jQuery或者jQuery实例进行扩展
  // 2.第一个参数是bool值，则来确定是否深拷贝。
  // 3.深拷贝是指 拷贝值和被拷贝值都是对象，则进一步遍历复制，而不是直接覆盖。
  // 比如{a:{"1":1}},{a:{"2":2}}，浅拷贝结果是{a:{"2":2}},深拷贝结果是{a:{"1":1,"2":2}}
  // 4.拷贝时要进行循环引用判断
  // 5.对被拷贝值不是数组，不是普通对象，强行生成一个新的。
  // 6.可以对多个参数进行合并
  jQuery.extend = jQuery.fn.extend = function () {
    var options
    var name
    var src
    var copy
    var copyIsArray
    var clone

    var target = arguments[0] || {}


    var i = 1


    var length = arguments.length


    var deep = false

    // 第一个参数是bool值，第二个参数是目标值，索引从第三个参数开始
    // 第一个参数bool为true表示深拷贝
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      i = 2
    }

    // target不是object，不是array，不是正则，不是日期，不是function，则目标值是一个空对象。
    // typeof object,array,正则，日期 == "object"
    // typeof这个判断方法让人很揪心呐
    // 确定被拷贝对象是个{}类型
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {}
    }

    // 确定被拷贝对象是个{}类型，自己写的
    //    var targetType = jQuery.type(target);
    //    var targetType_arr = ["object","function","array","date","regexp"];
    //    if(targetType_arr.indexOf(targetType) == -1){
    //        target = {};
    //    }

    // 只有一个参数传入，目标值是jQuery函数自己，或者jQuery对象。看谁调用了。
    if (length === i) {
      target = this
      --i
    }

    // 开始遍历复制
    for (; i < length; i++) {
      // 不是null或undefined的参数才可以，要知道null == undefined是true
      if ((options = arguments[i]) != null) {
        for (name in options) {
          // 拿到老，新同个key对应的value值
          src = target[name]
          copy = options[name]

          // 防止循环引用
          // 当拷贝值是被拷贝的对象，跳出循环
          if (target === copy) {
            continue
          }

          // 深拷贝，拷贝值非undefined，是普通对象或者是数组
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              // 确定一下 被拷贝值也是个数组
              clone = src && jQuery.isArray(src) ? src : []
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {}
            }

            // 递归调用
            target[name] = jQuery.extend(deep, clone, copy)

            // 只要不是undefined，就可以赋值
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    // 返回被拷贝的对象
    return target
  }

  // jQuery的类方法
  jQuery.extend({
    type: function (obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    },
    isArray: Array.isArray,
    isNumeric: function (obj) {
      // 不是无穷，不是NaN就是数字
      return !isNaN(parseFloat(obj)) && isFinite(obj)
    },
    isPlainObject: function (obj) {
      // 普通对象不是DOM节点 或者 不是window对象 或者 是'object'
      if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false
      }

      // 当然类似window.location这种对象也不是普通对象，因为它不是来自Object
      // 一切普通对象来自Object。而Object.prototype.isPrototypeOf存在
      if (obj.constructor &&
        !Object.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false
      }

      return true
    },
    isEmptyObject: function (obj) {
      var name
      for (name in obj) {
        return false
      }
      return true
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function'
    },
    isWindow: function (obj) {
      // window对象里面有window属性
      return obj != null && obj === obj.window
    }

  })

  // jQuery的实例方法
  jQuery.fn.extend({
    css: function () {
      alert('css')
    }
  })

  // 模块化和挂载
  (function () {
    // CMD
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
      module.exports = jQuery
    } else {
      // AMD
      if (typeof define === 'function' && define.amd) {
        define('jquery', [], function () {
          return jQuery
        })
      }
    }

    // 挂载全局变量
    if (typeof window === 'object' && typeof window.document === 'object') {
      window.jQuery = window.$ = jQuery
    }
  })()
})()

var arr = jQuery.extend({}, {
  'c': [5, 6]
})
console.log(arr)

var a = jQuery.type(999)
alert(a)