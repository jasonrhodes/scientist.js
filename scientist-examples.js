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
var myEvent = new scientist.Event("my category");

$(".thingy-1").on("click", function (e) {
    myEvent.track({ action: "my action", label: "my label", value: 100 });
});

$(".thingy-2").on("change", function (e) {
    myEvent.track({ action: "my other action", label: "other label", value: 200 });
});

// Option 3: Register events to the Event registry for later reuse
scientist.Events.register("My Event", "my category 1");
scientist.Events.register("Other Event", "other category 2");

$(".thingy-1").on("click", function (e) {
    scientist.Events.track("My Event", { action: "Clicked button", label: "Title Of My Button" });
});

$(".thingy-2").on("change", function (e) {
    scientist.Events.track("Other Event", { action: "Submitted form", value: 120 });
});
