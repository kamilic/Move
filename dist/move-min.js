!function(a){var b=!1;"function"==typeof define&&define.amd&&(define(a),b=!0),"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&(module.exports=a(),b=!0),b||(window.Move=a())}(function(){function a(a){"use strict";if(a=a||{},a.isCanvas=a.isCanvas||!1,this._data=a,a.isCanvas){if(!(a.context instanceof CanvasRenderingContext2D))throw Error("AniObj : the type of aniData isn't CanvasRenderingContext2D.");a.onClear&&console.warn("Your onClear callback is "+a.onClear+".\nProgram will replace it with default clear function.\nIf the effect of default function don't meet your expectation, please define your own onClear callback."),this._data.onClear=b.bind(a.context)}if(!a.onUpdate)throw Error("AniObj : You should register callback onUpdate,otherwise animation can't be run.");if(!a.onRender)throw Error("AniObj : You should register callback onRender,otherwise animation can't be run.")}function b(a){var b=a.context.canvas;b.width=b.width}function c(){if(!0===f){for(var a=h.length,b=0;b<a;b++){var d=h.shift(),e=d._data;d._over||(e.onFrameStart&&e.onFrameStart.call(d),e.onUpdate.call(d),e.isCanvas&&e.onClear.call(d),e.onRender&&e.onRender.call(d),e.onFrameEnd&&e.onFrameEnd.call(d),h.push(d))}i?requestAnimationFrame(c):setInterval(c,j)}}function d(){f=!1,g=!1}function e(){g?console.log("animation is running.."):(f=!0,g=!0,c())}var f=!0,g=!1,h=[],i="function"==typeof window.requestAnimationFrame,j=16;return a.prototype.animate=function(){h.push(this),this._over=!1},a.prototype.stopAnimation=function(){this._over=!0},{animateAll:e,stopAllAnimation:d,AniObj:a}});