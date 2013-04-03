function freeze(obj, prefix){
	if(obj){
		for(var key in obj){
			if (obj.hasOwnProperty(key)) {
				console.log('expects(typeof(' + prefix + key + ')).toBe("' + typeof(obj[key]) + '")');
				if(obj[key] && !obj[key].jquery && typeof(obj[key]) === "object"){
					//console.log('expects(typeof(' + key + ')).toBe("object")');
					freeze(obj[key], prefix + key + '.');
				}
			}
		}
	}
}
freeze(standaloneInstance, 'instance.');