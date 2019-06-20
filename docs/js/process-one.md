### ['1', '2', '3'].map(parseInt) what & why ?

var new_array = arr.map(function callback(currentValue[, index[, array]]) { // Return element for new_array }[, thisArg])
这个callback一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。

而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。
parseInt(string, radix)
接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

了解这两个函数后，我们可以模拟一下运行情况

parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]

resolve

```js
let unary = fn => val => fn(val)
let parse = unary(fn)
console.log(['1.1', '3', '1.3'].map(parse))
```

### 什么是防抖和节流？有什么区别？如何实现？

#### 防抖

触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

思路： 每次触发事件时都取消之前的延时调用方法

```js
function debounce (fn) {
  let timeout = null  // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments)
    }, 500)
  }
}

 function sayHi() {
      console.log('防抖成功');
    }

  var inp = document.getElementById('inp');
  inp.addEventListener('input', debounce(sayHi)); // 防抖
```

#### 节流

高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

每次触发事件时都判断当前是否有等待执行的延时函数

```js
function throttle(fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    }
    function sayHi(e) {
      console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi));
```

### 介绍下深度优先遍历和广度优先遍历，如何实现？
