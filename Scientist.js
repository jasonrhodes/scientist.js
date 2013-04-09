var Scientist = function (analytics) {
    
    this.analytics = analytics || window._gaq || [];

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
    };

    this.Event = function (category, action) {
        this.category = category;
        this.action = action;
    };

    this.Event.prototype.track = function (params) {
        var category = params.category || this.category;
        var category = params.action || this.action;

        // console.log([category, action, params.label, params.value, params.noninteraction]);
        analytics.push([category, action, params.label, params.value, params.noninteraction]);

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
 * MINIFIED VERSION
 */
var Scientist=function(a){var a=a||window._gaq||[];this.initialize=function(b){a.push(["_setAccount",b]);var c=document.createElement("script");c.type="text/javascript",c.async=!0,c.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var d=document.getElementsByTagName("script")[0];return d.parentNode.insertBefore(c,d),this},this.trackPageview=function(){return a.push(["_trackPageview"]),this},this.Event=function(a,b){this.category=a,this.action=b},this.Event.prototype.track=function(b){var c=b.category||this.category,c=b.action||this.action;return a.push([c,action,b.label,b.value,b.noninteraction]),this},this.Events={},this.Events.Registry={},this.Events.register=function(a,b,c){this.Events.Registry[a]=new Tools.Event(b,c)},this.Events.track=function(a,b){this.Events.Registry[a].track(b)},this.trackEvent=function(a){var b=new this.Event(a.category);b.track(a)}};


/**
 * Create the Scientist analytics object
 * 
 * Pass nothing to default to the standard global _gaq, or 
 * pass in the GA object if it's named differently.
 *
 * If you haven't initialized GA yet, leave it blank and
 * call scientist.initialize() with your UA string later.
 */

var scientist = new Scientist();


/**
 * To set up Google Analytics
 */

scientist.initialize("UA-XXXX");


/**
 * To track a pageview
 */

scientist.trackPageview();


/**
 * Init and track pageview at once, per usual
 */

scientist.initialize("UA-XXXX").trackPageview();


/**
 * To register and track events
 */

// Option 1: Directly
$(".thingy").on("click", function (e) {
    scientist.trackEvent("my category", "my action", "my label", "my value");
})

// Option 2: Register your own event, track it later
var myEvent = new scientist.Event("my category", "my action");

$(".thingy-1").on("click", function (e) {
    myEvent.track("my label", "my value");
});

$(".thingy-2").on("change", function (e) {
    myEvent.track("other label", "other value");
});

// Option 3: Register events to the GATools.Events object
scientist.Events.register("My Event", "my category 1", "my action 1");
scientist.Events.register("Other Event", "other category 2", "other action 2");

$(".thingy-1").on("click", function (e) {
    scientist.Events.track("My Event", "my label", "my value");
});

$(".thingy-2").on("change", function (e) {
    scientist.Events.track("Other Event", "other label", "other value");
});