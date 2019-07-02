## react 第四部分

### 为什么 isMounted() 是一个反模式，而正确的解决方案是什么?

isMounted() 的主要场景是避免在组件卸载后调用 setState()，因为它会发出警告。

```js
if (this.isMounted()) {
  this.setState({...})
}

```