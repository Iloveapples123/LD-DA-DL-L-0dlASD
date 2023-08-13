// ==UserScript==
// @name         Console Command Trigger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Wait for the '%' key press and then execute 'start()' in the console.
// @author       You
// @match        https://arras.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isTriggered = false;

    function triggerStart() {
        if (!isTriggered) {
            console.log("Triggering 'start()'...");
            isTriggered = true;
            // Execute 'start()' in the console
            eval('start()');
        }
    }

    // Listen for key press event
    window.addEventListener('keydown', function(event) {
        if (event.key === '%' && !event.repeat) {
            triggerStart();
        }
    });
})();
