# css基础

###  CSS 加载方式有几种？
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

### link和@import的区别？

区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
所以会出现一开始没有css样式，闪烁一下出现样式后的页面(网速慢的情况下)

区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

###  CSS 选择器常见的有几种？

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

### id 选择器和 class 选择器的使用场景分别是什么？

在CSS文件里书写时，ID加前缀"#"；CLASS用"."

id一个页面只可以使用一次；class可以多次引用。

ID是一个标签，用于区分不同的结构和内容，就象名字，如果一个屋子有2个人同名，就会出现混淆；class是一个样式，可以套在任何结构和内容上，就象一件衣服；

从概念上说就是不一样的：id是先找到结构/内容，再给它定义样式；class是先定义好一种样式，再套给多个结构/内容。

目前的浏览器还都允许用多个相同ID，一般情况下也能正常显示，不过当你需要用JavaScript通过id来控制div时就会出现错误。

### @charset 有什么作用？

 @charset CSS @规则  指定样式表中使用的字符编码。它必须是样式表中的第一个元素，而前面不得有任何字符。因为它不是一个嵌套语句，所以不能在@规则条件组中使用。如果有多个 @charset @规则被声明，只有第一个会被使用，而且不能在HTML元素或HTML页面的字符集相关 style 元素内的样式属性内使用。

 使用UTF-8编码，有2个要注意：

【一】是网页的meta部分，必须有这句

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">，
```

【二】是网页的文本格式，必须保存为UTF-8格式，方法是用记事本打开网页，点击“文件→另存为”，在最后的Encoding，默认是ANSI，改为UTF-8
文件也存为utf-8格式。

### 简述 src 和 href 的区别？

A : href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

B : src是指向外部资源的位置，指向的内容将会嵌入到文档当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内。





