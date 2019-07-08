## react 第四部分

### 为什么 isMounted() 是一个反模式，而正确的解决方案是什么?

isMounted() 的主要场景是避免在组件卸载后调用 setState()，因为它会发出警告。

```js
if (this.isMounted()) {
  this.setState({...})
}

```

在调用 setState() 之前检查 isMounted() 会消除警告，但也会破坏警告的目的。使用 isMounted() 有一种代码味道，因为你要检查的唯一原因是你认为在卸载组件后可能持有引用。

最佳解决方案是找到在组件卸载后调用 setState() 的位置，并修复它们。这种情况最常发生在回调中，即组件正在等待某些数据并在数据到达之前卸载。理想情况下，在卸载之前，应在 componentWillUnmount() 中取消任何回调。

### 为什么组件名称应该以大写字母开头?

如果使用 JSX 渲染组件，则该组件的名称必须以大写字母开头，否则 React 将会抛出无法识别标签的错误。这种约定是因为只有 HTML 元素和 SVG 标签可以以小写字母开头。

定义组件类的时候，你可以以小写字母开头，但在导入时应该使用大写字母。

```js
class myComponent extends Component {
  render() {
    return <div />
  }
}

export default myComponent
```

当在另一个文件导入时，应该以大写字母开头：

```js
import MyComponent from './MyComponent'
```

### 在 React v16 中是否支持自定义 DOM 属性?

是的，在过去 React 会忽略未知的 DOM 属性。如果你编写的 JSX 属性 React 无法识别，那么 React 将跳过它。例如

```html
<div mycustomattribute={'something'} />
```
在 React 15 中将在 DOM 中渲染一个空的 div：

```html
<div />
```

在 React 16 中，任何未知的属性都将会在 DOM 显示：

```html
<div mycustomattribute='something' />
```

### constructor 和 getInitialState 有什么区别?

当使用 ES6 类时，你应该在构造函数中初始化状态，而当你使用 React.createClass() 时，就需要使用 getInitialState() 方法。

使用 ES6 类:

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { /* initial state */ }
  }
}
```

使用 React.createClass():

```js
const MyComponent = React.createClass({
  getInitialState() {
    return { /* initial state */ }
  }
})
```

注意： 在 React v16 中 React.createClass() 已被弃用和删除，请改用普通的 JavaScript 类。

### 是否可以在不调用 setState 方法的情况下，强制组件重新渲染?

默认情况下，当组件的状态或属性改变时，组件将重新渲染。如果你的 render() 方法依赖于其他数据，你可以通过调用 forceUpdate() 来告诉 React，当前组件需要重新渲染

```js
component.forceUpdate(callback)
```

建议避免使用 forceUpdate()，并且只在 render() 方法中读取 this.props 和 this.state。

### 在使用 ES6 类的 React 中 super() 和 super(props) 有什么区别?

当你想要在 constructor() 函数中访问 this.props，你需要将 props 传递给 super() 方法。

使用 super(props):

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { name: 'John', ... }
  }
}
```

使用 super():

```js
class MyComponent extends React.Component {
  constructor(props) {
    super()
    console.log(this.props) // undefined
  }
}
```

在 constructor() 函数之外，访问 this.props 属性会显示相同的值。

### 在 JSX 中如何进行循环?

你只需使用带有 ES6 箭头函数语法的 Array.prototype.map 即可。例如，items 对象数组将会被映射成一个组件数组：

```html
<tbody>
  {items.map(item => <SomeComponent key={item.id} name={item.name} />)}
</tbody>
```

你不能使用 for 循环进行迭代：

```html
<tbody>
  for (let i = 0; i < items.length; i++) {
    <SomeComponent key={items[i].id} name={items[i].name} />
  }
</tbody>
```

这是因为 JSX 标签会被转换成函数调用，并且你不能在表达式中使用语句。但这可能会由于 do 表达式而改变，它们是第一阶段提案。

### 如何在 attribute 引号中访问 props 属性?

React (或 JSX) 不支持属性值内的变量插值。下面的形式将不起作用：

```html
<img className='image' src='images/{this.props.image}' />
```

