## 进阶JS

### 说说浏览器和 Node 事件循环的区别

#### 关于微任务和宏任务在浏览器的执行顺序是这样的：

执行一个task（宏任务）

执行完micro-task队列 （微任务）

```txt
浏览器的 task（宏任务）执行顺序在 html#event-loops 里面有讲就不翻译了
常见的 task（宏任务） 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。
常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。
```

#### node

##### 大体的task（宏任务）执行顺序是这样的：

timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。

pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。

idle, prepare：仅系统内部使用。

poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。

check 检测：setImmediate() 回调函数在这里执行。

close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。
