(function() {
    "use strict";
    var min,max;
    chrome.storage.sync.get({
        min: 0,
        max: 60000
    }, function(items) {
        setTimeout(glitch, Math.random() * items.min + (items.max-items.min));
    });

    function col() {
        return '#' + (Math.random() * 100).toString(16).slice(-3)
    }

    function glitch() {
        var n = Math.floor(Math.random() * 4 + 4);
        (function spazz() {
            [].forEach.call(document.all, function(el) {
                el.style.color = col();
                el.style.backgroundColor = col();
            });
            if (!--n) {
                return finish();
            }
            setTimeout(spazz, 3);
        }());
    }

    function finish() {
        [].forEach.call(document.all, function(el) {
            el.style.color = '';
            el.style.backgroundColor = '';
        });
        // this seems like such a stupid way to get the data. ohh well, looks like it doens't work anyways.
        chrome.storage.sync.get({
            min: 0,
            max: 60000
        }, function(items) {
            setTimeout(glitch, Math.random() * items.min + (items.max-items.min));
        });
    }
}());