# css基础

##  CSS 加载方式有几种？
1. 内联方式

内联方式指的是直接在 HTML 标签中的 style 属性中添加 CSS。

```html
<div style="background: red"></div>
```

很显然，内联方式引入 CSS 代码会导致 HTML 代码变得冗长，且使得网页难以维护。

2. 嵌入方式

事例:

```html
<head>
    <style>

    .content {
        background: red;
    }

    </style>
</head>
```

嵌入方式的 CSS 只对当前的网页有效。因为 CSS 代码是在 HTML 文件中，所以会使得代码比较集中，当我们写模板网页时这通常比较有利。因为查看模板代码的人可以一目了然地查看 HTML 结构和 CSS 样式。因为嵌入的 CSS 只对当前页面有效，所以当多个页面需要引入相同的 CSS 代码时，这样写会导致代码冗余，也不利于维护。

3. 链接方式

链接方式指的是使用 HTML 头部的 head link 标签引入外部的 CSS 文件。

```html
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```
这是最常见的也是最推荐的引入 CSS 的方式。使用这种方式，所有的 CSS 代码只存在于单独的 CSS 文件中，所以具有良好的可维护性。并且所有的 CSS 代码只存在于 CSS 文件中，CSS 文件会在第一次加载时引入，以后切换页面时只需加载 HTML 文件即可。

4. 导入方式

导入方式指的是使用 CSS 规则引入外部 CSS 文件。

示例：

```html
<style>
    @import url(style.css);
</style>
```

## link和@import的区别？

区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
所以会出现一开始没有css样式，闪烁一下出现样式后的页面(网速慢的情况下)

区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

##  CSS 选择器常见的有几种？

一、基础选择器

1. 元素选择器

2. id选择器

3. class选择器

4. 优先级别：

```txt
id > class > 元素
```
二、属性选择器

```html
<html>
<head>
<meta charset="UTF-8">
<title>属性选择器</title>
<style type="text/css">
    input[type = 'text'] {background-color: red}
    input[type = 'password'] {background-color: pink}
</style>
</head>
<body>
    <form>
        name:<input type = "text"><br/>
        pass:<input type = "password">
    </form>

</body>
</html>
```

三、伪类选择器

```html
<html>
  <head>
  <meta charset="UTF-8">
  <title>伪类选择器</title>
      <style type="text/css">
          a:link{color:green ;font-size: 50px}
          a:hover{color:pink;font-size: 50px}
          a:active{color:yellow;font-size: 50px}
          a:visited{color:red;font-size: 50px}
      </style>
  </head>
  <body>
      <a href = "#">点击</a>
  </body>
</html>
```

四、层级选择器

省略

## id 选择器和 class 选择器的使用场景分别是什么？

在CSS文件里书写时，ID加前缀"#"；CLASS用"."

id一个页面只可以使用一次；class可以多次引用。

ID是一个标签，用于区分不同的结构和内容，就象名字，如果一个屋子有2个人同名，就会出现混淆；class是一个样式，可以套在任何结构和内容上，就象一件衣服；

从概念上说就是不一样的：id是先找到结构/内容，再给它定义样式；class是先定义好一种样式，再套给多个结构/内容。

目前的浏览器还都允许用多个相同ID，一般情况下也能正常显示，不过当你需要用JavaScript通过id来控制div时就会出现错误。

## @charset 有什么作用？

 @charset CSS @规则  指定样式表中使用的字符编码。它必须是样式表中的第一个元素，而前面不得有任何字符。因为它不是一个嵌套语句，所以不能在@规则条件组中使用。如果有多个 @charset @规则被声明，只有第一个会被使用，而且不能在HTML元素或HTML页面的字符集相关 style 元素内的样式属性内使用。

 使用UTF-8编码，有2个要注意：

