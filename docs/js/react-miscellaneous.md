### Miscellaneous

### Reselect 库的主要功能有哪些?

选择器可以计算派生数据，允许 Redux 存储最小可能状态。

选择器是有效的。除非其参数之一发生更改，否则不会重新计算选择器。

选择器是可组合的。它们可以用作其他选择器的输入。

### 举一个 Reselect 用法的例子?

让我们通过使用 Reselect 来简化计算不同数量的装运订单：

```js
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

### Redux 中的 Action 是什么?

Actions是纯 JavaScript 对象或信息的有效负载，可将数据从您的应用程序发送到您的 Store。 它们是 Store 唯一的数据来源。 Action 必须具有指示正在执行的操作类型的 type 属性。

例如，表示添加新待办事项的示例操作：

```js
{
  type: ADD_TODO,
  text: 'Add todo item'
}

```

### 在 React 中 statics 对象是否能与 ES6 类一起使用?

不行，statics 仅适用于 React.createClass()：

```js
someComponent= React.createClass({
  statics: {
    someMethod: function() {
      // ..
    }
  }
})
```

但是你可以在 ES6+ 的类中编写静态代码，如下所示：

```js
class Component extends React.Component {
  static propTypes = {
    // ...
  }

  static someMethod() {
    // ...
  }
}
```

### Redux 只能与 React 一起使用么?

Redux 可以用做任何 UI 层的数据存储。最常见的应用场景是 React 和 React Native，但也有一些 bindings 可用于 AngularJS，Angular 2，Vue，Mithril 等项目。Redux 只提供了一种订阅机制，任何其他代码都可以使用它。

### 您是否需要使用特定的构建工具来使用 Redux ?

Redux 最初是用 ES6 编写的，用 Webpack 和 Babel 编译成 ES5。 无论您的 JavaScript 构建过程如何，您都应该能够使用它。Redux 还提供了一个 UMD 版本，可以直接使用而无需任何构建过程。

### Redux Form 的 initialValues 如何从状态更

你需要添加enableReinitialize：true设置。

```js
const InitializeFromStateForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize : true
})(UserEdit)
```