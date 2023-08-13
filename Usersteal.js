// ==UserScript==
// @name         Username stealer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://arras.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arras.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.keydown = function() {}
    window.addEventListener = new Proxy(window.addEventListener, { apply:function(a, b, c) {
        if(c[0] === 'keydown') {
            window.keydown = c[1]
        }
        return Reflect.apply(a, b, c)
    } })
    let index = 0
    window.start = function() {
        setInterval(function() {
            index ++
            if(index > 2) { index = 0 }
            window.keydown({ isTrusted:true, keyCode:[13, 65, 87][index] })
        }, 100)
    }
    window.saved = []
    CanvasRenderingContext2D.prototype.strokeText = new Proxy(CanvasRenderingContext2D.prototype.strokeText, { apply:function(a, b, c) {
        let text = c[0]
        if(text && text.indexOf(' - ') < 0) {
            for(let i=text.length-1;i--;i>=0) {
                let char = text[i]
                if('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}\|;:,./<>?`~"\'\\ '.indexOf(char) < 0) {
                    if(window.saved.indexOf(text) < 0) {
                        window.saved.push(text)
                    }
                    console.log(text)
                    window.parent.saved = window.saved
                    return Reflect.apply(a, b, c)
                }
            }
        }
        return Reflect.apply(a, b, c)
    } })
})();
