```js
import React from "react";

export default function Loadable(
  loader: () => Promise<React.Component>,
  LoadingComponent: React.Component,
  ErrorComponent?: React.Component | null,
  delay?: number = 200
) {
  // 有时组件加载很快（<200ms），loading 屏只在屏幕上一闪而过。

  // 一些用户研究已证实这会导致用户花更长的时间接受内容。如果不展示任何 loading 内容，用户会接受得更快, 所以有了delay参数。

  let prevLoadedComponent = null;

  return class Loadable extends React.Component {
    state = {
      isLoading: false,
      error: null,
      Component: prevLoadedComponent
    };

    componentWillMount() {
      if (!this.state.Component) {
        this.loadComponent();
      }
    }

    loadComponent() {
      // Loading占位
      this._timeoutId = setTimeout(() => {
        this._timeoutId = null;
        this.setState({ isLoading: true });
      }, this.props.delay);

      // 进行加载
      loader()
        .then(Component => {
          this.clearTimeout();
          prevLoadedComponent = Component;
          this.setState({
            isLoading: false,
            Component
          });
        })
        .catch(error => {
          this.clearTimeout();
          this.setState({
            isLoading: false,
            error
          });
        });
    }

    clearTimeout() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
    }

    render() {
      let { error, isLoading, Component } = this.state;

      // 根据情况渲染Loading 所需组件 以及 错误组件
      if (error && ErrorComponent) {
        return <ErrorComponent error={error} />;
      } else if (isLoading) {
        return <LoadingComponent />;
      } else if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
```