# x10.js
Using __x10.js__, long-running scripts can run in a dedicated thread and thereby have a non-blocking effect on the UI-thread. In Firefox and Safari, scripts in the dedicated thread runs even faster than in UI-thread (in some cases, ten times faster).

The interface of __x10.js__ is very easy and migrating to / from __x10.js__ have minimal impact on your code.

```js
var obj = {
		loop: function(len) {
			while (len--) {}
		}
	};

// UI thread IS blocked when executing this
var start = Date.now();
obj.loop(100000000);
console.log( Date.now() - start );
// 990 milliseconds



// compile the object with 'x10.js'
var task = x10.compile(obj);

// worker thread - UI thread is NOT blocked when executing this
start = Date.now();
task.loop(100000000, function() {
	console.log( Date.now() - start );
	// 146 milliseconds
});
```
