## React Router

### 什么是 React Router?

React Router 是一个基于 React 之上的强大路由库，可以帮助您快速地向应用添加视图和数据流，同时保持 UI 与 URL 同步。

### React Router 与 history 库的区别?

React Router 是history库的包装器，它处理浏览器的window.history与浏览器和哈希历史的交互。它还提供了内存历史记录，这对于没有全局历史记录的环境非常有用，例如移动应用程序开发（React Native）和使用 Node 进行单元测试。

### 在 React Router v4 中的<Router>组件是什么?

React Router v4 提供了以下三种类型的 <Router> 组件:

<BrowserRouter>

<HashRouter>

<MemoryRouter>

以上组件将创建browser，hash和memory的 history 实例。React Router v4 通过router对象中的上下文使与您的路由器关联的history实例的属性和方法可用。