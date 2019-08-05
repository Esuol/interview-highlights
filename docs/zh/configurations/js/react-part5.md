## React Redux

### 什么是 Flux?

Flux 是应用程序设计范例，用于替代更传统的 MVC 模式。它不是一个框架或库，而是一种新的体系结构，它补充了 React 和单向数据流的概念。在使用 React 时，Facebook 会在内部使用此模式。


### 什么是 Redux?

Redux 是基于 Flux设计模式 的 JavaScript 应用程序的可预测状态容器。Redux 可以与 React 一起使用，也可以与任何其他视图库一起使用。它很小（约2kB）并且没有依赖性。

### Redux 的核心原则是什么？?

Redux 遵循三个基本原则：

单一数据来源： 整个应用程序的状态存储在单个对象树中。单状态树可以更容易地跟踪随时间的变化并调试或检查应用程序。

状态是只读的： 改变状态的唯一方法是发出一个动作，一个描述发生的事情的对象。这可以确保视图和网络请求都不会直接写入状态。

使用纯函数进行更改： 要指定状态树如何通过操作进行转换，您可以编写reducers。Reducers 只是纯函数，它将先前的状态和操作作为参数，并返回下一个状态。

### 与 Flux 相比，Redux 的缺点是什么?

我们应该说使用 Redux 而不是 Flux 几乎没有任何缺点。这些如下：

您将需要学会避免突变： Flux 对变异数据毫不吝啬，但 Redux 不喜欢突变，许多与 Redux 互补的包假设您从不改变状态。您可以使用 dev-only 软件包强制执行此操作，例如redux-immutable-state-invariant，Immutable.js，或指示您的团队编写非变异代码。

您将不得不仔细选择您的软件包： 虽然 Flux 明确没有尝试解决诸如撤消/重做，持久性或表单之类的问题，但 Redux 有扩展点，例如中间件和存储增强器，以及它催生了丰富的生态系统。

还没有很好的 Flow 集成： Flux 目前可以让你做一些非常令人印象深刻的静态类型检查，Redux 还不支持。

### mapStateToProps() 和 mapDispatchToProps() 之间有什么区别?

mapStateToProps()是一个实用方法，它可以帮助您的组件获得最新的状态（由其他一些组件更新）：

```js
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```
mapDispatchToProps()是一个实用方法，它可以帮助你的组件触发一个动作事件（可能导致应用程序状态改变的调度动作）：

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
```

### 我可以在 reducer 中触发一个 Action 吗?

在 reducer 中触发 Action 是反模式。您的 reducer 应该没有副作用，只是接收 Action 并返回一个新的状态对象。在 reducer 中添加侦听器和调度操作可能会导致链接的 Action 和其他副作用。

### 如何在组件外部访问 Redux 存储的对象?

是的，您只需要使用createStore()从它创建的模块中导出存储。此外，它不应污染全局窗口对象。

```js
store = createStore(myReducer)

export default store
```

### MVW 模式的缺点是什么?

DOM 操作非常昂贵，导致应用程序行为缓慢且效率低下。

由于循环依赖性，围绕模型和视图创建了复杂的模型。

协作型应用程序（如Google Docs）会发生大量数据更改。

无需添加太多额外代码就无法轻松撤消（及时回退）。


### Redux 和 RxJS 之间是否有任何相似之处?

这些库的目的是不同的，但是存在一些模糊的相似之处。

Redux 是一个在整个应用程序中管理状态的工具。它通常用作 UI 的体系结构。可以将其视为（一半）Angular 的替代品。 RxJS 是一个反应式编程库。它通常用作在 JavaScript 中完成异步任务的工具。把它想象成 Promise 的替代品。 Redux 使用 Reactive 范例，因为Store是被动的。Store 检测到 Action，并自行改变。RxJS也使用 Reactive 范例，但它不是一个体系结构，它为您提供了基本构建块 Observables 来完成这种模式。

### 如何在加载时触发 Action?

您可以在componentDidMount()方法中触发 Action，然后在render()方法中可以验证数据。

```js
class App extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return this.props.isLoaded
      ? <div>{'Loaded'}</div>
      : <div>{'Not Loaded'}</div>
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.isLoaded
})

const mapDispatchToProps = { fetchData }

export default connect(mapStateToProps, mapDispatchToProps)(App)

```

### 在 React 中如何使用 Redux 的 connect() ?

您需要按照两个步骤在容器中使用您的 Store：

使用mapStateToProps()： 它将 Store 中的状态变量映射到您指定的属性。

将上述属性连接到容器： mapStateToProps函数返回的对象连接到容器。你可以从react-redux导入connect()。

```js
import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return <div>{this.props.containerData}</div>
  }
}

function mapStateToProps(state) {
  return { containerData: state.data }
}

