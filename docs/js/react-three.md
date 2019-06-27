## React 第三部分

### 在 React 中如何校验 props 属性?

当应用程序以开发模式运行的时，React 将会自动检查我们在组件上设置的所有属性，以确保它们具有正确的类型。如果类型不正确，React 将在控制台中生成警告信息。由于性能影响，它在生产模式下被禁用。使用 isRequired 定义必填属性。

预定义的 prop 类型：

```txt
PropTypes.number
PropTypes.string
PropTypes.array
PropTypes.object
PropTypes.func
PropTypes.node
PropTypes.element
PropTypes.bool
PropTypes.symbol
PropTypes.any
```

我们可以为 User 组件定义 propTypes，如下所示：

```js
import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }

  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    )
  }
}
```

### React 的优点是什么?

使用 Virtual DOM 提高应用程序的性能。

JSX 使代码易于读写。

它支持在客户端和服务端渲染。

易于与框架（Angular，Backbone）集成，因为它只是一个视图库。

使用 Jest 等工具轻松编写单元与集成测试。
