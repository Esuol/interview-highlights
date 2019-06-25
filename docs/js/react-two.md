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

