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

/**
 * MINIFIED VERSION (VIA UGLIFY.JS)
 *
 */
var Scientist=function(a){this.analytics=a||window._gaq||[],this.initialize=function(a){this.analytics.push(["_setAccount",a]);var b=document.createElement("script");b.type="text/javascript",b.async=!0,b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var c=document.getElementsByTagName("script")[0];return c.parentNode.insertBefore(b,c),this},this.trackPageview=function(a,b,c,d,e){var f=new this.Event(a);return f.track({action:b,label:c,value:d,noninteraction:e}),this},this.Event=function(a,b){this.category=a,this.action=b},this.Event.prototype.track=function(a){var b=a.category||this.category,b=a.action||this.action;return this.analytics.push([b,action,a.label,a.value,a.noninteraction]),this},this.Events={},this.Events.Registry={},this.Events.register=function(a,b,c){this.Events.Registry[a]=new Tools.Event(b,c)},this.Events.track=function(a,b){this.Events.Registry[a].track(b)},this.trackEvent=function(a){var b=new this.Event(a.category);b.track(a)}};
