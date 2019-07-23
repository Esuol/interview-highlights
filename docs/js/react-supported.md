## React supported libraries & Integration

### 什么是 Reselect 以及它是如何工作的?

Reselect是一个选择器库（用于 Redux ），它使用memoization概念。它最初编写用于计算类似 Redux 的应用程序状态的派生数据，但它不能绑定到任何体系结构或库。

Reselect 保留最后一次调用的最后输入/输出的副本，并仅在其中一个输入发生更改时重新计算结果。如果连续两次提供相同的输入，则 Reselect 将返回缓存的输出。它的 memoization 和缓存是完全可定制的。

### 什么是 Flow?

Flow 是一个静态类型检查器，旨在查找 JavaScript 中的类型错误。与传统类型系统相比，Flow 类型可以表达更细粒度的区别。例如，与大多数类型系统不同，Flow 能帮助你捕获涉及 null 的错误。

