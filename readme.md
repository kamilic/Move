Move
----
���������߼��ļ򵥿�ܣ�ͨ�������ص���������ɶ���Ч����
����ѧϰ����������Ŀ�ܣ��Ҿ�����һ���ܺõ�ѡ��  
**���ܽ�������ʲô�ط�**  
-DOM��������
-Canvas��������
-����������ʱ��ı任

####�÷�
######һ���򵥵�����
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
    // console ���Լ��16ms�ļ��logһ��,
    // ��Ȼ�����onUpdate��onRender������̫��ʱ��ͻ���ɶ������ٵ����⡣
```

######�ƶ�һ��DIV

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
            //����ʱ��ٷֱ�,��һ�����Զ���,��Ȼ��Ҳ��������Bezier��������ease-in/out�Ķ���
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
....readme����
