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
### 如何在 React 中使用样式?

style 属性接受含有 camelCased（驼峰）属性的 JavaScript 对象，而不是 CSS 字符串。这与 DOM 样式中的 JavaScript 属性一致，效率更高，并且可以防止 XSS 安全漏洞。

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')'
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>
}
```

为了与在 JavaScript 中访问 DOM 节点上的属性保持一致，样式键采用了 camelcased（例如node.style.backgroundImage）。

### 在 React 中事件有何不同?

处理 React 元素中的事件有一些语法差异：

React 事件处理程序是采用驼峰而不是小写来命名的。

使用 JSX，你将传递一个函数作为事件处理程序，而不是字符串。


### 如果在构造函数中使用 setState() 会发生什么?

当你使用 setState() 时，除了设置状态对象之外，React 还会重新渲染组件及其所有的子组件。你会得到这样的错误：Can only update a mounted or mounting component.。因此我们需要在构造函数中使用 this.state 初始化状态。

### 索引作为键的影响是什么?

Keys 应该是稳定的，可预测的和唯一的，这样 React 就能够跟踪元素。

在下面的代码片段中，每个元素的键将基于列表项的顺序，而不是绑定到即将展示的数据上。这将限制 React 能够实现的优化。

```js
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}
```

假设 todo.id 对此列表是唯一且稳定的，如果将此数据作为唯一键，那么 React 将能够对元素进行重新排序，而无需重新创建它们。

```js
{todos.map((todo) =>
  <Todo {...todo}
    key={todo.id} />
)}

```

### 在 componentWillMount() 方法中使用 setState() 好吗?

建议避免在 componentWillMount() 生命周期方法中执行异步初始化。在 mounting 发生之前会立即调用 componentWillMount()，且它在 render() 之前被调用，因此在此方法中更新状态将不会触发重新渲染。应避免在此方法中引入任何副作用或订阅操作。我们需要确保对组件初始化的异步调用发生在 componentDidMount() 中，而不是在 componentWillMount() 中。

```js
componentDidMount() {
  axios.get(`api/todos`)
    .then((result) => {
      this.setState({
        messages: [...result.data]
      })
    })
}
```

### 如果在初始状态中使用 props 属性会发生什么?

如果在不刷新组件的情况下更改组件上的属性，则不会显示新的属性值，因为构造函数函数永远不会更新组件的当前状态。只有在首次创建组件时才会用 props 属性初始化状态。

以下组件将不显示更新的输入值：

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      records: [],
      inputValue: this.props.inputValue
    };
  }

  render() {
    return <div>{this.state.inputValue}</div>
  }
}
```

在 render 方法使用使用 props 将会显示更新的值：

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      record: []
    }
  }

  render() {
    return <div>{this.props.inputValue}</div>
  }
}
```

### 如何有条件地渲染组件?

在某些情况下，你希望根据某些状态渲染不同的组件。 JSX 不会渲染 false 或 undefined，因此你可以使用 && 运算符，在某个条件为 true 时，渲染组件中指定的内容。

```js
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address &&
      <p>{address}</p>
    }
  </div>
)
```

如果你需要一个 if-else 条件，那么使用三元运算符：

```js
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address
      ? <p>{address}</p>
      : <p>{'Address is not available'}</p>
    }
  </div>
)
```

### 为什么在 DOM 元素上展开 props 需要小心?

当我们展开属性时，我们会遇到添加未知 HTML 属性的风险，这是一种不好的做法。相反，我们可以使用属性解构和...rest 运算符，因此它只添加所需的 props 属性。例如，

```js
const ComponentA = () =>
  <ComponentB isDisplay={true} className={'componentStyle'} />

const ComponentB = ({ isDisplay, ...domProps }) =>
  <div {...domProps}>{'ComponentB'}</div>
```

### 在 React 中如何使用装饰器?

你可以装饰你的类组件，这与将组件传递到函数中是一样的。 装饰器是修改组件功能灵活且易读的方式。

```js
@setTitle('Profile')
class Profile extends React.Component {
    //....
}

