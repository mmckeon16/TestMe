var register = function(Handlebars) {
    var helpers = {
    iff: function(a, operator, b, opts) {
        switch(operator) {
	       case '==':
	           bool = a == b;
	           break;
	       case '>':
	           bool = a > b;
	           break;
	       case '<':
	           bool = a < b;
	           break;
	       default:
	           throw "Unknown operator " + operator;
	    }
	 
	    if (bool) {
	        return opts.fn(this);
	    } else {
	        return opts.inverse(this);
	    }
    }
};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}

};

module.exports.register = register;
module.exports.helpers = register(null); 