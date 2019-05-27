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









