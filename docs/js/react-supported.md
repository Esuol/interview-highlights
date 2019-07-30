## React supported libraries & Integration

### 什么是 Reselect 以及它是如何工作的?

Reselect是一个选择器库（用于 Redux ），它使用memoization概念。它最初编写用于计算类似 Redux 的应用程序状态的派生数据，但它不能绑定到任何体系结构或库。

Reselect 保留最后一次调用的最后输入/输出的副本，并仅在其中一个输入发生更改时重新计算结果。如果连续两次提供相同的输入，则 Reselect 将返回缓存的输出。它的 memoization 和缓存是完全可定制的。

### 什么是 Flow?

Flow 是一个静态类型检查器，旨在查找 JavaScript 中的类型错误。与传统类型系统相比，Flow 类型可以表达更细粒度的区别。例如，与大多数类型系统不同，Flow 能帮助你捕获涉及 null 的错误。

### Flow 和 PropTypes 有什么区别?

Flow 是一个静态分析工具（静态检查器），它使用该语言的超集，允许你在所有代码中添加类型注释，并在编译时捕获整个类的错误。PropTypes 是一个基本类型检查器（运行时检查器），已经被添加到 React 中。除了检查传递给给定组件的属性类型外，它不能检查其他任何内容。如果你希望对整个项目进行更灵活的类型检查，那么 Flow/TypeScript 是更合适的选择。

### 在 React 中如何使用 Font Awesome 图标?

接下来的步骤将在 React 中引入 Font Awesome：

安装 font-awesome:

```js
$ npm install --save font-awesome
```

在 index.js 文件中导入 font-awesome:

```js
import 'font-awesome/css/font-awesome.min.css'
```

在 className 中添加 Font Awesome 类:
```js
render() {
  return <div><i className={'fa fa-spinner'} /></div>
}
```

### 什么 是 React 开发者工具?

React Developer Tools 允许您检查组件层次结构，包括组件属性和状态。它既可以作为浏览器扩展（用于 Chrome 和 Firefox ），也可以作为独立的应用程序（用于其他环境，包括 Safari、IE 和 React Native）。

可用于不同浏览器或环境的官方扩展。

Chrome插件

Firefox插件

独立应用 （ Safari，React Native 等）

### 在 Chrome 中为什么 DevTools 没有加载本地文件?

如果您在浏览器中打开了本地 HTML 文件（file://...），则必须先打开Chrome Extensions并选中“允许访问文件URL”。

### 如何在 React 中使用 Polymer?

创建 Polymer 元素：

```html
<link rel='import' href='../../bower_components/polymer/polymer.html' />
```
```js
Polymer({
  is: 'calender-element',
  ready: function() {
    this.textContent = 'I am a calender'
  }
})
```

通过在 HTML 文档中导入 Polymer 组件，来创建该组件对应的标签。例如，在 React 应用程序的 index.html 文件中导入。

```html
<link rel='import' href='./src/polymer-components/calender-element.html'>
```

在 JSX 文件中使用该元素：

```js
import React from 'react'

class MyComponent extends React.Component {
  render() {
    return (
      <calender-element />
    )
  }
}

export default MyComponent
```

### 与 Vue.js 相比，React 有哪些优势?
与 Vue.js 相比，React 具有以下优势：

在大型应用程序开发中提供更大的灵活性。

更容易测试。

更适合创建移动端应用程序。

提供更多的信息和解决方案。


### 为什么 React 选项卡不会显示在 DevTools 中?

当页面加载时，React DevTools设置一个名为__REACT_DEVTOOLS_GLOBAL_HOOK__的全局变量，然后 React 在初始化期间与该钩子通信。如果网站没有使用 React，或者如果 React 无法与 DevTools 通信，那么它将不会显示该选项卡。

### 什么是 Styled Components?

styled-components 是一个用于样式化 React 应用程序的 JavaScript 库。 它删除了样式和组件之间的映射，并允许您在 js 中编写 CSS。


### 举一个 Styled Components 的例子?