【一】是网页的meta部分，必须有这句

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">，
```

【二】是网页的文本格式，必须保存为UTF-8格式，方法是用记事本打开网页，点击“文件→另存为”，在最后的Encoding，默认是ANSI，改为UTF-8
文件也存为utf-8格式。

## 简述 src 和 href 的区别？

A : href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

B : src是指向外部资源的位置，指向的内容将会嵌入到文档当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内。

##  块级元素和行内元素分别有哪些？ 空（void）元素有那些？块级元素和行内元素有什么区别？

[链接](https://blog.csdn.net/zhanglir333/article/details/79178370)

## IE 盒模型和 W3C 盒模型有什么区别?

IE盒模型的宽度是边框+padding+内容宽度

W3C盒模型的宽度就是内容宽度

### IE盒模型
```css
box-sizing：border-box;
```
width 与 height 包括内边距（padding）与边框（border），不包括外边距（margin）。这是IE 怪异模式（Quirks mode）使用的 盒模型 。

这个时候内边距和边框将会包括在盒子中。

尺寸计算公式：

```css
width = border + padding + 内容的宽度
height = border + padding + 内容的高度。
```

### W3C盒模型

``` css
box-sizing：content-box;
```

以上CSS代码会使元素的盒模型为W3C盒模型（其实元素的默认盒模型是W3C盒模型）。

元素width 与 height 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。

注意: 内边距, 边框 & 外边距 都在这个盒子的外部。！

尺寸计算公式：

```css
width = 内容的宽度
height = 内容的高度
```

宽度和高度都不包含内容的边框（border）和内边距（padding）。

## 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例？

1. 兄弟元素合并：当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并

2. 父子间合并：当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上和/或下外边距也会发生合并。

3. 空元素：假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并

### 如何合并：
两个相邻的外边距都是正数时，合并结果是它们两者之间较大的值。

两个相邻的外边距都是负数时，合并结果是两者绝对值的较大值。

两个外边距一正一负时，合并结果是两者的相加的和。

解决办法：

对于兄弟元素：设置浮动，display：inline-block或使其父元素均形成BFC可防止边距合并（如overflow:hidden）

对于父子间的元素：可以给父元素设置border或padding属性来防止合并。

对于空元素：设置border或padding属性或overflow：hidden等（形成BFC）来防止合并。

##  line-height: 2; 和 line-height: 200%; 有什么区别?

父元素设置line-height: 200%;属性时 父元素设置这个属性后，其所有子元素的行高都是一个具体的值，即他们父元素字体大小的200%。下例可看出子元素的行高都一致，即父元素字体大小的2倍，32px。

父元素设置line-height: 2;属性时 父元素设置这个属性后，其所有子元素的行高都是自身字体大小的2倍。下例可看出子元素的行高都是不一致的。

## 让一个元素“看不见”有几种方式？有什么区别？

1、最常用之——display: none;

给元素设置display: none;后，元素会从页面中彻底消失，它原本占据的空间会被其他元素占有，会造成浏览器的回流与重绘。

2、最常用之——visibility: hidden;

给元素设置visibility: hidden;后，元素会从页面中消失，它原本占据的空间会被保留，会造成浏览器的重绘，适用于希望元素隐藏又不影响页面布局的场景。

3、隐身大法——opacity: 0;

给元素设置opacity: 0;后，元素变成透明的我们肉眼就看不到了，所以原本占据的空间还在。

4、设置盒模型属性为0

将height、width、padding、border、margin等盒模型属性的值全设为0，如果元素內还有子元素或内容，还应overflow: hidden;来隐藏子元素。

```css
.box1 {
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  margin: 0;
  overflow: hidden;
}
```

5、最鸡贼——设置元素绝对定位与top、right、bottom、left等将元素移出屏幕。

```css
.box1 {
      position: absolute;
      left: 100%;
}
```
或
```css
.box1 {
      position: absolute;
      top: 9999px;
}
```

6 、设置元素的绝对定位与z-index，将z-index设置成尽量小的负数。

但z-index是相对而言的 ，用z-index就要设置其他元素的z-index值，且如果元素本身占据空间很大就不一定会被z-index值比它大的元素完全覆盖，所以不推荐这种方法。
如：

```css
.box1 {
        position: absolute;
        z-index: -9999;
}
.box2 {
        position: absolute;
        z-index: 1;
}
```

## float 关于浮动

### 浮动元素有什么特征？对父容器、其他浮动元素、普通元素、文字分别有什么影响？

浮动元素会脱离正常的文档流，按照其外边距指定的位置相对于它的上一个块级元素（或父元素）显示

浮动元素后面的块级元素的内容会向此浮动元素的外边距靠齐，但是边框和背景却忽略浮动元素而向上一个任意非浮动元素靠齐

浮动元素后面的内联元素会向此浮动元素的外边距靠齐

1、对其父元素的影响

对于其父元素来说，元素浮动之后，它脱离当前正常的文档流，所以它也无法撑开其父元素，造成父元素的塌陷

2、对其兄弟元素（非浮动）的影响

如果兄弟元素为块级元素，该元素会忽视浮动元素的而占据它的位置，并且元素会处在浮动元素的下层（并且无法通过z-index属性改变他们的层叠位置），但它的内部文字和其他行内元素都会环绕浮动元素。
如果如果兄弟元素为内联元素，则元素会环绕浮动元素排列。

3、对其兄弟元素（浮动）的影响

同一个方向的浮动元素：当一个浮动元素在浮动过程中碰到同一个方向的浮动元素时，它会紧跟在它们后面
反方向的浮动元素：互不影响，位于同一条水平线上，当空间不够时会被挤下

4、对子元素的影响
当一个元素浮动时，在没有清除浮动的情况下，它无法撑开其父元素，但它可以让自己的浮动子元素撑开它自身，并且在没有定义具体宽度情况下，使自身的宽度从100%变为自适应（浮动元素display:block）。其高度和宽度均为浮动元素高度和非浮动元素高度之间的最大值。

###  清除浮动指什么? 如何清除浮动? 两种以上方法

清除浮动指：消除浮动元素对其他元素因浮动元素造成的高度塌陷的问题

清除浮动的方法：

clear属性：一个元素是紧挨着前面的浮动元素，还是必须移动到它们的下面（浮动被清除）。clear属性既可以用于浮动元素，也可以用于非浮动元素。

当应用于非浮动块时，它将非浮动块的边框边界移动到所有相关浮动元素外边界的下方。

1. 利用clear样式

```css
.parentDiv {
    color: blue;
    border: 2px solid blue;

    clear: left;
}
```
2. 父元素结束标签之前插入清除浮动的块级元素

```css
.childDiv {
    clear: both; // or left
}
```

3. 利用伪元素（clearfix）

```css
container:after {
  content: "";
  display: block;
  clear: both;
}
```

4. 利用overflow清除浮动

仅仅只在父级元素上添加了一个值为auto的overflow属性，父元素的高度立即被撑起，将浮动元素包裹在内。看起来，浮动被清除了，浮动不再会影响到后续元素的渲染（严格讲，这和清除浮动没有一点关系，因为不存在哪个元素的浮动被清除，不纠结这个问题）。其实，这里的overflow值，还可以是除了"visible"之外的任何有效值，它们都能达到撑起父元素高度，清除浮动的目的。不过，有的值可能会带来副作用

[链接](https://juejin.im/post/59e7190bf265da4307025d91)

### z-index 有什么作用？如何使用？

因为显示器是显示的图案是一个二维平面，拥有x轴和y轴来表示位置属性。为了表示三维立体的概念如显示元素的上下层的叠加顺序引入了z-index属性来表示z轴的区别。表示一个元素在叠加顺序上的上下立体关系。

z-index值较大的元素将叠加在z-index值较小的元素之上。对于未指定此属性的定位对象，z-index 值为正数的对象会在其之上，而 z-index 值为负数的对象在其之下。
z-index属性适用于定位元素（position属性值为 relative 或 absolute 或 fixed的对象），用来确定定位元素在垂直于显示屏方向（称为Z轴）上的层叠顺序，也就是说如果元素是没有定位的，对其设置的z-index会是无效的。

### BFC 是什么？如何生成 BFC？BFC 有什么作用？举例说明。

BFC直译为"块级格式化上下文"。它是一块独立的区域，容器里面的子元素不会影响到外面的元素。要促发BFC的生成，则满足以下其中一个条件：

```css
1.float属性不为none；
2.position为absolute或fixed；
3.display为inline-block, table-cell, table-caption, flex, inline-flex；
4.overflow不为visible；
```

BFC可以清除内部浮动；BFC可以包含浮动，让父容器生成新的BFC可以使父容器在视觉上包围了浮动的子元素，因而清除了浮动

防止margin重叠，属于同一个BFC的两个相邻Box的margin会发生重叠，我们可以把其中一个元素生成新的BFC，这样它们的边距就不会合并。

在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例


外边距合并指当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。当两个外边距都为负数时，取其绝对值的较大者，当两个外边距为一正一负时，取两者的和。

父子外边距合并的需要满足父元素没有border和paddinng隔开。

形成BFC 可以阻止外边柜合并，对于垂直相邻的元素可以设置浮动或设置其中一个元素为display:inline-block;对于父子元素外边距，可为父元素设置padding或border。
]

 ## 列举你了解的 HTML5、CSS3 新特性？

标签：

articl  定义页面独立的内容区域。

aside 定义页面的侧边栏内容。

bdi 允许您设置一段文本，使其脱离其父元素的文本方向设置。

command 定义命令按钮，比如单选按钮、复选框或按钮

details 用于描述文档或文档某个部分的细节

dialog 定义对话框，比如提示框

summary 标签包含 details 元素的标题

figure 规定独立的流内容（图像、图表、照片、代码等等）。

figcaption 定义 figure 元素的标题

footer 定义 section 或 document 的页脚。

header 定义了文档的头部区域

mark 定义带有记号的文本

meter 定义度量衡。仅用于已知最大和最小值的度量。

nav 定义导航链接的部分。

progress 定义任何类型的任务的进度。

ruby  定义 ruby 注释（中文注音或字符）。

rt 定义字符（中文注音或字符）的解释或发音。

rp 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。

section 定义文档中的节（section、区段）。

time 定义日期或时间。

wbr 规定在文本中的何处适合添加换行符。

### HTML5 Canvas

HTML5 canvas 元素用于图形的绘制，通过脚本 (通常是JavaScript)来完成.

canvas 标签只是图形容器，您必须使用脚本来绘制图形。

### HTML5 拖放

### HTML5 地理定位

 HTML5 Geolocation API 用于获得用户的地理位置。

鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

```js

