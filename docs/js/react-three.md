## React 第三部分

### 在 React 中如何校验 props 属性?

当应用程序以开发模式运行的时，React 将会自动检查我们在组件上设置的所有属性，以确保它们具有正确的类型。如果类型不正确，React 将在控制台中生成警告信息。由于性能影响，它在生产模式下被禁用。使用 isRequired 定义必填属性。

预定义的 prop 类型：

```txt
PropTypes.number
PropTypes.string
PropTypes.array
PropTypes.object
PropTypes.func
PropTypes.node
PropTypes.element
PropTypes.bool
PropTypes.symbol
PropTypes.any
```

我们可以为 User 组件定义 propTypes，如下所示：

```js
import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }

  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    )
  }
}
```

### React 的优点是什么?

使用 Virtual DOM 提高应用程序的性能。

JSX 使代码易于读写。

它支持在客户端和服务端渲染。

易于与框架（Angular，Backbone）集成，因为它只是一个视图库。

使用 Jest 等工具轻松编写单元与集成测试。

### React 的局限性是什么?

React 只是一个视图库，而不是一个完整的框架。

对于 Web 开发初学者来说，有一个学习曲线。

将 React 集成到传统的 MVC 框架中需要一些额外的配置。

代码复杂性随着内联模板和 JSX 的增加而增加。

如果有太多的小组件可能增加项目的庞大和复杂。

### 在 React v16 中的错误边界是什么?

错误边界是在其子组件树中的任何位置捕获 JavaScript 错误、记录这些错误并显示回退 UI 而不是崩溃的组件树的组件。

如果一个类组件定义了一个名为 componentDidCatch(error, info) 或 static getDerivedStateFromError() 新的生命周期方法，则该类组件将成为错误边界：

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info)
  }

  static getDerivedStateFromError(error) {
     // Update state so the next render will show the fallback UI.
     return { hasError: true };
   }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{'Something went wrong.'}</h1>
    }
    return this.props.children
  }
}
```

之后，将其作为常规组件使用：

```html
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

### 静态类型检查推荐的方法是什么?

通常，我们使用 PropTypes 库（在 React v15.5 之后 React.PropTypes 被移动到了 prop-types 包中），在 React 应用程序中执行类型检查。对于大型项目，建议使用静态类型检查器，比如 Flow 或 TypeScript，它们在编译时执行类型检查并提供 auto-completion 功能。

### react-dom 包的用途是什么?

react-dom 包提供了特定的 DOM 方法，可以在应用程序的顶层使用。大多数的组件不需要使用此模块。该模块中提供的一些方法如下：

render()

hydrate()

unmountComponentAtNode()

findDOMNode()

createPortal()

### react-dom 中 render 方法的目的是什么?

此方法用于将 React 元素渲染到所提供容器中的 DOM 结构中，并返回对组件的引用。如果 React 元素之前已被渲染到容器中，它将对其执行更新，并且只在需要时改变 DOM 以反映最新的更改。

```JS
ReactDOM.render(element, container[, callback])
```

如果提供了可选的回调函数，该函数将在组件被渲染或更新后执行。

### ReactDOMServer 是什么?

ReactDOMServer 对象使你能够将组件渲染为静态标记（通常用于 Node 服务器中），此对象主要用于服务端渲染（SSR）。以下方法可用于服务器和浏览器环境：

```js
renderToString()
renderToStaticMarkup()
```

例如，你通常运行基于 Node 的 Web 服务器，如 Express，Hapi 或 Koa，然后你调用 renderToString 将根组件渲染为字符串，然后作为响应进行发送。

```js
// using Express
import { renderToString } from 'react-dom/server'
import MyPage from './MyPage'

app.get('/', (req, res) => {
  res.write('<!DOCTYPE html><html><head><title>My Page</title></head><body>')
  res.write('<div id="content">')
  res.write(renderToString(<MyPage/>))
  res.write('</div></body></html>')
  res.end()
})
```

### 在 React 中如何使用 innerHTML?

dangerouslySetInnerHTML 属性是 React 用来替代在浏览器 DOM 中使用 innerHTML。与 innerHTML 一样，考虑到跨站脚本攻击（XSS），使用此属性也是有风险的。使用时，你只需传递以 __html 作为键，而 HTML 文本作为对应值的对象。

在本示例中 MyComponent 组件使用 dangerouslySetInnerHTML 属性来设置 HTML 标记：

```js
function createMarkup() {
  return { __html: 'First &middot; Second' }
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />
}
```