让我们创建具有特定样式的<Title>和<Wrapper>组件。
```js
import React from 'react'
import styled from 'styled-components'

// Create a <Title> component that renders an <h1> which is centered, red and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// Create a <Wrapper> component that renders a <section> with some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`
```
Title和Wrapper变量现在是可以像任何其他 react 组件一样渲染。

```html
<Wrapper>
  <Title>{'Lets start first styled component!'}</Title>
</Wrapper>
```

### 什么是 Relay?

Relay 是一个 JavaScript 框架，用于使用 React 视图层为 Web 应用程序提供数据层和客户端与服务器之间的通信。

### 如何在 create-react-app 中使用 TypeScript?
当您创建一个新项目带有--scripts-version选项值为react-scripts-ts时便可将 TypeScript 引入。

生成的项目结构如下所示：

my-app/
├─ .gitignore
├─ images.d.ts
├─ node_modules/
├─ public/
├─ src/
│  └─ ...
├─ package.json
├─ tsconfig.json
├─ tsconfig.prod.json
├─ tsconfig.test.json
└─ tslint.json

### 我可以导入一个 SVG 文件作为 React 组件么?

你可以直接将 SVG 作为组件导入，而不是将其作为文件加载。此功能仅在 react-scripts@2.0.0 及更高版本中可用。

```js
import { ReactComponent as Logo } from './logo.svg'

const App = () => (
  <div>
    {/* Logo is an actual react component */}
    <Logo />
  </div>
)
```

### 为什么不建议使用内联引用回调或函数?

如果将 ref 回调定义为内联函数，则在更新期间它将会被调用两次。首先使用 null 值，然后再使用 DOM 元素。这是因为每次渲染的时候都会创建一个新的函数实例，因此 React 必须清除旧的 ref 并设置新的 ref。

```js
class UserForm extends Component {
  handleSubmit = () => {
    console.log("Input Value is: ", this.input.value)
  }

  render () {
   return (
     <form onSubmit={this.handleSubmit}>
       <input
         type='text'
         ref={(input) => this.input = input} /> // Access DOM input in handle submit
       <button type='submit'>Submit</button>
     </form>
   )
 }
}

```

但我们期望的是当组件挂载时，ref 回调只会被调用一次。一个快速修复的方法是使用 ES7 类属性语法定义函数。

```js
class UserForm extends Component {
 handleSubmit = () => {
   console.log("Input Value is: ", this.input.value)
 }

 setSearchInput = (input) => {
   this.input = input
 }

