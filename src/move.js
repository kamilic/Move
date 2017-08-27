;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        window.Move = factory();
    }
})(function () {

    /** @param loop {boolean}  global animation switch.
     *  @param isAnimationRunning A notation to indicate whether animation is running now.
     */
    var loop = true,
        isAnimationRunning = false,
        animationQueue = [],
        isAnimationFrameSupported = (typeof window.requestAnimationFrame === "function"),
        interval = 16;

    /** all aniData
     *  {
         *      isCanvas : boolean, // required,
         *      context :  CanvasRenderingContext2D // if isCanvas = true, context is required.
         *      onClear : function,  // if isCanvas = true, required.
         *      onUpdate : function, // required
         *      onRender : function,  // required
         *      onFrameStart : function // optional
         *      onFrameEnd : function // optional
         *  }
     */

    /**
     * @param aniData
     * @constructor
     */
    function AniObj(aniData) {
        "use strict";
        aniData = aniData || {};
        aniData.isCanvas = aniData.isCanvas || false;
        this._data = aniData;
        // expose some useful params
        this.context = this._data.context;
        this.data = aniData.data || {};
        if (aniData.isCanvas) {
            if (aniData.context instanceof CanvasRenderingContext2D) {
                if (aniData.onClear) {
                    console.warn("Your onClear callback is " + aniData.onClear + ".\n" +
                        "Program will replace it with default clear function.\n" +
                        "If the effect of default function don't meet your expectation, please define your own onClear callback.");
                }
                this._data.onClear = onClear.bind(aniData.context);
            } else {
                throw Error("AniObj : the type of aniData isn't CanvasRenderingContext2D.");
            }
        }
        if (!aniData.onUpdate) {
            throw Error("AniObj : You should register callback onUpdate,otherwise animation can't be run.");
        }
        if (!aniData.onRender) {
            throw Error("AniObj : You should register callback onRender,otherwise animation can't be run.");
        }
    }

    /**
     * @method animate
     * @desc Pushing Aniobj to a queue.
     */
    AniObj.prototype.animate = function () {
        animationQueue.push(this);
        this._over = false;
    };
    /**
     * @method stopAnimation
     */
    AniObj.prototype.stopAnimation = function () {
        this._over = true;
    };

    /**
     * @function onClear
     * @desc A default onClear function, to reset the canvas in order to prepare for next rendering.this
     */
    function onClear() {
        var canvas = this.canvas;
        canvas.width = canvas.width;
    }

    function animate() {
        if (loop === true) {
            var len = animationQueue.length;
            for (var i = 0; i < len; i++) {
                var aniObj = animationQueue.shift(),
                    _data = aniObj._data;
                var data = aniObj.data;
                if (aniObj._over) {
                    continue;
                }
                if (_data.onFrameStart) _data.onFrameStart.call(aniObj, data);
                _data.onUpdate.call(aniObj, data);
                if (_data.isCanvas) _data.onClear.call(aniObj, data);
                if (_data.onRender) _data.onRender.call(aniObj, data);
                if (_data.onFrameEnd) _data.onFrameEnd.call(aniObj, data);
                animationQueue.push(aniObj);
            }
            if (isAnimationFrameSupported) {
                requestAnimationFrame(animate);
            } else {
                setInterval(animate, interval);
            }
        }
    }

    function stopAnimation() {
        loop = false;
        isAnimationRunning = false;
    }

    function ani() {
        if (isAnimationRunning) {
            console.log("animation is running..");
        } else {
            loop = true;
            isAnimationRunning = true;
            animate();
        }
    }

    return {
        animateAll: ani,
        stopAllAnimation: stopAnimation,
        AniObj: AniObj
    };
});