但你可以将 JS 表达式作为属性值放在大括号内。所以下面的表达式是有效的：

```js
<img className='image' src={'images/' + this.props.image} />
```

使用模板字符串也是可以的：

```js
<img className='image' src={`images/${this.props.image}`} />
```

### 什么是 React proptype 数组?

如果你要规范具有特定对象格式的数组的属性，请使用 React.PropTypes.shape() 作为 React.PropTypes.arrayOf() 的参数。

```js
ReactComponent.propTypes = {
  arrayWithShape: React.PropTypes.arrayOf(React.PropTypes.shape({
    color: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.number.isRequired
  })).isRequired
}

```

### 如何有条件地应用样式类?

你不应该在引号内使用大括号，因为它将被计算为字符串。

```js
<div className="btn-panel {this.props.visible ? 'show' : 'hidden'}">
```

相反，你需要将大括号移到外部（不要忘记在类名之间添加空格）：

```js
<div className={'btn-panel ' + (this.props.visible ? 'show' : 'hidden')}>
```

模板字符串也可以工作：

```js
<div className={`btn-panel ${this.props.visible ? 'show' : 'hidden'}`}>
```

### React 和 ReactDOM 之间有什么区别?

react 包中包含 React.createElement(), React.Component, React.Children，以及与元素和组件类相关的其他帮助程序。你可以将这些视为构建组件所需的同构或通用帮助程序。react-dom 包中包含了 ReactDOM.render()，在 react-dom/server 包中有支持服务端渲染的 ReactDOMServer.renderToString() 和 ReactDOMServer.renderToStaticMarkup() 方法。

### 为什么 ReactDOM 从 React 分离出来?

React 团队致力于将所有的与 DOM 相关的特性抽取到一个名为 ReactDOM 的独立库中。React v0.14 是第一个拆分后的版本。通过查看一些软件包，react-native，react-art，react-canvas，和 react-three，很明显，React 的优雅和本质与浏览器或 DOM 无关。为了构建更多 React 能应用的环境，React 团队计划将主要的 React 包拆分成两个：react 和 react-dom。这为编写可以在 React 和 React Native 的 Web 版本之间共享的组件铺平了道路。

### 如何使用 React label 元素?

如果你尝试使用标准的 for 属性将 <label> 元素绑定到文本输入框，那么在控制台将会打印缺少 HTML 属性的警告消息。

```js
<label for={'user'}>{'User'}</label>
<input type={'text'} id={'user'} />
```

因为 for 是 JavaScript 的保留字，请使用 htmlFor 来替代。

```js
<label htmlFor={'user'}>{'User'}</label>
<input type={'text'} id={'user'} />

```

### 如何合并多个内联的样式对象?

在 React 中，你可以使用扩展运算符:

```html
 <button style={{...styles.panel.button, ...styles.panel.submitButton}}>{'Submit'}</button>
```

如果你使用的是 React Native，则可以使用数组表示法：

```html
<button style={[styles.panel.button, styles.panel.submitButton]}>{'Submit'}</button>

```

### 如何在调整浏览器大小时重新渲染视图?

```jsx
class WindowDimensions extends React.Component {
  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()})
  }

  render() {
    return <span>{this.state.width} x {this.state.height}</span>
  }
}
```

### setState() 和 replaceState() 方法之间有什么区别?

当你使用 setState() 时，当前和先前的状态将被合并。replaceState() 会抛出当前状态，并仅用你提供的内容替换它。通常使用 setState()，除非你出于某种原因确实需要删除所有以前的键。你还可以在 setState() 中将状态设置为 false/null，而不是使用 replaceState()。

### 如何监听状态变化?

当状态更改时将调用以下生命周期方法。你可以将提供的状态和属性值与当前状态和属性值进行比较，以确定是否发生了有意义的改变。

```js
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
```

### 在 React 状态中删除数组元素的推荐方法是什么?

更好的方法是使用 Array.prototype.filter() 方法。

例如，让我们创建用于更新状态的 removeItem() 方法。

```js
removeItem(index) {
  this.setState({
    data: this.state.data.filter((item, i) => i !== index)
  })
}
```

