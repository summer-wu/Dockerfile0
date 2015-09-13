//casperjs-1.1.0beta3/modules/casper.js
Casper.prototype.evaluate = function evaluate(fn, context) {
    "use strict";
    this.checkStarted();
    // check whether javascript is enabled !!
    if (this.options.pageSettings.javascriptEnabled === false) {
        throw new CasperError("evaluate() requires javascript to be enabled");
    }
    // preliminary checks
    if (!utils.isFunction(fn) && !utils.isString(fn)) { // phantomjs allows functions defs as string
        throw new CasperError("evaluate() only accepts functions or strings");
    }
    // ensure client utils are always injected
    this.injectClientUtils();
    // function context
    if (arguments.length === 1) {
        return utils.clone(this.page.evaluate(fn)); //!!!
    } else if (arguments.length === 2) {
        // check for closure signature if it matches context
        if (utils.isObject(context) && eval(fn).length === Object.keys(context).length) {
            context = utils.objectValues(context);
        } else {
            context = [context];
        }
    } else {
        // phantomjs-style signature
        context = [].slice.call(arguments, 1);
    }
    return utils.clone(this.page.evaluate.apply(this.page, [fn].concat(context)));
};

//modules/webpage.js(phantomjs中)
  page.evaluate = function (func, args) {
        var str, arg, argType, i, l;
        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
            throw "Wrong use of WebPage#evaluate";
        }
        str = 'function() { return (' + func.toString() + ')(';
        for (i = 1, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            argType = detectType(arg);

            switch (argType) {
            case "object":      //< for type "object"
            case "array":       //< for type "array"
            case "date":        //< for type "date"
                str += "JSON.parse(" + JSON.stringify(JSON.stringify(arg)) + "),"
                break;
            case "string":      //< for type "string"
                str += quoteString(arg) + ',';
                break;
            default:            // for types: "null", "number", "function", "regexp", "undefined"
                str += arg + ',';
                break;
            }
        }
        str = str.replace(/,$/, '') + '); }';
        return this.evaluateJavaScript(str);
    };

