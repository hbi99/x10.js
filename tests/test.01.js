
var x10 = require('..');

var test = function(len) {
	while (len--) {}
	return len;
};

var t2 = x10.compile(test);

