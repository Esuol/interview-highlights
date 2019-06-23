## Vue

### 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

<img :src="$withBase('/img/vueModel')" />

VM 主要做了两件微小的事情：

从 M 到 V 的映射（Data Binding），这样可以大量节省你人肉来 update View 的代码

从 V 到 M 的事件监听（DOM Listeners），这样你的 Model 会随着 View 触发事件而改变

#### 1、M 到 V 实现

做到这件事的第一步是形成类似于：

```js
// template
var tpl = '<p>{{ text }}</p>';
// data
var data = {
text: 'This is some text'
};
// magic process
template(tpl, data); // '<p>This is some text</p>
```

中间的 magic process 是模板引擎所做的事情，已经有非常多种模板引擎可供选择

无论是 Angular 的 $scope，React 的 state 还是 Vue 的 data 都提供了一个较为核心的 model 对象用来保存模型的状态；它们的模板引擎稍有差别，不过大体思路相似；拿到渲染后的 string 接下来做什么不言而喻了（中间还有很多处理，例如利用 model 的 diff 来最小量更新 view ）。
但是仅仅是这样并不够，我们需要知道什么时候来更新 view（ 即 render ），一般来说主要的 VM 做了以下几种选择：

VM 实例初始化时
model 动态修改时

其中初始化拿到 model 对象然后 render 没什么好讲的；model 被修改的时候如何监听属性的改变是一个问题，目前有以下几种思路：

借助于 Object 的 observe 方法
自己在 set，以及数组的常用操作里触发 change 事件
手动 setState()，然后在里面触发 change 事件

知道了触发 render 的时机以及如何 render，一个简单的 M 到 V 映射就实现了。

#### 2、V 到 M 实现

从 V 到 M 主要由两类（ 虽然本质上都是监听 DOM ）构成，一类是用户自定义的 listener， 一类是 VM 自动处理的含有 value 属性元素的 listener

第一类类似于你在 Vue 里用 v-on 时绑定的那样，VM 在实例化得时候可以将所有用户自定义的 listener 一次性代理到根元素上，这些 listener 可以访问到你的 model 对象，这样你就可以在 listener 中改变 model

第二类类似于对含有 v-model 与 value 元素的自动处理，我们期望的是例如在一个输入框内

```js
<input type="text" v-model="message" />
```

输入值，那么我与之对应的 model 属性 message 也会随之改变，相当于 VM 做了一个默认的 listener，它会监听这些元素的改变然后自动改变 model，具体如何实现相信你也明白了

### 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

如果修改了，Vue 是如何监控到属性的修改并给出警告的。

子组件为何不可以修改父组件传递的 Prop 单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。

如果修改了，Vue 是如何监控到属性的修改并给出警告的。

```js
if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
```

在initProps的时候，在defineReactive时通过判断是否在开发环境，如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改，如果不是，说明此修改来自子组件，触发warning提示。

```txt
需要特别注意的是，当你从子组件修改的prop属于基础类型时会触发提示。 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。你直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)， 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据。
。
```

### 下面代码输出什么

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

#### 依次输出：undefined -> 10 -> 20

在立即执行函数中，var a = 20; 语句定义了一个局部变量 a，由于js的变量声明提升机制，局部变量a的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印undefined，最后一条语句会打印20。
由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10。

