## React two

### 回调函数作为 setState() 参数的目的是什么?

当 setState 完成和组件渲染后，回调函数将会被调用。由于 setState() 是异步的，回调函数用于任何后续的操作。

注意： 建议使用生命周期方法而不是此回调函数。

```js
setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'))
```
#### 要点1

所以第一个使用要点就是：如果你需要基于最新的state做业务的话，可以在componentDidUpdate或者setState的回调函数里获取。(注：官方推荐第一种做法)

```js
// setState回调函数
changeTitle: function (event) {
  this.setState({ title: event.target.value }, () => this.APICallFunction());
},
APICallFunction: function () {
  // Call API with the updated value
}
```

#### 要点2

设想有一个需求，需要在在onClick里累加两次，如下

```js
 onClick = () => {
    this.setState({ index: this.state.index + 1 });
    this.setState({ index: this.state.index + 1 });
  }
```

在react眼中，这个方法最终会变成

```js
Object.assign(
  previousState,
  {index: state.index+ 1},
  {index: state.index+ 1},
  ...
)
```

于后面的数据会覆盖前面的更改，所以最终只加了一次.所以如果是下一个state依赖前一个state的话，推荐给setState传function

```js
onClick = () => {
    this.setState((prevState, props) => {
      return {quantity: prevState.quantity + 1};
    });
    this.setState((prevState, props) => {
      return {quantity: prevState.quantity + 1};
    });
}
```

以上是使用setState的两个注意事项，接下来我们来看看setState被调用之后，更新组件的过程，下面是一个简单的流程图。

<img :src="$withBase('/img/setState')" />


### HTML 和 React 事件处理有什么区别?

在 HTML 中事件名必须小写：

```html
<button onclick='activateLasers()'>
```
而在 React 中它遵循 camelCase (驼峰) 惯例：

```html
<button onClick={activateLasers}>
```
在 HTML 中你可以返回 false 以阻止默认的行为：在 HTML 中你可以返回 false 以阻止默认的行为：

```html
<a href='#' onclick='console.log("The link was clicked."); return false;' />
```

而在 React 中你必须地明确地调用 preventDefault() ：

```js
function handleClick(event) {
  event.preventDefault()
  console.log('The link was clicked.')
}
```

### 如何在 JSX 回调中绑定方法或事件处理程序?

1 Binding in Constructor: 在 JavaScript 类中，方法默认不被绑定。这也适用于定义为类方法的 React 事件处理程序。通常我们在构造函数中绑定它们。

```js
class Component extends React.Componenet {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    // ...
  }
}
```

2 Public class fields syntax: 如果你不喜欢 bind 方案，则可以使用 public class fields syntax 正确绑定回调。

```js
handleClick = () => {
  console.log('this is:', this)
}
```

3 Arrow functions in callbacks: 你可以在回调函数中直接使用 arrow functions。

```html
<button onClick={(event) => this.handleClick(event)}>
  {'Click me'}
</button>
```

### refs 有什么用?

ref 用于返回对元素的引用。但在大多数情况下，应该避免使用它们。当你需要直接访问 DOM 元素或组件的实例时，它们可能非常有用。

### 如何创建 refs?

1 这是最近增加的一种方案。Refs 是使用 React.createRef() 方法创建的，并通过 ref 属性添加到 React 元素上。为了在整个组件中使用refs，只需将 ref 分配给构造函数中的实例属性。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```
2 你也可以使用 ref 回调函数的方案，而不用考虑 React 版本。例如，访问搜索栏组件中的 input 元素如下：

```js
class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.txtSearch = null;
      this.state = { term: '' };
      this.setInputSearchRef = e => {
         this.txtSearch = e;
      }
   }

   onInputChange(event) {
      this.setState({ term: this.txtSearch.value });
   }

   render() {
      return (
         <input
            value={this.state.term}
            onChange={this.onInputChange.bind(this)}
            ref={this.setInputSearchRef} />
      );
   }
}
```

### 什么是 forward refs?

Ref forwarding 是一个特性，它允许一些组件获取接收到 ref 对象并将它进一步传递给子组件。

```js
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
const ref = React.createRef();
<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>
```

### callback refs 和 findDOMNode() 哪一个是首选选项?

最好是使用 callback refs 而不是 findDOMNode() API。因为 findDOMNode() 阻碍了将来对 React 的某些改进。

使用 findDOMNode 已弃用的方案：

```js
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView()
  }

  render() {
    return <div />
  }
}

```
推荐的方案是：

```js
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView()
  }

  render() {
    return <div ref={node => this.node = node} />
  }
}
```

### 为什么 String Refs 被弃用?

如果你以前使用过 React，你可能会熟悉旧的 API，其中的 ref 属性是字符串，如 ref={'textInput'}，并且 DOM 节点的访问方式为this.refs.textInput。我们建议不要这样做，因为字符串引用有以下问题，并且被认为是遗留问题。字符串 refs 在 React v16 版本中被移除。

它们强制 React 跟踪当前执行的组件。这是有问题的，因为它使 React 模块有状态，这会导致在 bundle 中复制 React 模块时会导致奇怪的错误。

它们是不可组合的 - 如果一个库把一个 ref 传给子元素，则用户无法对其设置另一个引用。

它们不能与静态分析工具一起使用，如 Flow。Flow 无法猜测出 this.refs 上的字符串引用的作用及其类型。Callback refs 对静态分析更友好。

使用 "render callback" 模式（比如： ），它无法像大多数人预期的那样工作。

### 什么是 Virtual DOM?

Virtual DOM (VDOM) 是 Real DOM 的内存表示形式。UI 的展示形式被保存在内存中并与真实的 DOM 同步。这是在调用的渲染函数和在屏幕上显示元素之间发生的一个步骤。整个过程被称为 reconciliation。

Real DOM	            Virtual DOM
更新较慢	             更新较快
可以直接更新 HTML	      无法直接更新 HTML
如果元素更新，则创建新的  DOM	如果元素更新，则更新 JSX
DOM 操作非常昂贵	      DOM 操作非常简单
较多的内存浪费	        没有内存浪费

### Virtual DOM 如何工作?

Virtual DOM 分为三个简单的步骤。

1 每当任何底层数据发生更改时，整个 UI 都将以 Virtual DOM 的形式重新渲染。

2 然后计算先前 Virtual DOM 对象和新的 Virtual DOM 对象之间的差异。

3 一旦计算完成，真实的 DOM 将只更新实际更改的内容。