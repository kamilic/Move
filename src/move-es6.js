;(function (factory) {
    let registeredInModuleLoader = false;
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
        let loop = true,
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
            this.data = aniData;
            if (aniData.isCanvas) {
                if (aniData.context instanceof CanvasRenderingContext2D) {
                    if (aniData.onClear) {
                        console.warn("Your onClear callback is " + aniData.onClear + ".\n" +
                            "Program will replace it with default clear function.\n" +
                            "If the effect of default function don't meet your expectation, please define your own onClear callback.");
                    }
                    this.data.onClear = onClear.bind(aniData.context);
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
         * @desc A default onClear function, to reset the canvas in order to prepare for next rendering.
         * @param data
         */
        function onClear(data) {
            let canvas = data.context.canvas;
            canvas.width = canvas.width;
        }

        function animate() {
            if (loop === true) {
                let len = animationQueue.length;
                for (let i = 0; i < len; i++) {
                    let aniObj = animationQueue.shift(),
                        data = aniObj.data;
                    if (aniObj._over) {
                        continue;
                    }
                    if (data.onFrameStart) data.onFrameStart.call(aniObj, data);
                    data.onUpdate.call(aniObj, data);
                    if (data.isCanvas) data.onClear.call(aniObj, data);
                    if (data.onRender) data.onRender.call(aniObj, data);
                    if (data.onFrameEnd) data.onFrameEnd.call(aniObj, data);
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