 render () {
   return (
     <form onSubmit={this.handleSubmit}>
       <input
         type='text'
         ref={this.setSearchInput} /> // Access DOM input in handle submit
       <button type='submit'>Submit</button>
     </form>
   )
 }
}
```

### 在 React 中什么是渲染劫持?

渲染劫持的概念是控制一个组件将从另一个组件输出什么的能力。实际上，这意味着你可以通过将组件包装成高阶组件来装饰组件。通过包装，你可以注入额外的属性或产生其他变化，这可能会导致渲染逻辑的更改。实际上它不支持劫持，但通过使用 HOC，你可以使组件以不同的方式工作。

### 什么是 HOC 工厂实现?

在 React 中实现 HOC 有两种主要方式。 1.属性代理（PP）和 2.继承倒置（II）。他们遵循不同的方法来操纵WrappedComponent。

属性代理 在这种方法中，HOC 的 render 方法返回 WrappedComponent 类型的 React 元素。我们通过 HOC 收到 props，因此定义为属性代理。

```js
function ppHOC(WrappedComponent) {
 return class PP extends React.Component {
   render() {
     return <WrappedComponent {...this.props}/>
   }
 }
}
```

继承倒置 在这种方法中，返回的 HOC 类（Enhancer）扩展了 WrappedComponent 。它被称为继承反转，因为它不是扩展一些 Enhancer 类的 WrappedComponent，而是由 Enhancer 被动扩展。 通过这种方式，它们之间的关系似乎是逆的。

```js
function iiHOC(WrappedComponent) {
 return class Enhancer extends WrappedComponent {
   render() {
     return super.render()
   }
 }
}
```

### 如何传递数字给 React 组件?

传递数字时你应该使用 {}，而传递字符串时还需要使用引号：

```js
React.render(<User age={30} department={"IT"} />, document.getElementById('container'));
```

### 我需要将所有状态保存到 Redux 中吗？我应该使用 react 的内部状态吗?

这取决于开发者的决定。即开发人员的工作是确定应用程序的哪种状态，以及每个状态应该存在的位置，有些用户喜欢将每一个数据保存在 Redux 中，以维护其应用程序的完全可序列化和受控。其他人更喜欢在组件的内部状态内保持非关键或UI状态，例如“此下拉列表当前是否打开”。

以下是确定应将哪种数据放入Redux的主要规则：

应用程序的其他部分是否关心此数据？

您是否需要能够基于此原始数据创建更多派生数据？

是否使用相同的数据来驱动多个组件？

能够将此状态恢复到给定时间点（即时间旅行调试）是否对您有价值？

您是否要缓存数据（即，如果已经存在，则使用处于状态的状态而不是重新请求它）？

### 在 React 中 registerServiceWorker 的用途是什么?

默认情况下，React 会为你创建一个没有任何配置的 service worker。Service worker 是一个 Web API，它帮助你缓存资源和其他文件，以便当用户离线或在弱网络时，他/她仍然可以在屏幕上看到结果，因此，它可以帮助你建立更好的用户体验，这是你目前应该了解的关于 Service worker 的内容。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

### React memo 函数是什么?

当类组件的输入属性相同时，可以使用 pureComponent 或 shouldComponentUpdate 来避免组件的渲染。现在，你可以通过把函数组件包装在 React.memo 中来实现相同的功能。

```js
const MyComponent = React.memo(function MyComponent(props) {
 /* only rerenders if props change */
});
```

### React lazy 函数是什么?

使用 React.lazy 函数允许你将动态导入的组件作为常规组件进行渲染。当组件开始渲染时，它会自动加载包含 OtherComponent 的包。它必须返回一个 Promise，该 Promise 解析后为一个带有默认导出 React 组件的模块。

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
 return (
   <div>
     <OtherComponent />
   </div>
 );
}
```

注意： React.lazy 和 Suspense 还不能用于服务端渲染。如果要在服务端渲染的应用程序中进行代码拆分，我们仍然建议使用 React Loadable。

### 如何使用 setState 防止不必要的更新?

你可以把状态的当前值与已有的值进行比较，并决定是否重新渲染页面。如果没有更改，你需要返回 null 以阻止渲染，否则返回最新的状态值。例如，用户配置信息组件将按以下方式实现条件渲染：

```js
getUserProfile = user => {
  const latestAddress = user.address;
  this.setState(state => {
    if (state.address === latestAddress) {
      return null;
    } else {
      return { title: latestAddress };
    }
  });
};
```

### 如何在 React 16 版本中渲染数组、字符串和数值?

Arrays: 与旧版本不同的是，在 React 16 中你不需要确保 render 方法必须返回单个元素。通过返回数组，你可以返回多个没有包装元素的同级元素。例如，让我们看看下面的开发人员列表：

```js
const ReactJSDevs = () => {
  return [
    <li key="1">John</li>,
    <li key="2">Jackie</li>,
    <li key="3">Jordan</li>
  ];
}
```

你还可以将此数组项合并到另一个数组组件中：

```js
const JSDevs = () => {
  return (
    <ul>
      <li>Brad</li>
      <li>Brodge</li>
      <ReactJSDevs/>
      <li>Brandon</li>
    </ul>
  );
}
```

Strings and Numbers: 在 render 方法中，你也可以返回字符串和数值类型：

```js
// String
render() {
 return 'Welcome to ReactJS questions';
}
// Number
render() {
 return 2018;
}
```

### 如何在 React 类中使用类字段声明语法?

使用类字段声明可以使 React 类组件更加简洁。你可以在不使用构造函数的情况下初始化本地状态，并通过使用箭头函数声明类方法，而无需额外对它们进行绑定。让我们以一个 counter 示例来演示类字段声明，即不使用构造函数初始化状态且不进行方法绑定：

```js
class Counter extends Component {
  state = { value: 0 };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}

        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    )
  }
}

```

