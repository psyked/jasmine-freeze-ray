function freeze_ray(prefix){
	var obj = eval(prefix);
	var output = "";
	if(obj && prefix){
		output += '/* global */\ndescribe("tests the ' + prefix + ' object", function() {\n    "use strict";\n';
		output += freeze(prefix);
		output += '});\n';
	}
	console.log(output);
}
var queue = [];
function freeze(prefix, stub){
	var obj = eval(prefix);
	var output = "";
	if(stub === true){
		output += "\n";
	}
	if(obj && prefix){
		output += '\n';
		if(stub === true){
		        output += "\n";
	        }
		output += '\tit("checks the ' + prefix + ' ' + typeof(obj) + '", function() {\n';
		for(var key in obj){
			if (obj.hasOwnProperty(key)) {
				var stringRep;
				if($.isArray(obj)){
					stringRep = prefix + '[' + key +']';
				} else {
					stringRep = prefix + '.' + key;
				}
				if(key.indexOf("jQuery") === -1){
					output += '        expect(typeof(' + stringRep + ')).toBe("' + typeof(obj[key]) + '");\n';
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							queue.push([obj[key], stringRep]);
						} else if(typeof(obj[key]) === "string"){
							output += '        expect(' + stringRep + ').toBe("' + obj[key] + '");\n';
						} else if(typeof(obj[key]) === "number"){
							output += '        expect(' + stringRep + ').toBe(' + obj[key] + ');\n';
						} else if(typeof(obj[key]) === "function"){
							queue.push([obj[key], stringRep, true]);
						}
					}
				}
			}
		}
		if(stub === true){
			output += "        // arrange\n\n        // act\n\n        // assert\n\n";
		}
		output += '\t});\n';
		if(queue.length){
			var next = queue.shift();
			output += freeze(next[1], next[2]);
		}
	}
	return output;
}
