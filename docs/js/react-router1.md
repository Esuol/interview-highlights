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

### history 中的 push() 和 replace() 方法的目的是什么?

一个 history 实例有两种导航方法：

push()

replace()

如果您将 history 视为一个访问位置的数组，则push()将向数组添加一个新位置，replace()将用新的位置替换数组中的当前位置。

### 如何使用在 React Router v4 中以编程的方式进行导航?

在组件中实现操作路由/导航有三种不同的方法。

#### 使用withRouter()高阶函数：

withRouter()高阶函数将注入 history 对象作为组件的 prop。该对象提供了push()和replace()方法，以避免使用上下文。

```js
import { withRouter } from 'react-router-dom' // this also works with 'react-router-native'

const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/new-location') }}
  >
    {'Click Me!'}
  </button>
))
```

#### 使用<Route>组件和渲染属性模式：

<Route>组件传递与withRouter()相同的属性，因此您将能够通过 history 属性访问到操作历史记录的方法。

import { Route } from 'react-router-dom'

```js
const Button = () => (
  <Route render={({ history }) => (
    <button
      type='button'
      onClick={() => { history.push('/new-location') }}
    >
      {'Click Me!'}
    </button>
  )} />
)
```

#### 使用上下文:

建议不要使用此选项，并将其视为不稳定的API。

```js
const Button = (props, context) => (
  <button
    type='button'
    onClick={() => {
      context.history.push('/new-location')
    }}
  >
    {'Click Me!'}
  </button>
)

Button.contextTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}
```

#### 如何在 React Router v4 中获取查询字符串参数?

在 React Router v4 中并没有内置解析查询字符串的能力，因为多年来一直有用户希望支持不同的实现。因此，使用者可以选择他们喜欢的实现方式。建议的方法是使用 query-string 库。

```js
const queryString = require('query-string');
const parsed = queryString.parse(props.location.search);
```

如果你想要使用原生 API 的话，你也可以使用 URLSearchParams ：

```js
const params = new URLSearchParams(props.location.search)
const foo = params.get('name')
```

如果使用 URLSearchParams 的话您应该为 IE11 使用polyfill。

### 为什么你会得到 "Router may have only one child element" 警告?

此警告的意思是Router组件下仅能包含一个子节点。

你必须将你的 Route 包装在<Switch>块中，因为<Switch>是唯一的，它只提供一个路由。

首先，您需要在导入中添加Switch：

```js
import { Switch, Router, Route } from 'react-router'

```
然后在<Switch>块中定义路由：

```js
<Router>
  <Switch>
    <Route {/* ... */} />
    <Route {/* ... */} />
  </Switch>
</Router>

```

### 如何在 React Router v4 中将 params 传递给 history.push 方法?

在导航时，您可以将 props 传递给history对象：

```js
this.props.history.push({
  pathname: '/template',
  search: '?name=sudheer',
  state: { detail: response.data }
})
```

search属性用于在push()方法中传递查询参数。

### search属性用于在push()方法中传递查询参数。

<Switch>呈现匹配的第一个孩子<Route>。 没有路径的<Route>总是匹配。所以你只需要简单地删除 path 属性，如下所示：

```js
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/user" component={User}/>
  <Route component={NotFound} />
</Switch>
```

### 如何在 React Router v4 上获取历史对象?

#### 创建一个导出history对象的模块，并在整个项目中导入该模块。

例如， 创建history.js文件:

```js
import { createBrowserHistory } from 'history'

export default createBrowserHistory({
  /* pass a configuration object here if needed */
})
```

#### 应该使用<Router>组件而不是内置路由器。在index.js文件中导入上面的history.js：

```js
import { Router } from 'react-router-dom'
import history from './history'
import App from './App'

ReactDOM.render((
  <Router history={history}>
    <App />
  </Router>
), holder)
```

#### 您还可以使用类似于内置历史对象的history对象的push方法：

```js
// some-other-file.js
import history from './history'

history.push('/go-here')
```