### 什么是 hooks?

Hooks 是一个新的草案，它允许你在不编写类的情况下使用状态和其他 React 特性。让我们来看一个 useState 钩子示例：

```js
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Hooks 需要遵循什么规则?

为了使用 hooks，你需要遵守两个规则：

仅在顶层的 React 函数调用 hooks。也就是说，你不能在循环、条件或内嵌函数中调用 hooks。这将确保每次组件渲染时都以相同的顺序调用 hooks，并且它会在多个 useState 和 useEffect 调用之间保留 hooks 的状态。

仅在 React 函数中调用 hooks。例如，你不能在常规的 JavaScript 函数中调用 hooks。


### 如何确保钩子遵循正确的使用规则?

React 团队发布了一个名为eslint-plugin-react-hooks的 ESLint 插件，它实施了这两个规则。您可以使用以下命令将此插件添加到项目中，

```t
npm install eslint-plugin-react-hooks@next
```

并在您的 ESLint 配置文件中应用以下配置：

```js
// Your ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error"
  }
}
```

### Flux 和 Redux 之间有什么区别?

以下是 Flux 和 Redux 之间的主要区别

Flux	                     Redux

状态是可变的	               状态是不可变的

Store 包含状态和更改逻辑	    存储和更改逻辑是分开的

存在多个 Store	            仅存在一个 Store

所有的 Store 都是断开连接的	  带有分层 reducers 的 Store

它有一个单独的 dispatcher	   没有 dispatcher 的概念

React 组件监测 Store	      容器组件使用连接函数

### React Router V4 有什么好处?

以下是 React Router V4 模块的主要优点：

在React Router v4（版本4）中，API完全与组件有关。路由器可以显示为单个组件（），它包装特定的子路由器组件（）。

您无需手动设置历史记录。路由器模块将通过使用组件包装路由来处理历史记录。

通过仅添加特定路由器模块（Web，core 或 native）来减少应用大小。

### 您能描述一下 componentDidCatch 生命周期方法签名吗?

在后代层级的组件抛出错误后，将调用componentDidCatch生命周期方法。该方法接收两个参数：

error: - 抛出的错误对象

info: - 具有 componentStack 键的对象，包含有关哪个组件引发错误的信息。

方法结构如下：

```js
componentDidCatch(error, info)
```

### 在哪些情况下，错误边界不会捕获错误?

以下是错误边界不起作用的情况：

在事件处理器内。

setTimeout 或 requestAnimationFrame 回调中的异步代码。

在服务端渲染期间。

错误边界代码本身中引发错误时。

### 为什么事件处理器不需要错误边界?

错误边界不会捕获事件处理程序中的错误。与 render 方法或生命周期方法不同，在渲染期间事件处理器不会被执行或调用。

如果仍然需要在事件处理程序中捕获错误，请使用下面的常规 JavaScript try/catch 语句：

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  handleClick = () => {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
```

上面的代码使用普通的 JavaScript try/catch 块而不是错误边界来捕获错误。

### try catch 与错误边界有什么区别?

Try catch 块使用命令式代码，而错误边界则是使用在屏幕上呈现声明性代码。

例如，以下是使用声明式代码的 try/catch 块：

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

而错误边界包装的声明式代码如下：

```html
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

```

因此，如果在组件树深处某个位置组件的 componentDidUpdate 方法中，发生了由 setState 引发的错误，它仍然会正确地冒泡到最近的错误边界。

### React 16 中未捕获的错误的行为是什么?

在 React 16 中，未被任何错误边界捕获的错误将导致整个 React 组件树的卸载。这一决定背后的原因是，与其显示已损坏的界面，不如完全移除它。例如，对于支付应用程序来说，显示错误的金额比什么都不提供更糟糕。


### 放置错误边界的正确位置是什么?

错误边界使用的粒度由开发人员根据项目需要决定。你可以遵循这些方法中的任何一种：

可以包装顶层路由组件以显示整个应用程序中常见的错误消息。
你还可以将单个组件包装在错误边界中，以防止它们奔溃时影响到应用程序的其余部分。

