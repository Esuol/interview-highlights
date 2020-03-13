---
title: '高级/资深前端面试题目收集'
---

<Block>
# 网易面试题
</Block>

### 文件上传如何做断点续传

```js
var reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.addEventListener("load", function(e) {
    //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
    var slice = e.target.result.slice(0, 10*1024*1024);
});

var formdata = new FormData();
formdata.append('0', slice);
```

### 表单可以跨域吗

因为原页面用 form 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。

所以浏览器认为这是安全的。

可以 没有跨域问题

所以浏览器这个策略的本质是，一个域名的 JS ，在未经允许的情况下，不得读取另一个域名的内容。但浏览器并不阻止你向另一个域名发送请求。

### promise、async有什么区别

async/await是写异步代码的新方式，以前的方法有回调函数和Promise。

async/await是基于Promise实现的，它不能用于普通的回调函数。

async/await与Promise一样，是非阻塞的。

async/await使得异步代码看起来像同步代码，这正是它的魔力所在

async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。

函数前面多了一个aync关键字。

await关键字只能用在aync定义的函数内。

async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值.

使用Async/Await明显节约了不少代码。我们不需要写.then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码、

### 搜索请求中文如何请求

encodeURI函数采用utf-8进行编码，

get请求建议尽量不带中文参数，如果使用建议使用两次encodeURI进行编码

### 介绍中介者模式

用一个中介对象来封装一系列的对象交互。

中介者对象可以让各个对象之间不需要显示的相互引用，从而使其耦合松散，而且可以独立的改变它们之间的交互。

### 观察者和订阅-发布的区别，各自用在哪里

1、观察者模式

观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯。

观察者模式有一个别名叫“发布-订阅模式”，或者说是“订阅-发布模式”，订阅者和订阅目标是联系在一起的，当订阅目标发生改变时，逐个通知订阅者。我们可以用报纸期刊的订阅来形象的说明，当你订阅了一份报纸，每天都会有一份最新的报纸送到你手上，有多少人订阅报纸，报社就会发多少份报纸，报社和订报纸的客户就是上面文章开头所说的“一对多”的依赖关系。

2、订阅-发布模式

但是经过时间的沉淀，似乎他已经强大了起来，已经独立于观察者模式，成为另外一种不同的设计模式。

在现在的发布订阅模式中，称为发布者的消息发送者不会将消息直接发送给订阅者，这意味着发布者和订阅者不知道彼此的存在。在发布者和订阅者之间存在第三个组件，称为调度中心或事件通道，它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者。

举一个例子，你在微博上关注了A，同时其他很多人也关注了A，那么当A发布动态的时候，微博就会为你们推送这条动态。A就是发布者，你是订阅者，微博就是调度中心，你和A是没有直接的消息往来的，全是通过微博来协调的（你的关注，A的发布动态）。

### 介绍react优化

1 使用纯组件 pureComponent

2 memo

3 使用 shouldComponentUpdate 生命周期事件

4 懒加载组件 为此我们使用 Suspense 和 lazy。

5 使用 React Fragments 避免额外标记 使用 Fragments 减少了包含的额外标记数量，这些标记只是为了满足在 React 组件中具有公共父级的要求。

6 不要使用内联函数定义

7. 避免 componentWillMount() 中的异步请求

8. 在 Constructor 的早期绑定函数 箭头函数与构造函数中的绑定

9 避免使用内联样式属性

### 介绍http2.0

1  二进制分帧 ，HTTP2.0会将所有传输信息分割为更小的消息和帧，并对它们采用二进制格式的编码将其封装。

HTTP2.0通信都在一个TCP连接上完成，这个连接可以承载任意数量的双向数据流，相应的每个数据流以消息的形式发送。而消息由一或多个帧组成，这些帧可以乱序发送，然后根据每个帧首部的流标识符重新组装。

2 首部压缩

首部表在HTTP2.0使用了首部压缩的技术。使报头更紧凑，更快速传输，有利于移动网络环境。减少每次通讯的数据量，使网络拥塞状态得以改善。

3 流量控制

HTTP2.0为数据流和连接的流量提供了一个简单的机制：

流量基于HTTP链接的每一跳进行，而非端到端的控制

流量控制基于窗口更新帧进行，即接收方广播自己准备接收某个数据流的多少字节，以及对整个链接要接收多少个字节。

流量控制有方向性，即接收方可能根据自己的情况为没个流乃至整个链接设置任意窗口大小

流量控制可以由接收方禁用，包括针对个别的流和针对整个链接。

4 多路复用

在HTTP1.1中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量的限制。超过限制数目的请求会被阻塞。而HTTP2.0中的多路复用优化了这一性能。

基于二进制分帧层，HTTP2.0可以在共享TCP链接的基础上同时发送请求和响应。HTTP消息被分解为独立的帧，而不破坏消息本身的语义，交错发出去，在另一端根据流标识符和首部将他们重新组装起来。

多路复用对性能优化工作的贡献

可以并行交错的发送请求和响应，这些请求和响应之间互不影响

只使用一个链接即可并行发送多个请求和响应

消除不必要的延迟，从而减少页面加载的时间

不必再为绕过HTTP1.x限制而多做很多工作

5 请求优先级

每个流都可以带有一个31bit的优先值：0表示最高优先级；2的31次方-1表示最低优先级。

客户端明确指定优先级，服务端可以根据这个优先级作为交互数据的依据，比如客户端优先设置为.css>.js>.jpg

