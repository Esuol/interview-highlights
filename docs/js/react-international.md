## react Internationalization

### 什么是 React Intl?

React Intl库使 React 中的内部化变得简单，使用现成的组件和 API ，可以处理从格式化字符串，日期和数字到复数的所有功能。React Intl 是FormatJS的一部分，它通过其组件和 API 提供与 React 的绑定。

### React Intl 的主要特性是什么?

用分隔符显示数字

正确显示日期和时间

显示相对于“现在”的日期

将标签转换为字符串

支持 150 多种语言

支持在浏览器和 Node 中运行

建立在标准之上

### 在 React Intl 中有哪两种格式化方式?

该库提供了两种格式化字符串，数字和日期的方法：React 组件或 API。

```js
<FormattedMessage
  id={'account'}
  defaultMessage={'The amount is less than minimum balance.'}
/>
```

```js
const messages = defineMessages({
  accountMessage: {
    id: 'account',
    defaultMessage: 'The amount is less than minimum balance.',
  }
})

formatMessage(messages.accountMessage)
```
