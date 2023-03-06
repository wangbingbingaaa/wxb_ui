自己研发的UI美化插件目前还在继续做 ✌

具体使用方法可查看 https://blog.csdn.net/weixin_42910765/article/details/129282121

## 使用方式

>  npm install wxb_ui


>import WXBUI from 'wxb_ui';
>Vue.use(WXBUI);



**可传入变量** 
- 高度：height   （必须）
- 宽度：width （不设置的话默认是100%）
-  颜色 :color="['#00c0ff', '#00fff0']"  分为主色和配色 数组中一个是主色 第二个是配色  
- 背景色：backgroundColor （部分有背景色）
- 设有插槽（重点提醒）
```javascript
<div id="app">
        <Xbline11 style="height:80px;">line11</Xbline11>
     
        <Xbline10 style="height:80px;">line10</Xbline10>
     
        <Xbline9 style="height:80px;">line9</Xbline9>
       
        <Xbline8 style="height: 80px;">line8</Xbline8>
      
        <Xbline7 style="height: 60px;">line7</Xbline7>
      
        <Xbline6 style="height: 560px;">line6</Xbline6>
      
        <Xbline5 style="height: 60px;">line5</Xbline5>
      
        <Xbline4 style="height: 30px;">line4</Xbline4>
       
        <Xbline3 style="height: 50px;">line3</Xbline3>
      
        <Xbline2 style="height: 20px;">line2</Xbline2>
        
        <Xbline1 style="height: 20px;">line1</Xbline1>
      
        <Box14 style="height: 120px;">box14</Box14>
       
        <Box13 style="height: 120px;">box13</Box13>
       
        <Box11 style="height: 120px;">box11</Box11>
      
        <Box12 style="height: 100px;">box12</Box12>
      
        <Box10 style="height: 100px;">box10</Box10>
       
        <Box9 style="height: 100px;">box9</Box9>
       
        <Box8 style="height: 100px;">box8</Box8>
       
        <Box7 style="height: 100px;">box7</Box7>
        
        <Box6 style="height: 100px;">box6</Box6>
       
        <Box5 style="height: 180px;">box5</Box5>
      
        <Box1 style="height: 150px;width: 480px;" :color="['#00c0ff', '#00fff0']">1</Box1>
       
        <Box2 style="height: 150px;width: 480px;" :backgroundColor="`#99dfdf`">2</Box2>
       
        <Box3 style="height: 150px;width: 480px;">box3</Box3>
        
        <Box4 style="height: 150px;width: 480px;">box4</Box4>

    </div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5a750cf9bebc4fb8865ec36841464e68.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/376a9a29eb2d4df489330c53f121f555.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c16cd3fb8c674d478d1d9202c2717031.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/cbb379f9ac684367b007be55e7bd5f9d.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/90efc92cf4dd4b5781632bc01c4d2338.png)
