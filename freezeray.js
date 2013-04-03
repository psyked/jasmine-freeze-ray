function freeze(obj, prefix){
	if(obj){
		for(var key in obj){
			if (obj.hasOwnProperty(key)) {
				var stringRep;
				if($.isArray(obj)){
					stringRep = prefix + '[' + key +']';
				} else {
					stringRep = prefix + key;
				}
				if(key.indexOf("jQuery") === -1){
					if($.isArray(obj)){
						console.log('expects(typeof(' + stringRep + ')).toBe("' + typeof(obj[key]) + '")');
					} else {
						console.log('expects(typeof(' + stringRep + ')).toBe("' + typeof(obj[key]) + '")');
					}
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							if($.isArray(obj[key])){
								freeze(obj[key], stringRep);
							} else {
								freeze(obj[key], stringRep + '.');
							}
						} else if(typeof(obj[key]) === "string"){
							console.log('expects(' + stringRep + ').toBe("' + obj[key] + '")');
						} else if(typeof(obj[key]) === "number"){
							console.log('expects(' + stringRep + ').toBe(' + obj[key] + ')');
						}
					}
				}
			}
		}
	}
}
freeze(standaloneInstance, 'instance.');