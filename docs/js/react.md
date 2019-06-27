## React 第一部分

### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么?

 不带有key，并且使用简单的模板，基于这个前提下，可以更有效的复用节点，diff速度来看也是不带key更加快速的，因为带key在增删节点上有耗时。这就是vue文档所说的默认模式。但是这个并不是key作用，而是没有key的情况下可以对节点就地复用，提高性能。

 ### key的作用

 #### 1. 更准确

  因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确
 #### 2. 更快

 用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)

 vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中（建议先了解一下diff算法过程）。
在交叉对比中，当新节点跟旧节点头尾交叉对比没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。

```js
// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}
```

创建map函数

```js
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

遍历寻找

```js
// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]

      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
```

### React 中 setState 什么时候是同步的，什么时候是异步的？

在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

**原因：**在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

### React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。

输出： 0 0 2 3

### React 的主要特点是什么?

React 的主要特性有：

考虑到真实的 DOM 操作成本很高，它使用 VirtualDOM 而不是真实的 DOM。

支持服务端渲染。

遵循单向数据流或数据绑定。

使用可复用/可组合的 UI 组件开发视图。

### 什么是 JSX?

JSX 是 ECMAScript 一个类似 XML 的语法扩展。基本上，它只是为 React.createElement() 函数提供语法糖，从而让在我们在 JavaScript 中，使用类 HTML 模板的语法，进行页面描述。

在下面的示例中，h1 内的文本标签会作为 JavaScript 函数返回给渲染函数。

```js
class App extends React.Component {
  render() {
    return(
      <div>
        <h1>{'Welcome to React world!'}</h1>
      </div>
    )
  }
```

以上示例 render 方法中的 JSX 将会被转换为以下内容：

```js
React.createElement("div", null, React.createElement(
  "h1", null, 'Welcome to React world!'));
```

### 如何在 React 中创建组件?

有两种可行的方法来创建一个组件：

Function Components: 这是创建组件最简单的方式。这些是纯 JavaScript 函数，接受 props 对象作为第一个参数并返回 React 元素：

```js
function Greeting({ message }) {
  return <h1>{`Hello, ${message}`}</h1>
}
```

Class Components: 你还可以使用 ES6 类来定义组件。上面的函数组件若使用 ES6 的类可改写为

```js
class Greeting extends React.Component {
  render() {
    return <h1>{`Hello, ${this.props.message}`}</h1>
  }
}
```

通过以上任意方式创建的组件，可以这样使用：

```js
 <Greeting message="semlinker"/>
```

在 React 内部对函数组件和类组件的处理方式是不一样的，如：

```js
  // 如果 Greeting 是一个函数
  const result = Greeting(props); // <p>Hello</p>

  // 如果 Greeting 是一个类
  const instance = new Greeting(props); // Greeting {}
  const result = instance.render(); // <p>Hello</p>
```

### 何时使用类组件和函数组件?

如果组件需要使用状态或生命周期方法，那么使用类组件，否则使用函数组件。

### 什么是 Pure Components?

React.PureComponent 与 React.Component 完全相同，只是它为你处理了 shouldComponentUpdate() 方法。当属性或状态发生变化时，PureComponent 将对属性和状态进行浅比较。另一方面，一般的组件不会将当前的属性和状态与新的属性和状态进行比较。因此，在默认情况下，每当调用 shouldComponentUpdate 时，默认返回 true，所以组件都将重新渲染。

### React 的状态是什么?

组件的状态是一个对象，它包含某些信息，这些信息可能在组件的生命周期中发生更改。我们应该尽量使状态尽可能简单，并尽量减少有状态组件的数量。让我们创建一个包含消息状态的 User 组件：

```js
class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Welcome to React world'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
```

### React 中的 props 是什么?

Props 是组件的输入。它们是单个值或包含一组值的对象，这些值在创建时使用类似于 HTML 标记属性的命名约定传递给组件。它们是从父组件传递到子组件的数据。

#### Props 的主要目的是提供以下组件功能：

将自定义数据传递到组件。

触发状态更改。

在组件的 render() 方法中通过 this.props.reactProp 使用。

### 状态和属性有什么区别?

state 和 props 都是普通的 JavaScript 对象。虽然它们都保存着影响渲染输出的信息，但它们在组件方面的功能不同。Props 以类似于函数参数的方式传递给组件，而状态则类似于在函数内声明变量并对它进行管理。


### 我们为什么不能直接更新状态?

如果你尝试直接改变状态，那么组件将不会重新渲染。

```js
//Wrong
this.state.message = 'Hello world'
```

正确方法应该是使用 setState() 方法。它调度组件状态对象的更新。当状态更改时，组件通将会重新渲染。

```js
//Correct
this.setState({ message: 'Hello World' })
```

 你可以在 constructor 中或使用最新的 JavaScript 类属性声明语法直接设置状态对象。