### 在 React 中是否可以不在页面上渲染 HTML 内容?

可以使用最新的版本 (>=16.2)，以下是可能的选项：

```js
render() {
  return false
}

render() {
  return null
}

render() {
  return []
}

render() {
  return <React.Fragment></React.Fragment>
}

render() {
  return <></>
}
```
### 如何用 React 漂亮地显示 JSON?

我们可以使用 <pre> 标签，以便保留 JSON.stringify() 的格式：

```js
const data = { name: 'John', age: 42 }

class User extends React.Component {
  render() {
    return (
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }
}

React.render(<User />, document.getElementById('container'))
```

### 为什么你不能更新 React 中的 props?

React 的哲学是 props 应该是 immutable 和 top-down。这意味着父级可以向子级发送任何属性值，但子级不能修改接收到的属性。

### 如何在页面加载时聚焦一个输入元素?

你可以为 input 元素创建一个 ref，然后在 componentDidMount() 方法中使用它：

```js
class App extends React.Component{
  componentDidMount() {
    this.nameInput.focus()
  }

  render() {
    return (
      <div>
        <input
          defaultValue={'Won\'t focus'}
        />
        <input
          ref={(input) => this.nameInput = input}
          defaultValue={'Will focus'}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

### 更新状态中的对象有哪些可能的方法?

用一个对象调用 setState() 来与状态合并：

使用 Object.assign() 创建对象的副本：

```js
const user = Object.assign({}, this.state.user, { age: 42 })
this.setState({ user })
```

使用扩展运算符：

```js
const user = { ...this.state.user, age: 42 }
this.setState({ user })
```

使用一个函数调用 setState()：

```js
this.setState(prevState => ({
  user: {
    ...prevState.user,
    age: 42
  }
}))
```

### 为什么函数比对象更适合于 setState()?

出于性能考虑，React 可能将多个 setState() 调用合并成单个更新。这是因为我们可以异步更新 this.props 和 this.state，所以不应该依赖它们的值来计算下一个状态。

以下的 counter 示例将无法按预期更新：
```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
})
```

首选方法是使用函数而不是对象调用 setState()。该函数将前一个状态作为第一个参数，当前时刻的 props 作为第二个参数。

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}))

```

### 我们如何在浏览器中找到当前正在运行的 React 版本?

你可以使用 React.version 来获取版本：

```js
const REACT_VERSION = React.version

ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById('app')
)
```

### 在 create-react-app 项目中导入 polyfills 的方法有哪些?

从 core-js 中手动导入:

创建一个名为 polyfills.js 文件，并在根目录下的 index.js 文件中导入它。运行 npm install core-js 或 yarn add core-js 并导入你所需的功能特性：

```js
import 'core-js/fn/array/find'
import 'core-js/fn/array/includes'
import 'core-js/fn/number/is-nan'
```

使用 Polyfill 服务:

通过将以下内容添加到 index.html 中来获取自定义的特定于浏览器的 polyfill：

```js
<script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes'></script>

```

在上面的脚本中，我们必须显式地请求 Array.prototype.includes 特性，因为它没有被包含在默认的特性集中。

### 如何在 create-react-app 中使用 https 而不是 http?

你只需要使用 HTTPS=true 配置。你可以编辑 package.json 中的 scripts 部分：

```js
"scripts": {
  "start": "set HTTPS=true && react-scripts start"
}
```

### 如何避免在 create-react-app 中使用相对路径导入?

在项目的根目录中创建一个名为 .env 的文件，并写入导入路径：

```js
NODE_PATH=src/app
```

### 如何为 React Router 添加 Google Analytics?

在 history 对象上添加一个监听器以记录每个页面的访问：

```js
history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search)
  window.ga('send', 'pageview', location.pathname + location.search)
})
```

### 如何每秒更新一个组件?

你需要使用 setInterval() 来触发更改，但也需要在组件卸载时清除计时器，以防止错误和内存泄漏。

```js
componentDidMount() {
  this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000)
}

componentWillUnmount() {
  clearInterval(this.interval)
}
```

