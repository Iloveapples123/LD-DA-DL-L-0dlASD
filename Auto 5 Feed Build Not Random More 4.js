// ==UserScript==
// @name         Auto 5 Feed Build Not Random More 4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto 5 Feed Build Not Random More 4
// @author       You
// @match        https://arras.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arras.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const keyCodes = [13, 32, 72, 73, 89]; // 13: Enter, 32: Spacebar, 72: H, 73: I, 89: Y
    const alwaysSelectedKey = 65; // Key code for 'a'
    const upgradeKeys = [83, 87, 68, 0]; // Change these to the key codes you want for upgrade (S, W, D, F)
    const numberKeys = [55, 55, 55, 55, 55, 56, 56, 52, 53, 54, 57, 52, 53, 54, 53, 54, 53, 54, 53, 53, 51, 51, 51, 51, 49, 50, 50, 49]; // Numbers: 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 9, 1, 2, 2, 1

    async function pressKeyWithDelay(keyCode, delay) {
        await new Promise(resolve => setTimeout(resolve, delay));
        window.keydown({ isTrusted: true, keyCode: keyCode });
    }

    window.keydown = function() {}

    window.addEventListener = new Proxy(window.addEventListener, {
        apply: function(a, b, c) {
            if (c[0] === 'keydown') {
                window.keydown = c[1];
            }
            return Reflect.apply(a, b, c);
        }
    });

    window.start = async function() {
        while (true) {
            window.keydown({ isTrusted: true, keyCode: 13 }); // Press Enter key

            // Always press 'a' key first
            window.keydown({ isTrusted: true, keyCode: alwaysSelectedKey });

            // Press 'h', 'i', 'y' keys
            window.keydown({ isTrusted: true, keyCode: 72 }); // Press 'h' key
            window.keydown({ isTrusted: true, keyCode: 73 }); // Press 'i' key
            window.keydown({ isTrusted: true, keyCode: 89 }); // Press 'y' key

            // Wait for a short delay before upgrading
            await new Promise(resolve => setTimeout(resolve, 500));

            // Select 2 keys randomly from upgradeKeys
            const shuffledUpgradeKeys = [...upgradeKeys].sort(() => Math.random() - 0.5).slice(0, 2);

            for (let i = 0; i < shuffledUpgradeKeys.length; i++) {
                await pressKeyWithDelay(shuffledUpgradeKeys[i], 1000); // 1-second delay and upgrade key press
            }

            // Wait for another short delay before moving
            await new Promise(resolve => setTimeout(resolve, 500));

            // Press specific number keys with a delay
            for (let i = 0; i < numberKeys.length; i++) {
                await pressKeyWithDelay(numberKeys[i], 5);
            }

            // Press '7' key three more times
            for (let i = 0; i < 3; i++) {
                await pressKeyWithDelay(55, 5);
            }

            // Press '8' key three more times
            for (let i = 0; i < 3; i++) {
                await pressKeyWithDelay(56, 5);
            }

            await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (12500 - 2250 + 1)) + 2250)); // Adjusted interval range
        }
    }
})();
