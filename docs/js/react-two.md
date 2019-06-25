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

