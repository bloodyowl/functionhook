var events = require("bloody-events")

module.exports = function(thisValue, name){
  var notifier = events
    .extend({
      count : 0
    })
    .create()
  var cb = thisValue[name]
  var length = cb.length
  var args = []
  var index = -1
  var fn = function(){
    var value
    notifier.emit("arguments", arguments)
    notifier.emit("call", ++notifier.count)
    try {
      value = cb.apply(this, arguments)
    } catch(e) {
      notifier.emit("error", e)
      throw e
    }
    notifier.emit("return", value)
    return value
  }
  while(++index < length) {
    args.push(String.fromCharCode(97 + index))
  }
  thisValue[name] = Function.call(
    null,
    "fn",
    "return function(" + args.join(",") + "){return fn.apply(this, arguments)}"
  )(fn)
  notifier.on("destroy", function(){
    thisValue[name] = cb
  })
  return notifier
}
