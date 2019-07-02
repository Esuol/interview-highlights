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
