Move
----
概括动画逻辑的简单框架，通过几个回调函数来完成动画效果。
用于学习动画最基本的框架，我觉得是一个很好的选择。  
**我能将它用于什么地方**  
-DOM动画操作
-Canvas动画操作
-纯粹数据随时间的变换

####用法
######一个简单的栗子
```javascript
new Move.AniObj({
        // user vars //
        count : 1,
        // required function //
        onUpdate : function(data){
           data.count ++;
        },
        onRender : function(data){
            console.log("count : " + data.count);
        }
    }).animate();
    Move.animateAll();
    // console 会大约以16ms的间隔log一次,
    // 当然如果在onUpdate与onRender上运行太长时间就会造成动画卡顿的问题。
```

######移动一个DIV

```html
<div id="block" style="width: 50px;height: 50px; background-color: royalblue; position: absolute;"> </div>
```

```javascript
new Move.AniObj({
        // user vars //
        src : 0,
        dest : 500,
        start : Date.now(),
        timeMethod : function(now,data){
            return (now-data.start)/data.last;
            //给出时间百分比,是一个线性动画,当然你也可以用如Bezier函数来做ease-in/out的动画
        },
        last : 3000,
        dom : block,
        // required function //
        onUpdate : function(data){
            var now = Date.now();
            if(now > data.start + data.last) this.stopAnimation();
            data.x = Math.floor((data.dest - data.src) * data.timeMethod(now,data));
        },
        onRender : function(data){
            data.dom.style.left = data.x + "px";
        }
    }).animate();
    Move.animateAll();
```
....readme待续