var x=document.getElementById("demo");
function getLocation()
{
if(navigator.geolocation)
{
navigator.geolocation.getCurrentPosition(showPosition);
}
else{x.innerHTML="该浏览器不支持获取地理位置。";}
}
function showPosition(position)
{
x.innerHTML="Latitude: "+ position.coords.latitude +
"<br>Longitude: "+ position.coords.longitude;
}

```

### HTML5  Audio(音频)、Video(视频)

HTML5 规定了在网页上嵌入音频元素的标准，即使用 audio 元素。

``` html
<audiocontrols>
<sourcesrc="horse.ogg"type="audio/ogg">
<sourcesrc="horse.mp3"type="audio/mpeg">
```

### HTML5 Input 类型

### HTML5 表单属性

### HTML5 语义元素

### HTML5 Web 存储

### Manifest 文件

manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。

manifest 文件可分为三个部分：

```txt
CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面
```

```txt
CACHE MANIFEST
# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js
NETWORK:
login.php
FALLBACK:
/html/ /offline.html
```

### HTML5 Web Workers

当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。（相当于实现多线程并发）

### HTML5 SSE

Server-Sent 事件指的是网页自动获取来自服务器的更新。

以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过服务器发送事件，更新能够自动到达。

例子：Facebook/Twitter 更新、估价更新、新的博文、赛事结果等。

EventSource 对象用于接收服务器发送事件通知：

```js
var source=newEventSource("demo_sse.php");
source.onmessage=function(event)
{
document.getElementById("result").innerHTML+=event.data +"<br>";
};
```
### HTML5 WebSocket

ebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。以下 API 用于创建 WebSocket 对象。

## CSS3选择器

### CSS3选择器

### CSS3 边框（Borders）

```css
border-image	设置所有边框图像的速记属性。
border-radius	一个用于设置所有四个边框- *-半径属性的速记属性
box-shadow	附加一个或多个下拉框的阴影
```
### CSS3 背景

```css
background-clip	规定背景的绘制区域。
background-origin	规定背景图片的定位区域。
background-size	规定背景图片的尺寸。
```

### CSS3 渐变

CSS3 定义了两种类型的渐变（gradients）：

#### 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向

```css
background: linear-gradient(direction, color-stop1, color-stop2,...);
```

#### 径向渐变（Radial Gradients）- 由它们的中心定义

```css
background: radial-gradient(center, shape size, start-color,...,last-color);
```

### CSS3 字体

以前CSS3的版本，网页设计师不得不使用用户计算机上已经安装的字体。使用CSS3，网页设计师可以使用他/她喜欢的任何字体。当你发现您要使用的字体文件时，只需简单的将字体文件包含在网站中，它会自动下载给需要的用户。您所选择的字体在新的CSS3版本有关于@font-face规则描述。您"自己的"的字体是在 CSS3 @font-face 规则中定义的。

### CSS3 转换和变形

```css
transform	适用于2D或3D转换的元素

