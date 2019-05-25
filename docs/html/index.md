# html 相关

##  doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?

!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，这并不是一个 HTML 标签。

严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码。

混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

如何区分：浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

1、如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。（严格 DTD ——严格模式）
2、包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式）
3、DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。（DTD不存在或者格式不正确——混杂模式）
4、HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。（ HTML5 没有严格和混杂之分）

## doctype 有什么作用？怎么写？

每个页面都要从 doctype 开始，它为浏览器指定这个页面的文档类型，以便浏览器更正确的显示 HTML 。只要按照这样的格式和位置写，那么浏览器就会认为你在使用标准 HTML 。这样写的好处是：不用再像 HTML5 出来之前那样，既要写上 HTML 版本号，又要写上这个 HTML 文档所依据的标准是在什么位置。一劳永逸，之后不管 HTML 再怎么更新，我们的文档都可以被浏览器以最正确的方式显示出来。

## html

 对于元素，html页面中的所有内容都嵌套在这个元素中。

## 页面出现了乱码，是怎么回事？如何解决？

 当编码是一种方式，而解码又是另一种方式时，页面就会出现“乱码”；

 解决方式：只需要知道我在编辑器保存这个 HTML 文件时，保存的是什么编码格式，然后在头部中告诉浏览器用什么方式来解码。

## <img> 有两个必要的属性：src 和 alt

src: 它是 source 的缩写，意指这个图像来源自哪里（这后边可以放所在文件的路径，也可以是一个所在的 URL）；

alt：这个属性主要是为了规避例如：因网速差、硬件设备限制等外部因素，我们的浏览器不能很好的显示出图像，那 alt 后边的文本将会取代图像告诉用户这里会是什么东西（参考后边最终的页面展现）。

## W3C是什么?什么是W3C标准?

W3C是英文 World Wide Web Consortium 的缩写

1.结构标准，代表语言是xHTML

2.表现标准，代表语言是CSS

3.动作标准，代表语言是JavaScrip

## HTML 全局属性（global attribute）有哪些？

accesskey 规定激活元素的快捷键；

class 规定元素的一个或多个类名（引用样式表中的类）；

contenteditable 规定元素内容是否可编辑；

contextmenu 规定元素的上下文菜单。上下文菜单在用户点击元素时显示。

data-* 用于存储页面或应用程序的私有定制数据。

dir 规定元素中内容的文本方向。

draggable 规定元素是否可拖动。

dropzone 规定在拖动被拖动数据时是否进行复制、移动或链接。

hidden  样式上会导致元素不显示，但是不能用这个属性实现样式。

id 规定元素的唯一 id。

lang 规定元素内容的语言。

spellcheck 规定是否对元素进行拼写和语法检查。

style 规定元素的CSS行内元素。

tabindex 规定元素的tab键次序。

title 规定有关元素的额外信息。

translate 规定是否应该翻译元素内容。

##  meta 有哪些常见的值？

一、http-equiv属性

1.Expires:用于设定网页的到期时间。网页一旦到期，必须从服务器接收数据。

```html
<meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT">
```

2.Pragma:cache模式-用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从cache中再调出，从而无法脱机浏览

``` html
<meta http-equiv="Pragma" content="no-cache">
```

3.Set-Cookie:cookie设定-如果网页过期，那么存盘中的cookie将被删除
```html
<meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Wednesday, 20-Jun-2007 22:33:00 GMT； path=/">
```

4.Refresh：刷新机制-表示自动刷新并指向新页面
```html
<meta http-equiv="Refresh" content="2；URL=http://www.net.cn/">
```
2指的是2秒后自动刷新到新的URL网址。

5.Window-target:显示窗口的设定-强制页面在当前窗口以独立页面显示，防止别人在框架里调用自己的页面

```html
<meta http-equiv="Window-target" content="_top">
```

6.content-Type：设定页面使用的字符集

```html
<meta http-equiv="content-Type" content="text/html; charset=gb2312">
```

7.Pics-label：网页等级评定，在IE的Internet选项中可以设置来防止浏览一些受限制的网站，网站的限制级别就是通过这个属性来设置的

```html
<meta http-equiv="Pics-label" contect="">
```

8.cache-control:清除缓存，再次访问这个网站要重新下载
```html
<meta http-equiv="cache-control" content="no-cache">
```

9.Access-Control-Allow-Origin:跨域请求
```html
<meta http-equiv="Access-Control-Allow-Origin" content="*">
```

10.content-language:显示语言的设定
```html
<meta http-equiv="Content-Language"content="zh-cn"/>
```

11.imagetoolbar:指定是否显示图片工具栏，false表示不显示

```html
<meta http-equiv="imagetoolbar"content="false"/>
```

12.Content-Script-Type:W3C网页指定页面中的脚本的类型：

```html
<meta http-equiv="Content-Script-Type"Content="text/javascript">
```

### 二、name属性

name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

1.keywords:设置关键字，给搜索引擎用的

```html
<meta name="keywords" content="keyword1,keyword2,keyword3">
```

2.description：页面描述

```html
<meta name="description" content="This is my page">
```

3.robots:用于告诉搜索机器人哪些页面需要索引，哪些页面不用

```html
<meta name="robots"content="none">
```

content的参数有all（文件将被检索，且页面上的链接可以被查询）,none（文件将不被检索，且页面上的链接不可以被查询）,index（文件将被检索）,noindex（文件将不被检索，但页面上的链接可以被查询）,follow（页面上的链接可以被查询）,nofollow（文件将被检索，但页面上的链接不可以被查询）。默认是all。

4.author:标注网页的作者
```html
<meta name="author"content="root,root@xxxx.com">
```

5.generator:说明网站采用什么软件做的

```html
<meta name="generator"content="信息参数"/>
```

6.copyright:网站版权信息

```html
<meta name="copyright" content="信息参数">
```

