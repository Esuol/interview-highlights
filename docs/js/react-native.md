## React Native

### React Native 和 React 有什么区别?

React是一个 JavaScript 库，支持前端 Web 和在服务器上运行，用于构建用户界面和 Web 应用程序。

React Native是一个移动端框架，可编译为本机应用程序组件，允许您使用 JavaScript 构建本机移动应用程序（iOS，Android和Windows），允许您使用 React 构建组件。

### 如何测试 React Native 应用程序?

React Native 只能在 iOS 和 Android 等移动模拟器中进行测试。您可以使用 expo app（https://expo.io）在移动设备上运行该应用程序。如果使用 QR 代码进行同步，则您的移动设备和计算机应位于同一个无线网络中。

### 如何在 React Native 查看日志?

您可以使用console.log，console.warn等。从 React Native v0.29 开始，您只需运行以下命令即可在控制台中查看日志：

```js
$ react-native log-ios
$ react-native log-android
```

### 怎么调试 React Native 应用?

按照以下步骤调试 React Native 应用程序：

在 iOS 模拟器中运行您的应用程序。

按Command + D，然后在网页中打开http://localhost:8081/debugger-ui。

启用Pause On Caught Exceptions以获得更好的调试体验。

按Command + Option + I打开 Chrome Developer 工具，或通过View ->Developer
->Developer Tools打开它。

您现在应该能够像平常那样进行调试。

### 