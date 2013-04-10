/**
 * Scientist.js
 *
 * A small helper library for working with Google Analytics.
 *
 * @author Jason Rhodes
 * @version 0.2
 *
 */
var Scientist = function (analytics) {

    var analytics = analytics || window._gaq || [];
    var lib = this;
    
    var log = function (message) {
        window.console && window.console.log && window.console.log(message);
    };
 
    this.initialize = function (UA) {
        analytics.push(["_setAccount", UA]);
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        return this;
    };

    this.trackPageview = function () {
        analytics.push(["_trackPageview"]);
        return this;
    }
    
    this.checkAnalytics = function () {
        return analytics;
    };
 
    this.Event = function (category, action) {
        this.category = category;
        this.action = action;
    };
 
    this.Event.prototype.track = function (params) {
        var category = params.category || this.category;
        var action = params.action || this.action;
 
        //log([category, action, params.label, params.value, params.noninteraction]);
        analytics.push(["_trackEvent", category, action, params.label, params.value, params.noninteraction]);
        return this;
    };
    
    this.trackEvent = function (params) {
        var event = new this.Event();
        if (!params.category && arguments.length > 1) {
            params = {
                category: arguments[0], 
                action: arguments[1], 
                label: arguments[2], 
                value: arguments[3], 
                noninteraction: arguments[4]
            };
        }
        
        //log(params);
        event.track(params);
        return this;
    };
    
    this.Events = {};
    this.Events.Registry = {};
 
    this.Events.register = function (name, category, action) {
        this.Registry[name] = new lib.Event(category, action);
    };
 
    this.Events.track = function (name, params) {
        this.Registry[name].track(params);
    };
    
    this.prototype.spy = function (options) {
        // Much awesomeness to come
    };

};