/*
  title is a string that will be set as a document title
  WrappedComponent is what our decorator will receive when
  put directly above a component class as seen in the example above
*/
const setTitle = (title) => (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
```

### 如何 memoize（记忆）组件?

有可用于函数组件的 memoize 库。例如 moize 库可以将组件存储在另一个组件中。

```js
import moize from 'moize'
import Component from './components/Component' // this module exports a non-memoized component

const MemoizedFoo = moize.react(Component)

const Consumer = () => {
  <div>
    {'I will memoize the following entry:'}
    <MemoizedFoo/>
  </div>
}
```

### 如何实现 Server Side Rendering 或 SSR?

React 已经配备了用于处理 Node 服务器上页面渲染的功能。你可以使用特殊版本的 DOM 渲染器，它遵循与客户端相同的模式。

```js
import ReactDOMServer from 'react-dom/server'
import App from './App'

ReactDOMServer.renderToString(<App />)
```

此方法将以字符串形式输出常规 HTML，然后将其作为服务器响应的一部分放在页面正文中。在客户端，React 检测预渲染的内容并无缝地衔接。

### 如何在 React 中启用生产模式?

你应该使用 Webpack 的 DefinePlugin 方法将 NODE_ENV 设置为 production，通过它你可以去除 propType 验证和额外警告等内容。除此之外，如果你压缩代码，如使用 Uglify 的死代码消除，以去掉用于开发的代码和注释，它将大大减少包的大小。

### 什么是 CRA 及其好处?

create-react-app CLI 工具允许你无需配置步骤，快速创建和运行 React 应用。

让我们使用 CRA 来创建 Todo 应用：

```txt
# Installation
$ npm install -g create-react-app

# Create new project
$ create-react-app todo-app
$ cd todo-app

# Build, test and run
$ npm run build
$ npm run test
$ npm start
```
它包含了构建 React 应用程序所需的一切：

React, JSX, ES6, 和 Flow 语法支持。

ES6 之外的语言附加功能，比如对象扩展运算符。

Autoprefixed CSS，因此你不在需要 -webkit- 或其他前缀。

一个快速的交互式单元测试运行程序，内置了对覆盖率报告的支持。

一个实时开发服务器，用于警告常见错误。

一个构建脚本，用于打包用于生产中包含 hashes 和 sourcemaps 的 JS、CSS 和 Images 文件。

### 在 mounting 阶段生命周期方法的执行顺序是什么?

在创建组件的实例并将其插入到 DOM 中时，将按以下顺序调用生命周期方法。

constructor()

static getDerivedStateFromProps()

render()

componentDidMount()

### 在 React v16 中，哪些生命周期方法将被弃用?

以下生命周期方法将成为不安全的编码实践，并且在异步渲染方面会更有问题。

componentWillMount()

componentWillReceiveProps()

componentWillUpdate()

从 React v16.3 开始，这些方法使用 UNSAFE_ 前缀作为别名，未加前缀的版本将在 React v17 中被移除。

### 生命周期方法 getDerivedStateFromProps() 的目的是什么?

新的静态 getDerivedStateFromProps() 生命周期方法在实例化组件之后以及重新渲染组件之前调用。它可以返回一个对象用于更新状态，或者返回 null 指示新的属性不需要任何状态更新。

```js
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
```
此生命周期方法与 componentDidUpdate() 一起涵盖了 componentWillReceiveProps() 的所有用例。

### 生命周期方法 getSnapshotBeforeUpdate() 的目的是什么?

新的 getSnapshotBeforeUpdate() 生命周期方法在 DOM 更新之前被调用。此方法的返回值将作为第三个参数传递给componentDidUpdate()。

```js
class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
```

此生命周期方法与 componentDidUpdate() 一起涵盖了 componentWillUpdate() 的所有用例。

### createElement() 和 cloneElement() 方法有什么区别?

SX 元素将被转换为 React.createElement() 函数来创建 React 元素，这些对象将用于表示 UI 对象。而 cloneElement 用于克隆元素并传递新的属性。

### 推荐的组件命名方法是什么?

建议通过引用命名组件，而不是使用 displayName。

使用 displayName 命名组件:

```js
export default React.createClass({
  displayName: 'TodoApp',
  // ...
})
```

推荐的方式：

```js
export default class TodoApp extends React.Component {
  // ...
}```

### 什么是 switching 组件?

switching 组件是渲染多个组件之一的组件。我们需要使用对象将 prop 映射到组件中。

例如，以下的 switching 组件将基于 page 属性显示不同的页面：

```js
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ServicesPage from './ServicesPage'
import ContactPage from './ContactPage'

const PAGES = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  contact: ContactPage
}

const Page = (props) => {
  const Handler = PAGES[props.page] || ContactPage

  return <Handler {...props} />
}

// The keys of the PAGES object can be used in the prop types to catch dev-time errors.
Page.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired
}
```

### 为什么我们需要将函数传递给 setState() 方法?

这背后的原因是 setState() 是一个异步操作。出于性能原因，React 会对状态更改进行批处理，因此在调用 setState() 方法之后，状态可能不会立即更改。这意味着当你调用 setState() 方法时，你不应该依赖当前状态，因为你不能确定当前状态应该是什么。这个问题的解决方案是将一个函数传递给 setState()，该函数会以上一个状态作为参数。通过这样做，你可以避免由于 setState() 的异步性质而导致用户在访问时获取旧状态值的问题。

假设初始计数值为零。在连续三次增加操作之后，该值将只增加一个。

```js
// assuming this.state.count === 0
this.setState({ count: this.state.count + 1 })
this.setState({ count: this.state.count + 1 })
this.setState({ count: this.state.count + 1 })
// this.state.count === 1, not 3
```

如果将函数传递给 setState()，则 count 将正确递增。

```js
this.setState((prevState, props) => ({
  count: prevState.count + props.increment
}))
// this.state.count === 3 as expected
```