### 如何将 vendor prefixes 应用于 React 中的内联样式?

React不会自动应用 vendor prefixes，你需要手动添加 vendor prefixes。

```js
<div style={{
  transform: 'rotate(90deg)',
  WebkitTransform: 'rotate(90deg)', // note the capital 'W' here
  msTransform: 'rotate(90deg)' // 'ms' is the only lowercase vendor prefix
}} />
```

### 如何使用 React 和 ES6 导入和导出组件?

导出组件时，你应该使用默认导出：

```js
import React from 'react'
import User from 'user'

export default class MyProfile extends React.Component {
  render(){
    return (
      <User type="customer">
        //...
      </User>
    )
  }
}
```

使用 export 说明符，MyProfile 将成为成员并导出到此模块，此外在其他组件中你无需指定名称就可以导入相同的内容。

### 为什么 React 组件名称必须以大写字母开头?

在 JSX 中，小写标签被认为是 HTML 标签。但是，含有 . 的大写和小写标签名却不是。

```html
<component /> 将被转换为 React.createElement('component') (i.e, HTML 标签)
<obj.component /> 将被转换为 React.createElement(obj.component)
<Component /> 将被转换为 React.createElement(Component)
```

### 为什么组件的构造函数只被调用一次?

React 协调算法假设如果自定义组件出现在后续渲染的相同位置，则它与之前的组件相同，因此重用前一个实例而不是创建新实例。

### 在 React 中如何定义常量?

你可以使用 ES7 的 static 来定义常量。

```js
class MyComponent extends React.Component {
  static DEFAULT_PAGINATION = 10
}

```

###  React 中如何以编程方式触发点击事件?

你可以使用 ref 属性通过回调函数获取对底层的 HTMLinputeElement 对象的引用，并将该引用存储为类属性，之后你就可以利用该引用在事件回调函数中， 使用 HTMLElement.click 方法触发一个点击事件。这可以分为两个步骤：

在 render 方法创建一个 ref：

```html
<input ref={input => this.inputElement = input} />
```

在事件处理器中触发点击事件

```js
this.inputElement.click()
```

### 在 React 中是否可以使用 async/await?

如果要在 React 中使用 async/await，则需要 Babel 和 transform-async-to-generator 插件。

### 最流行的动画软件包是什么?

React Transition Group 和 React Motion 是React生态系统中流行的动画包。

### 模块化样式文件有什么好处?

建议避免在组件中对样式值进行硬编码。任何可能在不同的 UI 组件之间使用的值都应该提取到它们自己的模块中。

例如，可以将这些样式提取到单独的组件中：

```js
export const colors = {
  white,
  black,
  blue
}

export const space = [
  0,
  8,
  16,
  32,
  64
]
```

### 什么是 React 流行的特定 linters?

ESLint 是一个流行的 JavaScript linter。有一些插件可以分析特定的代码样式。在 React 中最常见的一个是名为 eslint-plugin-react npm 包。默认情况下，它将使用规则检查许多最佳实践，检查内容从迭代器中的键到一组完整的 prop 类型。另一个流行的插件是 eslint-plugin-jsx-a11y，它将帮助修复可访问性的常见问题。由于 JSX 提供的语法与常规 HTML 略有不同，因此常规插件无法获取 alt 文本和 tabindex 的问题。

### 如何发起 AJAX 调用以及应该在哪些组件生命周期方法中进行 AJAX 调用?

你可以使用 AJAX 库，如 Axios，jQuery AJAX 和浏览器内置的 fetch API。你应该在 componentDidMount() 生命周期方法中获取数据。这样当获取到数据的时候，你就可以使用 setState() 方法来更新你的组件。

例如，从 API 中获取员工列表并设置本地状态：

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      error: null
    }
  }

  componentDidMount() {
    fetch('https://api.example.com/items')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employees: result.employees
          })
        },
        (error) => {
          this.setState({ error })
        }
      )
  }

  render() {
    const { error, employees } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <ul>
          {employees.map(item => (
            <li key={employee.name}>
              {employee.name}-{employees.experience}
            </li>
          ))}
        </ul>
      )
    }
  }
}
```