function freeze(obj, prefix){
	if(obj){
		for(var key in obj){
			if (obj.hasOwnProperty(key)) {
				if(key.indexOf("jQuery") === -1){
					console.log('expects(typeof(' + prefix + key + ')).toBe("' + typeof(obj[key]) + '")');
					if(obj[key] && !obj[key].jquery){
						if(typeof(obj[key]) === "object"){
							freeze(obj[key], prefix + key + '.');
						} else if(typeof(obj[key]) === "string"){
							console.log('expects(' + prefix + key + ').toBe("' + obj[key] + '")');
						} else if(typeof(obj[key]) === "number"){
							console.log('expects(' + prefix + key + ').toBe(' + obj[key] + ')');
						}
					}
				}
			}
		}
	}
}
freeze(standaloneInstance, 'instance.');