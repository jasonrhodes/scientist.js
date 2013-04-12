ScientistJS
============

A small (and lightweight!) helper library for working with Google Analytics.


## Installation

We've registered ScientistJS on [Bower](http://twitter.github.io/bower/). If you use Bower for package management, it's easy to install.

```bash
$ bower install scientist.js
```

Otherwise, just download the `scientist.js` and `scientist.min.js` files for your project.


## Usage

We built Scientist because working with Google Analytics is kind of annoying. Here's how to use it.

### Add Google Analytics to your page

```javascript
var scientist = new Scientist();
scientist.initialize("UA-XXXXXXXX");
```

This adds the async code to the page. If you want to keep the async code in the `<head>` of your document but keep all of your application code together at the bottom of the document, or if you have special Google Analytics variables to append to the async code, just include your own async code block anywhere before Scientist gets defined.

When you create the scientist object, it will look in the global scope for the `_gaq` variable. If it finds it, it will use it, but if you've named your GA object something different, pass the object into the Scientist 'constructor'. 

```javascript
var scientist = new Scientist(myAnalyticsObject);
```

### Track a pageview

```javascript
scientist.trackPageview();

// Or if you're calling .initialize(), you can chain
scientist.initialize("UA-XXXXXXXX").trackPageview();
```

### Track events

This is the main reason we created Scientist, so that we can easily track tons of things on our pgaes. The best way to handle this is to register events and then track them in onclick, etc.

```javascript
// Register a video event type
scientist.Events.register("Video", "Media:Video");

// Track video event on click
$(".some-class").on("click", function (e) {
    scientist.Events.track("Video", { action: "play", label: $(this).attr("data-title") }); // => Will track an event with a 'Media:Video' category and the passed in attributes.
});
```

### Spy or monitor or observe  