6 服务器推送

HTTP2.0新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。服务器向客户端推送资源无需客户端明确的请求。

### 通过什么做到并发请求

使用异步Prmosie或者web worker

### http1.1时如何复用tcp连接

stream 可写可读  catch Tcp 缓存 协商缓存

### 介绍service worker

PWA 离线应用 Service Worker 的生命周期完全独立于网页。

Service Worker 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门。 现在，它们已包括如推送通知和后台同步等功能

### 介绍css3中position:sticky

position:sticky 的生效是有一定的限制的，总结如下：

须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。

设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。这里需要解释一下：

如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。

如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。

达到设定的阀值。这个还算好理解，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的。

### redux请求中间件如何处理并发

redux-thunk redux-saga

### 介绍Promise，异常捕获

-reject 是用来抛出异常的，catch 才是用来处理异常的

### 介绍position属性包括CSS3新增

### 浏览器事件流向

事件流包含三个过程，分别是捕获阶段、目标阶段和冒泡阶段，下图形象地说明这个过程：

减少事件绑定。上面的例子中，也可以分别给每个列表项绑定事件，但利用事件委托的方式不仅省去了一一绑定的麻烦，也提升了网页的性能，因为每绑定一个事件便会增加内存使用。

可以动态监听绑定。上面的例子中，我们对 5 个列表项进行了事件监听，当删除一个列表项时不需要单独删除这个列表项所绑定的事件，而增加一个列表项时也不需要单独为新增项绑定事件。

   e.stopPropagation(); // 阻止事件冒泡

   target 指触发事件的元素， currentTarget 指事件所绑定的元素；

### 介绍事件代理以及优缺点

委托（代理）事件是那些被绑定到父级元素的事件，但是只有当满足一定匹配条件时才会被挪。这是靠事件的冒泡机制来实现的，

优点是：

（1）可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒

（2）可以实现当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适

缺点是：

事件代理的应用常用应该仅限于上述需求下，如果把所有事件都用代理就可能会出现事件误判，即本不应用触发事件的被绑上了事件。

### React组件中怎么做事件代理

react并不是我之前所设想的将事件绑定在真实dom上，而是通过自己的事件处理器来处理，将所有的事件都绑定在document上，这样真实点击的时候，冒泡到document上，react再通过document去dispatchEvent统一处理事件

 基本上就是这样了(当然没有对冒泡做处理，react会遍历自己的vdom去执行冒泡)

事件管理中心(bankForRegistrationName)会在react-render过程中保存所有所有dom事件

document作为事件委托者，用来分发事件(dispatchEvent),通过dom节点唯一标识(_debugID)去事件管理(bankForRegistrationName)触发事件

React中的事件处理程序所接收的事件参数是被称为“合成事件

在React中使用原生事件

const thisDOM = ReactDOM.findDOMNode(this);

### 前端怎么控制管理路由

hash  histroy

### 使用路由时出现问题如何解决

### React怎么做数据的检查和变化

React 本身不具备数据检查的功能（ 这里指双向绑定的特点 ），但是在遇到组件更新时会在 shouldComponentUpdate 这个生命周期函数中进行进行数据检查的相关操作（ 即本次更新是否返回新的状态 ）

React 响应数据的变化主要是通过生成新的虚拟 dom ，再将其映射为真实的 Dom 树构建完成来生成新的页面

### react-router怎么实现路由切换

hash histroy

### react-router里的<Link>标签和<a>标签有什么区别

<Link> 是 react-router 里实现路由跳转的链接，一般配合 <Route> 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，<Link> 的“跳转”行为只会触发相匹配的 <Route> 对应的页面内容更新，而不会刷新整个页面。

而 <a> 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）。

a标签也是dom同样可以加click，可以通过js来做跳转

### 整个前端性能提升大致分几类

### import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的

{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ]
}

### 使用import时，webpack对node_modules里的依赖会做什么

 当打包模块时，webpack 使用 enhanced-resolve 来解析文件路径

### JS异步解决方案的发展历程以及优缺点
1.回调函数callback：
事件发布订阅
3.Promise
genertor
5.async/await

### Http报文的请求会有几个部分

GET /search?hl=zh-CN&source=hp&q=domety&aq=f&oq= HTTP/1.1
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint,
application/msword, application/x-silverlight, application/x-shockwave-flash, */*
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a>
Accept-Language: zh-cn
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld)
Host: <a href="http://www.google.cn">www.google.cn</a>
Connection: Keep-Alive
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g;
NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-
FxlRugatx63JLv7CWMD6UB_O_r

### cookie放哪里，cookie能做的事情和存在的价值

header 请求头


### cookie和token都存放在header里面，为什么只劫持前者

以上面的csrf攻击为例：

cookie：用户点击了链接，cookie未失效，导致发起请求后后端以为是用户正常操作，于是进行扣款操作。
token：用户点击链接，由于浏览器不会自动带上token，所以即使发了请求，后端的token验证不会通过，所以不会进行扣款操作。
这是个人理解的为什么只劫持cookie不劫持token的原因。

### React中Dom结构发生变化后内部经历了哪些变化

diff算法对比虚拟dom与现在视图dom, 计算哪些节点需要重新渲染 算出最小操作集 然后到组件 render

### key主要是解决哪一类的问题，为什么不建议用索引index（重绘）?

循环渲染子元素 加个key值使diff算法更快, 使用index的话, 当数组增删的时候, dom元素对应index改变 会出现渲染的问题