### 从错误边界跟踪组件堆栈有什么好处?

除了错误消息和 JavaScript 堆栈，React 16 将使用错误边界的概念显示带有文件名和行号的组件堆栈。例如，BuggyCounter 组件显示组件堆栈信息：

### 在定义类组件时，什么是必须的方法?

在类组件中 render() 方法是唯一需要的方法。也就是说，对于类组件，除了 render() 方法之外的所有方法都是可选的。

### render 方法可能返回的类型是什么?

以下列表是 render 方法返回的类型：

React elements: 用于告诉 React 如何渲染 DOM 节点。它包括 HTML 元素，如 div 和用户定义的元素。

Arrays and fragments: 以数组的形式返回多个元素和包装多个元素的片段。

Portals: 将子元素渲染到不同的 DOM 子树中。

String and numbers: 在 DOM 中将字符串和数字都作为文本节点进行呈现。

Booleans or null: 不会渲染任何内容，但这些类型用于有条件地渲染内容。

### 构造函数的主要目的是什么?

使用构造函数主要有两个目的：

通过将对象分配给 this.state 来初始化本地状态。

用于为组件实例绑定事件处理方法。

例如，下面的代码涵盖了上述两种情况：

```js
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

### 是否必须为 React 组件定义构造函数?

不，这不是强制的。也就是说，如果你不需要初始化状态且不需要绑定方法，则你不需要为 React 组件实现一个构造函数。

### 什么是默认属性?

defaultProps 被定义为组件类上的属性，用于设置组件类默认的属性值。它只适用于 undefined 的属性，而不适用于 null 属性。例如，让我们为按钮组件创建默认的 color 属性：

```js
class MyButton extends React.Component {
  // ...
}

MyButton.defaultProps = {
  color: 'red'
};
```

如果未设置 props.color，则会使用默认值 red。 也就是说，每当你试图访问 color 属性时，它都使用默认值。

```js
render() {
   return <MyButton /> ; // props.color will be set to red
 }
```

注意： 如果你提供的是 null 值，它会仍然保留 null 值。

### 为什么不能在 componentWillUnmount 中调用 setState() 方法?

不应在 componentWillUnmount() 中调用 setState()，因为一旦卸载了组件实例，就永远不会再次装载它。


### getDerivedStateFromError 的目的是什么?

在子代组件抛出异常后会调用此生命周期方法。它以抛出的异常对象作为参数，并返回一个值用于更新状态。该生命周期方法的签名如下：

```js
static getDerivedStateFromError(error)
```

让我们举一个包含上述生命周期方法的错误边界示例，来说明 getDerivedStateFromError 的目的：

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### 当组件重新渲染时顺序执行的方法有哪些?

更新可能由属性或状态的更改引起。在重新渲染组件时，会按以下顺序调用下列方法。

static getDerivedStateFromProps()

shouldComponentUpdate()

render()

getSnapshotBeforeUpdate()

componentDidUpdate()

### 错误处理期间调用哪些方法?

在渲染期间，生命周期方法内或任何子组件的构造函数中出现错误时，将会调用以下方法：

static getDerivedStateFromError()

componentDidCatch()

### displayName 类属性的用途是什么?

displayName 被用于调试信息。通常，你不需要显式设置它，因为它是从定义组件的函数或类的名称推断出来的。如果出于调试目的或在创建高阶组件时显示不同的名称，可能需要显式设置它。

例如，若要简化调试，请选择一个显示名称，以表明它是 withSubscription HOC 的结果。

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

### unmountComponentAtNode 方法的目的是什么?

此方法可从 react-dom 包中获得，它从 DOM 中移除已装载的 React 组件，并清除其事件处理程序和状态。如果容器中没有装载任何组件，则调用此函数将不起任何作用。如果组件已卸载，则返回 true；如果没有要卸载的组件，则返回 false。该方法的签名如下：

```js
ReactDOM.unmountComponentAtNode(container)
```

### 什么是代码拆分?

Code-Splitting 是 Webpack 和 Browserify 等打包工具所支持的一项功能，它可以创建多个 bundles，并可以在运行时动态加载。React 项目支持通过 dynamic import() 特性进行代码拆分。例如，在下面的代码片段中，它将使 moduleA.js 及其所有唯一依赖项作为单独的块，仅当用户点击 'Load' 按钮后才加载。

#### moduleA.js

```js
const moduleA = 'Hello';

