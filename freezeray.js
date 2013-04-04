function freeze_ray(obj, prefix){
	var output = "";
	if(obj && prefix){
		output += 'describe("tests the ' + prefix + ' object", function() {\n';
		for(var key in obj){
			if (obj.hasOwnProperty(key)) {
				var stringRep;
				if($.isArray(obj)){
					stringRep = prefix + '[' + key +']';
				} else {
					stringRep = prefix + '.' + key;
				}
				if(key.indexOf("jQuery") === -1){
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							if($.isArray(obj[key])){
								output += freeze(obj[key], stringRep);
							} else {
								output += freeze(obj[key], stringRep);
							}
						} else if(typeof(obj[key]) === "string"){
							output += '\texpects(' + stringRep + ').toBe("' + obj[key] + '");\n';
						} else if(typeof(obj[key]) === "number"){
							output += '\texpects(' + stringRep + ').toBe(' + obj[key] + ');\n';
						}
					}
				}
			}
		}
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
					output += '\t\texpects(typeof(' + stringRep + ')).toBe("' + typeof(obj[key]) + '");\n';
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							queue.push([obj[key], stringRep]);
						} else if(typeof(obj[key]) === "string"){
							output += '\t\texpects(' + stringRep + ').toBe("' + obj[key] + '");\n';
						} else if(typeof(obj[key]) === "number"){
							output += '\t\texpects(' + stringRep + ').toBe(' + obj[key] + ');\n';
						} else if(typeof(obj[key]) === "function"){
							queue.push([obj[key], stringRep, true]);
						}
					}
				}
			}
		}
		if(stub === true){
			output += "\t//\t test stub\n\t//";
		}
		output += '\t});\n\n';
		if(queue.length){
			var next = queue.shift();
			output += freeze(next[0], next[1], next[2]);
		}
	}
	return output;
}