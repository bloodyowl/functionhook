var tape = require("tape")
var hook = require("..")

tape("test-fn", function(test){
  function fn(a, b){
    return (a + b) * 2
  }
  var object = {
    fn : fn
  }
  var notifier = hook(object, "fn")
  test.notEqual(object.fn, fn)
  notifier.on("arguments", function(args){
    test.equal(args[0], 1)
    test.equal(args[1], 2)
  })
  notifier.on("call", function(count){
    test.equal(count, 1)
  })
  notifier.on("result", function(value){
    test.equal(value, 6)
  })
  test.equal(object.fn(1, 2), 6)
  notifier.emit("destroy")
  test.equal(object.fn(2, 3), 10)
  test.equal(object.fn, fn)
  test.end()
})

tape("test-fn counter", function(test){
  var object = {
    fn : function(a, b){
      return (a + b) * 2
    }
  }
  var notifier = hook(object, "fn")
  test.equal(object.fn(2, 3), 10)
  test.equal(object.fn(2, 3), 10)
  notifier.on("call", function(count){
    test.equal(count, 3)
  })
  test.equal(object.fn(2, 3), 10)
  test.end()
})

tape("test-fn count proporty", function(test){
  var object = {
    fn : function(a, b){
      return (a + b) * 2
    }
  }
  var notifier = hook(object, "fn")
  test.equal(object.fn(2, 3), 10)
  test.equal(object.fn(2, 3), 10)
  test.equal(object.fn(2, 3), 10)
  test.equal(notifier.count, 3)
  test.end()
})

tape("test-fn length", function(test){
  var object = {
    fn : function(a, b){
      return (a + b) * 2
    }
  }
  var notifier = hook(object, "fn")
  test.equal(object.fn.length, 2)
  var object2 = {
    fn : function(a, b, c, d){
      return (a + b) * 2
    }
  }
  var notifier2 = hook(object2, "fn")
  test.equal(object2.fn.length, 4)
  var object3 = {
    fn : function(){}
  }
  var notifier3 = hook(object3, "fn")
  test.equal(object3.fn.length, 0)
  test.end()
})
