## React Testing

### 在 React 测试中什么是浅层渲染（Shallow Renderer）?

浅层渲染对于在 React 中编写单元测试用例很有用。它允许您渲染一个一级深的组件并断言其渲染方法返回的内容，而不必担心子组件未实例化或渲染。

例如，如果您有以下组件：

```js
function MyComponent() {
  return (
    <div>
      <span className={'heading'}>{'Title'}</span>
      <span className={'description'}>{'Description'}</span>
    </div>
  )
}
```

然后你可以如下断言：

```js
import ShallowRenderer from 'react-test-renderer/shallow'

// in your test
const renderer = new ShallowRenderer()
renderer.render(<MyComponent />)

const result = renderer.getRenderOutput()

expect(result.type).toBe('div')
expect(result.props.children).toEqual([
  <span className={'heading'}>{'Title'}</span>,
  <span className={'description'}>{'Description'}</span>
])
```

### 在 React 中 TestRenderer 包是什么?

此包提供了一个渲染器，可用于将组件渲染为纯 JavaScript 对象，而不依赖于 DOM 或原生移动环境。该包可以轻松获取由 ReactDOM 或 React Native 平台所渲染的视图层次结构（类似于DOM树）的快照，而无需使用浏览器或jsdom。

```js
import TestRenderer from 'react-test-renderer'

const Link = ({page, children}) => <a href={page}>{children}</a>

const testRenderer = TestRenderer.create(
  <Link page={'https://www.facebook.com/'}>{'Facebook'}</Link>
)

console.log(testRenderer.toJSON())
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```