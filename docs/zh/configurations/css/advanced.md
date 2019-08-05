---
title: 'Css进阶'
---

<Block>
# Css进阶
</Block>

<Block>
### 可以通过哪些方法优化 CSS3 animation 渲染？

查看&nbsp;&nbsp;&nbsp;&nbsp;[链接](https://juejin.im/entry/5a77b461f265da4e8d42e280)

</Block>

<Block>
### 响应式布局原理？

响应式布局指的是同一页面在不同屏幕尺寸下有不同的布局。传统的开发方式是PC端开发一套，手机端再开发一套，而使用响应式布局只要开发一套就够，缺点就是CSS比较重。下面是博客网站对不同设备适配后的结果，分别是iPhone5/SE,iphone6/7/8,iphone 6/7/8 plus,ipad pro,dell台式宽屏(1440 X 900)。

<Example>
```txt
响应式设计与自适应设计的区别：响应式开发一套界面，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容；自适应需要开发多套界面，通过检测视口分辨率，来判断当前访问的设备是pc端、平板、手机，从而请求服务层，返回不同的页面。
```
</Example>

</Block>

<Block>

### 响应式布局的实现方案

CSS3媒体查询可以让我们针对不同的媒体类型定义不同的样式，当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

</Block>

<Block>
### 如何选择屏幕大小分割点

如何确定媒体查询的分割点也是一个开发中会遇到的问题，下面是市场上的移动设备和电脑屏幕分辨率的分布情况，可以发现不同品牌和型号的设备屏幕分辨率一般都不一样

使用 viewport标签在手机浏览器上控制布局控制不缩放等通用定义。

<Example>
```html
<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1" />
<meta name="apple-mobile-web-app-status-bar-style" content="blank" />
```
</Example>

</Block>

<Block>

### 普通元素的栅格布局


<Example>
```css
.row{
  width: 100%;
}
.row .col-1 {
  width: 8.33333333333%
}

.row .col-2 {
  width: 16.6666666667%
}

/* ...比较多，这里省略 */

.row .col-12 {
  width: 100%
}
```
</Example>


</Block>
