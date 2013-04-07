var GATools = (function (analytics) {

    var Tools = {};

    Tools.init = function (UA) {
        analytics = analytics || [];
        analytics.push(["_setAccount", UA]);
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    };

    Tools.trackPageview = function () {
        analytics.push(["_trackPageview"]);
    };

    Tools.Event = function (category, action) {
        this.category = category;
        this.action = action;
    };

    Tools.Event.prototype.track = function (label, value) {
        // analytics._trackEvent()
        console.log([this.category, this.action, label, value]);
    };

    Tools.Events = {};
    Tools.Events.Registry = {};

    Tools.Events.register = function (name, category, action) {
        Tools.Events.Registry[name] = new Tools.Event(category, action);
    };

    Tools.Events.track = function (name, label, value) {
        Tools.Events.Registry[name].track(label, value);
    };

    Tools.trackEvent = function (category, action, label, value) {
        var event = new Tools.Event(category, action);
        event.track(label, value);
    };

    return Tools;

})(_gaq);



/**
 * To set up Google Analytics
 */

GATools.init("UA-XXXX");


/**
 * To track a pageview
 */

GATools.trackPageview();


/**
 * To register and track events
 */

// Option 1: Directly
$(".thingy").on("click", function (e) {
    GATools.trackEvent("my category", "my action", "my label", "my value");
})

// Option 2: Register your own event, track it later
var myEvent = new GATools.Event("my category", "my action");

$(".thingy-1").on("click", function (e) {
    myEvent.track("my label", "my value");
});

$(".thingy-2").on("change", function (e) {
    myEvent.track("other label", "other value");
});

// Option 3: Register events to the GATools.Events object
GATools.Events.register("My Event", "my category 1", "my action 1");
GATools.Events.register("Other Event", "other category 2", "other action 2");

$(".thingy-1").on("click", function (e) {
    GATools.Events.track("My Event", "my label", "my value");
});

$(".thingy-2").on("change", function (e) {
    GATools.Events.track("Other Event", "other label", "other value");
});