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