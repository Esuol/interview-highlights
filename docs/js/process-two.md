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

### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。

在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
```

但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined
```
在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中

怎么获取？在定义变量的块级作用域中就能获取啊，既然不属于顶层对象，那就不加 window（global）呗。

```js
let aa = 1;
const bb = 2;

console.log(aa); // 1
console.log(bb); // 2
```

### cookie 和 token 都存放在 header 中，为什么不会劫持 token？ #31

cookie
举例：服务员看你的身份证，给你一个编号，以后，进行任何操作，都出示编号后服务员去看查你是谁。

token
举例：直接给服务员看自己身份证

1、首先token不是防止XSS的，而是为了防止CSRF的； 2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

### 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]。

```js
let a2 =  [A, B, C, D].map(item => {
  return item + 3
})
let a3 = [...a1, ...a2].sort().map(item => {
  if(item.includes('3')) {
    return item.split('')[0]
  }
  return item
})
```

### 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

```js
for(let i =0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  },1000)
}
```

```js
for (var i = 0; i< 10; i++){
	setTimeout((i) => {
		console.log(i);
    }, 1000, i)
}
```

```js
for(let i =0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i)
    },1000)
  })(i)
}
```

### 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();

```
解答

函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。

对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。

IIFE中的函数是函数表达式，而不是函数声明。


实际上，有点类似于以下代码，但不完全相同，因为使用const不管在什么模式下，都会TypeError类型的错误
```js
const foo = function () {
  foo = 10;
  console.log(foo)
}
(foo)() // Uncaught TypeError: Assignment to constant variable.
```

b 函数是一个相当于用const定义的常量，内部无法进行重新赋值，如果在严格模式下，会报错"Uncaught TypeError: Assignment to constant variable." 例如下面的：

```javascript
var b = 10;
(function b() {
  'use strict'
  b = 20;
  console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."
```

### 浏览器缓存读取规则