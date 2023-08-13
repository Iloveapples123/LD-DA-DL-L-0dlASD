// ==UserScript==
// @name         feeding script start with ^
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://arras.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arras.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const keyCodes = [13, 65, 83, 68, 87, 32]; // 13: Enter, 65: A, 83: S, 68: D, 87: W, 32: Spacebar
    let scriptRunning = false;

    // Fisher-Yates shuffle algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let keyCodeIndex = 0;

    window.keydown = function() {}

    window.addEventListener = new Proxy(window.addEventListener, {
        apply: function(a, b, c) {
            if (c[0] === 'keydown') {
                window.keydown = c[1];
            }
            return Reflect.apply(a, b, c);
        }
    });

    function startScript() {
        if (scriptRunning) return;

        setInterval(function() {
            const selectedKeys = keyCodes.filter(keyCode => keyCode !== 13);
            shuffle(selectedKeys);
            keyCodeIndex = 0;
            const randomInterval = getRandomInterval(10, 6500); // Adjusted interval range
            window.keydown({ isTrusted: true, keyCode: 13 }); // Press Enter key
            window.keydown({ isTrusted: true, keyCode: selectedKeys[keyCodeIndex] }); // Press a randomly selected key
            window.keydown({ isTrusted: true, keyCode: selectedKeys[(keyCodeIndex + 1) % selectedKeys.length] }); // Press another randomly selected key
        }, getRandomInterval(10, 6500)); // Adjusted interval range

        scriptRunning = true;
    }

    function stopScript() {
        scriptRunning = false;
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === '^') {
            if (scriptRunning) {
                stopScript();
            } else {
                startScript();
            }
        }
    });
})();
