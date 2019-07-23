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