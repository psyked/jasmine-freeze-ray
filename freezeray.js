function freeze_ray(obj, prefix){
	var output = "";
	if(obj && prefix){
		output += '/* globals */\ndescribe("tests the ' + prefix + ' object", function() {\n\t"use strict";\n';
		output += freeze(obj, prefix);
		output += '});\n';
	}
	console.log(output);
}
var queue = [];
function freeze(obj, prefix, stub){
	var output = "";
	if(stub === true){
		output += "\t//";
	}
	if(obj && prefix){
		output += '\n';
		if(stub === true){
		        output += "\t//";
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
					output += '\t\texpect(typeof(' + stringRep + ')).toBe("' + typeof(obj[key]) + '");\n';
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							queue.push([obj[key], stringRep]);
						} else if(typeof(obj[key]) === "string"){
							output += '\t\texpect(' + stringRep + ').toBe("' + obj[key] + '");\n';
						} else if(typeof(obj[key]) === "number"){
							output += '\t\texpect(' + stringRep + ').toBe(' + obj[key] + ');\n';
						} else if(typeof(obj[key]) === "function"){
							queue.push([obj[key], stringRep, true]);
						}
					}
				}
			}
		}
		if(stub === true){
			output += "\t//\t\t// test stub\n\t//";
		}
		output += '\t});\n';
		if(queue.length){
			var next = queue.shift();
			output += freeze(next[0], next[1], next[2]);
		}
	}
	return output;
}