transform-origin	允许您更改转化元素位置
```

### CSS3 过渡
```css
transition	简写属性，用于在一个属性中设置四个过渡属性。	3
transition-property	规定应用过渡的 CSS 属性的名称。	3
transition-duration	定义过渡效果花费的时间。默认是 0。	3
transition-timing-function	规定过渡效果的时间曲线。默认是 "ease"。	3
transition-delay	规定过渡效果何时开始。默认是 0。	3
```

### CSS3 动画

要创建CSS3动画，你需要了解@keyframes规则。@keyframes规则是创建动画。 @keyframes规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。

```css
@keyframes myfirst
{
0%{background: red;}
25%{background: yellow;}
50%{background: blue;}
100%{background: green;}
}

@keyframes	规定动画。	3
animation	所有动画属性的简写属性，除了 animation-play-state 属性。	3
animation-name	规定 @keyframes 动画的名称。	3
animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	3
animation-timing-function	规定动画的速度曲线。默认是 "ease"。	3
animation-delay	规定动画何时开始。默认是 0。	3
animation-iteration-count	规定动画被播放的次数。默认是 1。	3
animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。	3
animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。	3

```

### CSS3 多列

```css
column-count	指定元素应该被分割的列数。
column-fill	指定如何填充列
column-gap	指定列与列之间的间隙
column-rule	所有 column-rule-* 属性的简写
column-rule-color	指定两列间边框的颜色
column-rule-style	指定两列间边框的样式
column-rule-width	指定两列间边框的厚度
column-span	指定元素要跨越多少列
column-width	指定列的宽度
columns	设置 column-width 和 column-count 的简写
```

### CSS3 盒模型
 在 CSS3 中, 增加了一些新的用户界面特性来调整元素尺寸，框尺寸和外边框，主要包括以下用户界面属性：

```css
resize：none | both | horizontal | vertical | inherit
box-sizing: content-box | border-box | inherit
outline:outline-color outline-style outline-width outine-offset
```
resize属性指定一个元素是否应该由用户去调整大小。

box-sizing 属性允许您以确切的方式定义适应某个区域的具体内容。

outline-offset 属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

### CSS3伸缩布局盒模型(弹性盒)

``` css
display	指定 HTML 元素盒子类型。
flex-direction	指定了弹性容器中子元素的排列方式
justify-content	设置弹性盒子元素在主轴（横轴）方向上的对齐方式。
align-items	设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式。
flex-wrap	设置弹性盒子的子元素超出父容器时是否换行。
align-content	修改 flex-wrap 属性的行为，类似 align-items, 但不是设置子元素对齐，而是设置行对齐
flex-flow	flex-direction 和 flex-wrap 的简写
order	设置弹性盒子的子元素排列顺序。
align-self	在弹性子元素上使用。覆盖容器的 align-items 属性。
flex	设置弹性盒子的子元素如何分配空间。
```











