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