export { moduleA };
```

#### App.js

```js
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

### 严格模式有什么好处?

在下面的情况下， 将有所帮助：

使用 unsafe lifecycle methods 标识组件。

有关 legacy string ref API 用法发出警告。

检测无法预测的 side effects。

检测 legacy context API。

有关已弃用的 findDOMNode 用法的警告。

### 什么是 Keyed Fragments ?

使用显式 React.Fragment 语法声明的片段可能具有 key 。一般用例是将集合映射到片段数组，如下所示，

```js
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

### React 支持所有的 HTML 属性么?

从 React 16 开始，完全支持标准或自定义 DOM 属性。由于 React 组件通常同时使用自定义和与 DOM 相关的属性，因此 React 与 DOM API 一样都使用 camelCase 约定。让我们对标准 HTML 属性采取一些措施：

```html
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input readOnly={true} />  // Just like node.readOnly DOM API
```
除了特殊情况外，这些属性的工作方式与相应的 HTML 属性类似。它还支持所有 SVG 属性。

### HOC 有哪些限制?

除了它的好处之外，高阶组件还有一些注意事项。 以下列出的几个注意事项:

1 不要在渲染方法中使用HOC： 建议不要将 HOC 应用于组件的 render 方法中的组件。

```js
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```
上述代码通过重新装载，将导致该组件及其所有子组件状态丢失，会影响到性能。正确的做法应该是在组件定义之外应用 HOC ，以便仅生成一次生成的组件

2 静态方法必须复制： 将 HOC 应用于组件时，新组件不具有原始组件的任何静态方法

```js
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

您可以通过在返回之前将方法复制到输入组件上来解决此问题

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

3 Refs 不会被往下传递 对于HOC，您需要将所有属性传递给包装组件，但这对于 refs 不起作用。这是因为 ref 并不是一个类似于 key 的属性。在这种情况下，您需要使用 React.forwardRef API。

### 如何在 DevTools 中调试 forwardRefs?

React.forwardRef接受渲染函数作为参数，DevTools 使用此函数来确定为 ref 转发组件显示的内容。例如，如果您没有使用 displayName 属性命名 render 函数，那么它将在 DevTools 中显示为“ForwardRef”，

```js
const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref} />;
});
```

但如果你命名 render 函数，那么它将显示为 “ForwardRef(myFunction)”

```js
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```

作为替代方案，您还可以为 forwardRef 函数设置 displayName 属性，

```js
function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
```

### x什么时候组件的 props 属性默认为 true?

如果没有传递属性值，则默认为 true。此行为可用，以便与 HTML 的行为匹配。例如，下面的表达式是等价的：

```html
<MyInput autocomplete />

<MyInput autocomplete={true} />
```

注意： 不建议使用此方法，因为它可能与 ES6 对象 shorthand 混淆（例如，{name}，它是{ name:name } 的缩写）

### 什么是 NextJS 及其主要特征?

Next.js 是一个流行的轻量级框架，用于使用 React 构建静态和服务端渲染应用程序。它还提供样式和路由解决方案。以下是 NextJS 提供的主要功能：

默认服务端渲染

自动代码拆分以加快页面加载速度

简单的客户端路由 (基于页面)

基于 Webpack 的开发环境支持 (HMR)

能够使用 Express 或任何其他 Node.js HTTP 服务器

可自定义你自己的 Babel 和 Webpack 配置

### 如何将事件处理程序传递给组件?

可以将事件处理程序和其他函数作为属性传递给子组件。它可以在子组件中使用，如下所示：

```html
<button onClick={this.handleClick}>
```

### 在渲染方法中使用箭头函数好么?

是的，你可以用。它通常是向回调函数传递参数的最简单方法。但在使用时需要优化性能。

```js
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}
```

注意： 组件每次渲染时，在 render 方法中的箭头函数都会创建一个新的函数，这可能会影响性能。