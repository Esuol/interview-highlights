---
title: '进阶JS'
---

<Block>
# 进阶JS
</Block>

<Block>
### 说说浏览器和 Node 事件循环的区别

#### 关于微任务和宏任务在浏览器的执行顺序是这样的：

执行一个task（宏任务）

执行完micro-task队列 （微任务）

<Example>

```txt
浏览器的 task（宏任务）执行顺序在 html#event-loops 里面有讲就不翻译了
常见的 task（宏任务） 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。
常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。
```

</Example>

#### node

##### 大体的task（宏任务）执行顺序是这样的：

timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。

pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。

idle, prepare：仅系统内部使用。

poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。

check 检测：setImmediate() 回调函数在这里执行。

close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

</Block>

<Block>

### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。

在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

<Example>
```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
```
</Example>

但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

<Example>
```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined

```
</Example>

在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中

怎么获取？在定义变量的块级作用域中就能获取啊，既然不属于顶层对象，那就不加 window（global）呗。

<Example>
```js
let aa = 1;
const bb = 2;

console.log(aa); // 1
console.log(bb); // 2
```
</Example>

</Block>

<Block>

### cookie 和 token 都存放在 header 中，为什么不会劫持 token？ #31

cookie
举例：服务员看你的身份证，给你一个编号，以后，进行任何操作，都出示编号后服务员去看查你是谁。

token
举例：直接给服务员看自己身份证

1、首先token不是防止XSS的，而是为了防止CSRF的； 2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

</Block>

<Block>

### 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]。

<Example>
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
</Example>

</Block>

<Block>

### 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

<Example>
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
</Example>

</Block>

<Block>

### 下面的代码打印什么内容，为什么？

<Example>
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();

```
</Example>
解答

函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。

对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。

IIFE中的函数是函数表达式，而不是函数声明。


实际上，有点类似于以下代码，但不完全相同，因为使用const不管在什么模式下，都会TypeError类型的错误

<Example>
```js
const foo = function () {
  foo = 10;
  console.log(foo)
}
(foo)() // Uncaught TypeError: Assignment to constant variable.
```
</Example>

b 函数是一个相当于用const定义的常量，内部无法进行重新赋值，如果在严格模式下，会报错"Uncaught TypeError: Assignment to constant variable." 例如下面的：

<Example>
```javascript
var b = 10;
(function b() {
  'use strict'
  b = 20;
  console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."
```### 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();

```

</Example>
解答

函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。

对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。

IIFE中的函数是函数表达式，而不是函数声明。


实际上，有点类似于以下代码，但不完全相同，因为使用const不管在什么模式下，都会TypeError类型的错误

<Example>
```js
const foo = function () {
  foo = 10;
  console.log(foo)
}
(foo)() // Uncaught TypeError: Assignment to constant variable.
```
</Example>

b 函数是一个相当于用const定义的常量，内部无法进行重新赋值，如果在严格模式下，会报错"Uncaught TypeError: Assignment to constant variable." 例如下面的：

<Example>
```javascript
var b = 10;
(function b() {
  'use strict'
  b = 20;
  console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."
```

</Example>

</Block>

<Block>

### 浏览器缓存读取规则

可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？

 如果开启了Service Worker首先会从Service Worker中拿

如果新开一个以前打开过的页面缓存会从Disk Cache中拿（前提是命中强缓存）

刷新当前页面时浏览器会根据当前运行环境内存来决定是从 Memory Cache 还是 从Disk Cache中拿(可以看到下图最后几个文件有时候是从 Memory Cache中拿有时候是从Disk Cache中拿)

</Block>

<Block>
### 使用迭代的方式实现 flatten 函数。

<Example>
```js
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))
```


```js
// es6  递归的实现(ES6简写):
const flatten = array => array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])
```

</Example>

</Block>

<Block>
### 下面代码中 a 在什么情况下会打印 1？

<Example>
#### 1
```js
let a = {
  i: 1,
  toString () {
    return a.i++
  }
}

if(a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```
#### 2
```js
let a = {
  i: 1,
  valueOf () {
    return a.i++
  }
}

if(a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```
#### 3
```js
var a = [1,2,3];
a.join = a.shift;
if(a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```

#### 4
```js
let a = {
    [Symbol.toPrimitive]: (i => () => ++i) (0)
};
if(a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```
#### 5
```js
Object.defineProperty(window, 'a', {
    get: function() {
          return this.value = this.value ? (this.value += 1) : 1;
    }
});
if(a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```
</Example>
</Block>

<Block>
### 下面代码输出什么?

<Example>
```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
</Example>

#### 依次输出：undefined -> 10 -> 20

在立即执行函数中，var a = 20; 语句定义了一个局部变量 a，由于js的变量声明提升机制，局部变量a的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印undefined，最后一条语句会打印20。
由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10。

</Block>

<Block>
### 实现一个 sleep 函数

比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现。

<Example>
```js
// promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
sleep(1000).then(() => {
  console.log(1)
})

//Generator
function* SleepGenerator (time) {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

SleepGenerator(1000).next().value.then(() =>{console.log(1)})

// async

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

async function output() {
  let out = await sleep(1000)
  console.log(1)
  return out
}

output()

//es5

function sleep(callback, time) {
  if(typeof callback === 'function') {
      setTimeout(callback,time)
  }
}

function output(){
  console.log(1);
}
sleep(output,1000);
```
</Example>
</Block>

<Block>
### 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

sort 函数，可以接收一个函数，返回值是比较两个数的相对顺序的值

#### 默认没有函数 是按照 UTF-16 排序的，对于字母数字 你可以利用 ASCII 进行记忆

<Example>
```js
 [3, 15, 8, 29, 102, 22].sort();

// [102, 15, 22, 29, 3, 8]

```
</Example>

#### 带函数的比较

<Example>
```js
[3, 15, 8, 29, 102, 22].sort((a,b) => {return a - b});
```
</Example>

</Block>

<Block>
### 介绍 HTTPS 握手过程

开始加密通信之前，客户端和服务器首先必须建立连接和交换参数，这个过程叫做握手（handshake）。

第一步，爱丽丝给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，鲍勃确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，爱丽丝确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给鲍勃。

第四步，鲍勃使用自己的私钥，获取爱丽丝发来的随机数（即Premaster secret）。

第五步，爱丽丝和鲍勃根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

</Block>

<Block>
### call 和 apply 的区别是什么，哪个性能更好一些

Function.prototype.apply和Function.prototype.call 的作用是一样的，区别在于传入参数的不同；

第一个参数都是，指定函数体内this的指向；

第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。

call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式，参考 call和apply的性能对比

</Block>

<Block>
### 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

能够完成整个 HTTP 请求+响应（尽管不需要响应内容）

触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据

跨域友好 避免跨域（img 天然支持跨域）

执行过程无阻塞

相比 XMLHttpRequest 对象发送 GET 请求，性能上更好

GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

</Block>

<Block>
### 实现 (5).add(3).minus(2) 功能

<Example>
```js
Number.prototype.add = function(n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};
let res = (5).add(3).minus(2)
console.log(res)
```
</Example>

</Block>

