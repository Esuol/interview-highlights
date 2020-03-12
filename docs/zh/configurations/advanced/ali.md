---
title: '高级/资深前端面试题目收集'
---

<Block>
# ali面试题
</Block>

### 使用过的koa2中间件

koa-bodyparser  koa-cors koa-views koa-static

### koa-body原理

koa-bodyparser主要是对co-body的封装，而【co-body】中主要是采用raw-body模块获取请求报文主体的二进制数据流，

koa-bodyparser 中间件是将我们的 post 请求和表单提交的查询字符串转换成对象，并挂在 ctx.request.body 上，方便我们在其他中间件或接口处取值，

### 介绍pm2

PM2 是一个带有负载均衡功能的 Node 应用的进程管理器

主要特性

    1）启动多子进程，充分使用CPU

    2）子进程之间负载均衡

    3）0秒重启

    4）界面友好

    5）提供进程交互（例如：监控）接口

  如果有任何工作线程意外挂掉了，PM2会立即重启他们，当前你可以在任何时候重启，

PM2 reload <app name> 命令会一个接一个的重启工作线程，在新的工作线程启动后才结束老的工作线程。
这种方式可以保持你的Node程序始终是运行状态。即使在生产环境下部署了新的代码补丁。

### React声明周期及自己的理解

挂载阶段:

constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this

getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容

componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

更新阶段:

getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用

shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能

render: 更新阶段也会触发此生命周期

getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用

componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

卸载阶段:

componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

### 如何配置React-Router

1 Route

Route 是建立location 和 ui的最直接联系

2 Router

react-router v4 中，Router被拆分成了StaticRouter、MemoryRouter、BrowserRouter、HashRouter、NativeRouter。

MemoryRouter、BrowserRouter、HashRouter 等于 import { Router } from 'react-router'

### 路由的动态加载模块

React应用的代码分割需要结合路由库react-router使用，当前react-router的版本是V4,在使用react-router4进行代码分割的路上，社区已经有成熟的第三方库进行了实现，如react-loadable。

v4版本时，就不需要在 Route 配置的地方嵌套好几个 Route，也不需要使用 this.props.children 指明子组件渲染的位置。只需要在父组件相应的位置添加 Route 即可。就跟嵌套一个 div 一样。

<Route exact path="/settings"
  component={Loadable({
    loader: () => import(/* webpackChunkName: "Settings" */ './Settings.js'),
    loading:Loading
  })}
/>

### 服务端渲染SSR

服务端在返回 html 之前，在特定的区域，符号里用数据填充，再给客户端，客户端只负责解析 HTML 。

服务端渲染的模式下，当用户第一次请求页面时，由服务器把需要的组件或页面渲染成 HTML 字符串，然后把它返回给客户端。客户端拿到手的，是可以直接渲染然后呈现给用户的 HTML 内容，不需要为了生成 DOM 内容自己再去跑一遍 JS 代码。使用服务端渲染的网站，可以说是“所见即所得”，页面上呈现的内容，我们在 html 源文件里也能找到。

首屏渲染快、利于SEO、可以生成缓存片段，生成静态化文件、节能（对比客户端渲染的耗电）

坏处:用户体验较差、不容易维护，通常前端改了部分html或者css，后端也需要修改。

好处 首屏加载快 相比于加载单页应用，我只需要加载当前页面的内容，而不需要像 React 或者 Vue 一样加载全部的 js 文件 SEO 优化 对于单页应用，搜索引擎并不能收录到 ajax 爬取数据之后然后再动态 js 渲染出来的页面。

### 介绍路由的history

history库提供了三种不同的方法来创建history对象，这里的history对象是对浏览器内置window.history方法的扩展

调用history.push跳转路由时，内部执行window.history.pushState在浏览器history栈中新增一条记录，改变url，执行<Router></Router>组件注册的回调函数，

createBrowserHistory中注册popstate事件，用户点击浏览器前进、回退时，在popstate事件中获取当前的event.state，重新组装一个location,执行<Router></Router>组件注册的回调函数

history库对外暴露createBrowserHistory方法，react-router中实例化createBrowserHistory方法对象，在<Router>组件中注册history.listen()回调函数，当路由有变化时,<Route>组件中匹配location,同步UI

### 介绍Redux数据流的流程

