/**
 * Created by x on 2016/10/25.
 */
/**
 * Created by x on 2016/10/23.
 */
var Move = (function () {

    /* all aniData
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

    /* @var loop global animation switch.
     * @var isAnimationRunning A notation to indicate whether animation is running now.
     */
    var loop = true,
        isAnimationRunning = false,
        animationQueue = [],
        isSupport = (typeof window.requestAnimationFrame === "function"),
        interval = 16;

    function AniObj(aniData) {
        "use strict";
        aniData = aniData || {};
        aniData.isCanvas = aniData.isCanvas || false;
        this.data = aniData;
        if(aniData.isCanvas) {
            if (aniData.context instanceof CanvasRenderingContext2D) {
                if (aniData.onClear) {
                    console.warn("Your onClear callback is " + aniData.onClear + ".\n" +
                        "Program will replace it with default clear function.\n" +
                        "If the effect of default function don't meet your expectation, please define your own onClear callback.");
                }
                this.data.onClear = onClear.bind(aniData.context);
            }else{
                throw Error("AniObj : the type of aniData isn't CanvasRenderingContext2D.");
            }

        }
        if (!aniData.onUpdate) {
            throw Error("AniObj : You should register callback onUpdate,otherwise animation can't be run.");
        }
        if (!aniData.onRender) {
            throw Error("AniObj : You should register callback onRender,otherwise animation can't be run.");
        }
        //Object.freeze(this);
    }
    AniObj.prototype.animate = function () {
        animationQueue.push(this);
        this._over = false;
    };
    AniObj.prototype.stopAnimation = function () {
        var index = animationQueue.indexOf(this);
        this._over = true;
    };


    function onClear() {
        var canvas = this.canvas;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function animate() {
        if (loop === true) {
            var len = animationQueue.length;
            for (var i = 0; i < len; i++) {
                var aniObj = animationQueue.shift(),
                    data = aniObj.data;
                if (aniObj._over) {
                    continue;
                }
                if (data.onFrameStart) data.onFrameStart.call(aniObj, data);
                data.onUpdate.call(aniObj, data);
                if(data.isCanvas) data.onClear.call(aniObj,data);
                if(data.onRender) data.onRender.call(aniObj,data);
                if (data.onFrameEnd) data.onFrameEnd.call(aniObj, data);
                animationQueue.push(aniObj);
            }
            if(isSupport){
                requestAnimationFrame(animate);
            }else{
                setInterval(animate,interval);
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
})();
