# function hook

[![Build Status](https://travis-ci.org/bloodyowl/functionhook.svg)](https://travis-ci.org/bloodyowl/functionhook)

[![browser support](https://ci.testling.com/bloodyowl/functionhook.png)](https://ci.testling.com/bloodyowl/functionhook)

## install

```sh
$ npm install bloody-functionhook
```

## require

```javascript
var hook = require("bloody-functionhook")
```

## api

### `hook(object, propertyName) > notifier`

replaces `object[propertyName]` by the hook function, and returns a `notifier`.

#### notifier

##### `notifier.on(event, cb)`

- `"arguments"` fires when the arguments are accessible to the hook function
- `"error"` fires if an error occurred
- `"call"` fires when the function is called
- `"return"` fires when the function has a result

#### `notifier.count` (int)

the times the function was called

#### `notifier.emit("destroy")`

removes the hook

## example

```javascript
var view = cornea.extend({
  getInitialData : function(){
    return {
      foo : ""
    }
  },
  template : function(data){
    return "<div></div>"
  }
})

var notifier = hook(view, "template")
var data = {
  foo : "bar"
}
notifier.on("arguments", function(args){
  test.equal(args[0], data, "data is passed")
  test.end()
})
view.update(data)
```