redux作为一种单向数据流的实现

简单来说，首先由view dispatch拦截action，然后执行对应reducer并更新到store中，最终views会根据store数据的改变执行界面的刷新渲染操作。

view - action -dispatch - reducer - newState - watch - setSate - reder

### Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理

react-redux 实现原理

### 如何解决跨域的问题

jsonp cors websocket webworker(postmessage)

### 常见Http请求头

Accept: text/html,image/*      -- 浏览器接受的数据类型

Accept-Charset: ISO-8859-1     -- 浏览器接受的编码格式

Accept-Encoding: gzip,compress  --浏览器接受的数据压缩格式

Accept-Language: en-us,zh-       --浏览器接受的语言

Host: www.it315.org:80          --（必须的）当前请求访问的目标地址（主机:端口）

If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT  --浏览器最后的缓存时间

Referer: http://www.it315.org/index.jsp      -- 当前请求来自于哪里

User-Agent: Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)  --浏览器类型

Cookie:name=eric                     -- 浏览器保存的cookie信息

Connection: close/Keep-Alive            -- 浏览器跟服务器连接状态。close: 连接关闭  keep-alive：保存连接。

Date: Tue, 11 Jul 2000 18:23:51 GMT      -- 请求发出的时间

### 移动端适配1px的问题

0.5px边框

使用background-image实现

使用box-shadow模拟边框

viewport + rem 实现

伪类 + transform 实现

### 居中为什么要使用transform（为什么不使用marginLeft/Top)

transform发生在Composite Layer这一步，它所引起的paint也只是发生在单独的GraphicsLayer中，并不会引起整个页面的回流重绘。

marign：外边距，定义元素周围的空间；简言之，可以改变元素的位移。在浏览器页面渲染的时候，margin可以控制元素的位置，也就是说，改变margin，就会改变render tree的结构，必定会引起页面layout回流和repaint重绘。

### 使用过webpack里面哪些plugin和loader

plugin dll-plugin html-webpack-plugin clean-webpack-plugin hapy-pack CommonsChunkPlugin

loader css-loader style-loader babel-loader file-loader url-loader


### webpack里面的插件是怎么实现的

在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation，它们是 Plugin 和 Webpack 之间的桥梁。

Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；

Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象

Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

### dev-server是怎么跑起来

iframe模式（页面放在iframe中，当发送改变时重载） 无需额外配置，只要以这种格式url访问即可。http://localhost:8080/webpack-dev-server/index.html

inline模式（将webpack-dev-server的客户端入口添加到bundle中） inline模式下url不用发生变化，但启动inline模式分两种情况

1 当以命令行启动webpack-dev-server时,需要做两点：

在命令行中添加--inline命令

在webpack.config.js中添加devServer:{inline:true}

2 当以Node.js API启动webpack-dev-server时,我们也需要做两点:

由于webpack-dev-server的配置中无inline选项,我们需要添加webpack-dev-server/client?http://«path»:«port»/到webpack配置的entry入口点中.

将<script src="http://localhost:8080/webpack-dev-server.js"></script>添加到html文件中

### 抽取公共文件是怎么配置的

CommonsChunkPlugin 能解决的问题

在使用插件前，考虑几个问题：

对哪些 chunk 进行提取，这决定了 chunks ，children 和 name 要怎么配置

common chunk 是否异步，这决定了 async 怎么配置

common chunk 的粒度，这决定了 minChunks 和 minSize 怎么配置

### 项目中如何处理安全问题

通过 HTML 转义，可以防止 XSS 攻击。

### 怎么实现this对象的深拷贝

略

### Object.proxy 解决了哪些问题

其实我们升级版的双向绑定依然存在漏洞,比如我们将属性值改为数组。

是的,Object.defineProperty的第一个缺陷,无法监听数组变化。
然而Vue的文档提到了Vue是可以检测到数组变化的，但是只有以下八种方法,vm.items[indexOfItem] = newValue这种是无法检测的。
push()
pop()
shift()
unshift()
splice()
sort()
reverse()

#### Proxy可以直接监听对象而非属性

当我们对数组进行操作(push、shift、splice等)时，会触发对应的方法名称和length的变化，我们可以借此进行操作,以上文中Object.defineProperty无法生效的列表渲染为例。

Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。

Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。

Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。

当然,Proxy的劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。