export default connect(mapStateToProps)(App)
```

### 如何在 Redux 中重置状态?

你需要在你的应用程序中编写一个root reducer，它将处理动作委托给combineReducers()生成的 reducer。

例如，让我们在USER_LOGOUT动作之后让rootReducer()返回初始状态。我们知道，无论 Action 怎么样，当使用undefined作为第一个参数调用它们时，reducers 应该返回初始状态。

```js
const appReducer = combineReducers({
  /* your app's top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
```

如果使用redux-persist，您可能还需要清理存储空间。redux-persist在 storage 引擎中保存您的状态副本。首先，您需要导入适当的 storage 引擎，然后在将其设置为undefined之前解析状态并清理每个存储状态键。

```js
const appReducer = combineReducers({
  /* your app's top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })

    state = undefined
  }

  return appReducer(state, action)
}

```

### Redux 中连接装饰器的 at 符号的目的是什么?

@ 符号实际上是用于表示装饰器的 JavaScript 表达式。装饰器可以在设计时注释和修改类和属性。

让我们举个例子，在没有装饰器的情况下设置 Redux 。

#### 未使用装饰器:

```js
import React from 'react'
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

class MyApp extends React.Component {
  // ...define your main app here
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApp)
```

#### 使用装饰器:

```js
import React from 'react'
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyApp extends React.Component {
  // ...define your main app here
}
```
除了装饰器的使用外，上面的例子几乎相似。装饰器语法尚未构建到任何 JavaScript 运行时中，并且仍然是实验性的并且可能会发生变化。您可以使用babel来获得装饰器支持。

### React 上下文和 React Redux 之间有什么区别?

您可以直接在应用程序中使用Context，这对于将数据传递给深度嵌套的组件非常有用。而Redux功能更强大，它还提供了 Context API 无法提供的大量功能。此外，React Redux 在内部使用上下文，但它不会在公共 API 中有所体现。

### 为什么 Redux 状态函数称为 reducers ?

Reducers 总是返回状态的累积（基于所有先前状态和当前 Action）。因此，它们充当了状态的 Reducer。每次调用 Redux reducer 时，状态和 Action 都将作为参数传递。然后基于该 Action 减少（或累积）该状态，然后返回下一状态。您可以reduce一组操作和一个初始状态（Store），在该状态下执行这些操作以获得最终的最终状态。

### 如何在 Redux 中发起 AJAX 请求?

您可以使用redux-thunk中间件，它允许您定义异步操作。

让我们举个例子，使用fetch API将特定帐户作为 AJAX 调用获取：

```js
export function fetchAccount(id) {
  return dispatch => {
    dispatch(setLoadingAccountState()) // Show a loading spinner
    fetch(`/account/${id}`, (response) => {
      dispatch(doneFetchingAccount()) // Hide loading spinner
      if (response.status === 200) {
        dispatch(setAccount(response.json)) // Use a normal function to set the received state
      } else {
        dispatch(someError)
      }
    })
  }
}

function setAccount(data) {
 return { type: 'SET_Account', data: data }
}
```

### 我应该在 Redux Store 中保留所有组件的状态吗?

将数据保存在 Redux 存储中，并在组件内部保持 UI 相关状态。

### 访问 Redux Store 的正确方法是什么?

在组件中访问 Store 的最佳方法是使用connect()函数，该函数创建一个包裹现有组件的新组件。此模式称为高阶组件，通常是在 React 中扩展组件功能的首选方式。这允许您将状态和 Action 创建者映射到组件，并在 Store 更新时自动传递它们。

我们来看一个使用 connect 的 FilterLink 组件的例子：

```js
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
```

由于它具有相当多的性能优化并且通常不太可能导致错误，因此 Redux 开发人员几乎总是建议使用connect()直接访问 Store（使用上下文API）。

```js
class MyComponent {
  someMethod() {
    doSomethingWith(this.context.store)
  }
}
```
### React Redux 中展示组件和容器组件之间的区别是什么?

展示组件是一个类或功能组件，用于描述应用程序的展示部分。

容器组件是连接到 Redux Store的组件的非正式术语。容器组件订阅 Redux 状态更新和dispatch操作，它们通常不呈现 DOM 元素；他们将渲染委托给展示性的子组件。


### Redux 中常量的用途是什么?

常量允许您在使用 IDE 时轻松查找项目中该特定功能的所有用法。它还可以防止你拼写错误，在这种情况下，你会立即得到一个ReferenceError。

通常我们会将它们保存在一个文件中（constants.js或actionTypes.js）。

```js
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
```
在 Redux 中，您可以在两个地方使用它们：

#### 在 Action 创建时:

让我们看看 actions.js:

```js
import { ADD_TODO } from './actionTypes';

export function addTodo(text) {
  return { type: ADD_TODO, text }
}
```

#### 在 reducers 里:

让我们创建 reducer.js 文件:

```js
import { ADD_TODO } from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    default:
      return state
  }
}
```

### 编写 mapDispatchToProps() 有哪些不同的方法?

有一些方法可以将action creators绑定到mapDispatchToProps()中的dispatch()。以下是可能的写法：

```js
const mapDispatchToProps = (dispatch) => ({
 action: () => dispatch(action())
})
```
```js
const mapDispatchToProps = (dispatch) => ({
 action: bindActionCreators(action, dispatch)
})
```

```js
const mapDispatchToProps = { action }
```

### 在 mapStateToProps() 和 mapDispatchToProps() 中使用 ownProps 参数有什么用?

如果指定了ownProps参数，React Redux 会将传递给该组件的 props 传递给你的connect函数。因此，如果您使用连接组件：

```js
import ConnectedComponent from './containers/ConnectedComponent';

<ConnectedComponent user={'john'} />
```

你的mapStateToProps()和mapDispatchToProps()函数里面的ownProps将是一个对象：

```js
{ user: 'john' }
```

您可以使用此对象来决定从这些函数返回的内容。

### 如何构建 Redux 项目目录?

大多数项目都有几个顶级目录，如下所示：

Components: 用于dumb组件，Redux 不必关心的组件。

Containers: 用于连接到 Redux 的smart组件。

Actions: 用于所有 Action 创建器，其中文件名对应于应用程序的一部分。

Reducers: 用于所有 reducer，其中文件名对应于state key。

Store: 用于 Store 初始化。

这种结构适用于中小型项目。

### 什么是 redux-saga?

redux-saga是一个库，旨在使 React/Redux 项目中的副作用（数据获取等异步操作和访问浏览器缓存等可能产生副作用的动作）更容易，更好。

这个包在 NPM 上有发布:

```cmd
$ npm install --save redux-saga
```

### redux-saga 的模型概念是什么?

Saga就像你的项目中的一个单独的线程，它独自负责副作用。redux-saga 是一个 redux 中间件，这意味着它可以在项目启动中使用正常的 Redux 操作，暂停和取消该线程，它可以访问完整的 Redux 应用程序状态，并且它也可以调度 Redux 操作。

###  redux-saga 中 call() 和 put() 之间有什么区别?

call()和put()都是 Effect 创建函数。 call()函数用于创建 Effect 描述，指示中间件调用 promise。put()函数创建一个 Effect，指示中间件将一个 Action 分派给 Store。

让我们举例说明这些 Effect 如何用于获取特定用户数据。


```js
function* fetchUserSaga(action) {
  // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.
  // Instructing middleware to call promise, it resolved value will be assigned to `userData` variable
  const userData = yield call(api.fetchUser, action.userId)

  // Instructing middleware to dispatch corresponding action.
  yield put({
    type: 'FETCH_USER_SUCCESS',
    userData
  })
}
```

### 什么是 Redux Thunk?

Redux Thunk中间件允许您编写返回函数而不是 Action 的创建者。 thunk 可用于延迟 Action 的发送，或仅在满足某个条件时发送。内部函数接收 Store 的方法dispatch()和getState()作为参数。

### redux-saga 和 redux-thunk 之间有什么区别?

Redux Thunk和Redux Saga都负责处理副作用。在大多数场景中，Thunk 使用Promises来处理它们，而 Saga 使用Generators。Thunk 易于使用，因为许多开发人员都熟悉 Promise，Sagas/Generators 功能更强大，但您需要学习它们。但是这两个中间件可以共存，所以你可以从 Thunks 开始，并在需要时引入 Sagas。

### 什么是 Redux DevTools?

Redux DevTools是 Redux 的实时编辑的时间旅行环境，具有热重新加载，Action 重放和可自定义的 UI。如果您不想安装 Redux DevTools 并将其集成到项目中，请考虑使用 Chrome 和 Firefox 的扩展插件。

### Redux DevTools 的功能有哪些?

允许您检查每个状态和 action 负载。

让你可以通过撤销回到过去。

如果更改 reducer 代码，将重新评估每个已暂存的 Action。

如果 Reducers 抛出错误，你会看到这发生了什么 Action，以及错误是什么。

使用persistState()存储增强器，您可以在页面重新加载期间保持调试会话。

### 什么是 Redux 选择器以及使用它们的原因?

选择器是将 Redux 状态作为参数并返回一些数据以传递给组件的函数。

例如，要从 state 中获取用户详细信息：

```js
const getUserData = state => state.user.data
```

### 什么是 Redux Form?

Redux Form与 React 和 Redux 一起使用，以使 React 中的表单能够使用 Redux 来存储其所有状态。Redux Form 可以与原始 HTML5 输入一起使用，但它也适用于常见的 UI 框架，如 Material UI，React Widgets和React Bootstrap。

### Redux Form 的主要功能有哪些?

字段值通过 Redux 存储持久化。

验证（同步/异步）和提交。

字段值的格式化，解析和规范化。

### 如何向 Redux

添加多个中间件?你可以使用applyMiddleware()。

例如，你可以添加redux-thunk和logger作为参数传递给applyMiddleware()：

```js
import { createStore, applyMiddleware } from 'redux'
const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore)
```

### 如何在 Redux 中设置初始状态?

您需要将初始状态作为第二个参数传递给 createStore ：

```js
const rootReducer = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})

const initialState = {
  todos: [{ id: 123, name: 'example', completed: false }]
}

const store = createStore(
  rootReducer,
  initialState
)

```

### Relay 与 Redux 有何不同

Relay 与 Redux 类似，因为它们都使用单个 Store。主要区别在于 relay 仅管理源自服务器的状态，并且通过GraphQL查询（用于读取数据）和突变（用于更改数据）来使用对状态的所有访问。Relay 通过仅提取已更改的数据而为您缓存数据并优化数据提取。






