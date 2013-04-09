/**
 * Scientist.js
 *
 * A small helper library for working with Google Analytics.
 *
 * @author Jason Rhodes
 * @version 0.1
 *
 */
var Scientist = function (analytics) {
    
    this.analytics = analytics || window._gaq || [];

    this.initialize = function (UA) {
        this.analytics.push(["_setAccount", UA]);
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

        return this;
    };

    this.trackPageview = function (category, action, label, value, noninteraction) {
        var event = new this.Event(category);
        event.track({ action: action, label: label, value: value, noninteraction: noninteraction });
        return this;
    };

    this.Event = function (category, action) {
        this.category = category;
        this.action = action;
    };

    this.Event.prototype.track = function (params) {
        var category = params.category || this.category;
        var category = params.action || this.action;

        // console.log([category, action, params.label, params.value, params.noninteraction]);
        this.analytics.push([category, action, params.label, params.value, params.noninteraction]);

        return this;
    };

    this.Events = {};
    this.Events.Registry = {};

    this.Events.register = function (name, category, action) {
        this.Events.Registry[name] = new Tools.Event(category, action);
    };

    this.Events.track = function (name, params) {
        this.Events.Registry[name].track(params);
    };

    this.trackEvent = function (params) {
        var event = new this.Event(params.category);
        event.track(params);
    };

};
