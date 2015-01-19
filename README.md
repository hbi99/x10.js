# x10.js
Web worker wrapper with simple interface

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
