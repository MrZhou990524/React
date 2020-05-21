# 学习 React

![React Logo](https://github.com/MrZhou990524/React/raw/master/public/logo192.png)

## React 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。

> 注意是库不是框架。React 官方把 React 定义为库。跟 Vue 有所区别

## 安装 React

```cmd
npx create-react-app my-app
cd my-app
npm start
```

## JSX 简介

**JSX，是一个 JavaScript 的语法扩展。**

```JavaScript
const element = <h1>Hello, world!</h1>;
```

JSX 可以生成 React 元素

### 在 JSX 中嵌入表达式

我们声明了一个名为 name 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：

```JavaScript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。

### JSX 也是一个表达式

可以在 if 语句与 for 循环中使用 JSX,将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX

```JavaScript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX 特定性

可以通过引号，将属性值指定为字符串字面量

```JavaScript
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一 JavaScript 表达式

```JavaScript
const element = <img src={user.avatarUrl}></img>;
```

### 使用 JSX 指定子元素

假如一个标签里面没有内容，你可以使用 /> 来闭合标签，就像 XML 语法一样

```JavaScript
const element = <img src={user.avatarUrl} />;
```

SX 标签里能够包含很多子元素

```JavaScript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

JSX 下只能有一个根标签，多个根标签会报错

```JavaScript
const element = (
  <div></div>
  <h1>Hello!</h1>
);
// 会报错
```

如果一定要使用两个根标签可以用以下方法

```JavaScript
const element = (
  <>
    <div></div>
    <h1>Hello!</h1>
  </>
);
//不会报错，渲染页面时<>空标签不会被渲染
```

### JSX 防止注入攻击

可以安全地在 JSX 当中插入用户输入内容

```JavaScript
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

### JSX 表示对象

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

```JavaScript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```JavaScript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

两种写法完全一样

React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象

```JavaScript
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

## 元素渲染

**元素是构成 React 应用的最小砖块**

```JavaScript
const element = <h1>Hello, world</h1>;
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。可以理解为 VUE 里的虚拟 DOM

### 将一个元素渲染为 DOM

在你的 index.html 文件里有一个

```html
<div id="root"><div /></div>
```

我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()

```JavaScript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));

//render 是渲染的意思
```

### 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

用一个计时器来加深理解

```JavaScript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

这个例子会在 setInterval() 回调函数，每秒都调用 ReactDOM.render()。

### React 只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

你可以使用浏览器的检查元素工具查看上一个例子来确认这一点。

![定时器例子](https://react.docschina.org/c158617ed7cc0eac8f58330e49e48224/granular-dom-updates.gif)

## 组件

1. 组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。本指南旨在介绍组件的相关理念。你可以参考详细组件 API。

1. 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。也可以用 ES6 class 来定义一个组件。

1. 组件的命名，开头字母需要大写。

1. 组件通过 props 来接收任意参数

```JavaScript
<Message />
//这是一个自定义组件
```

> 封装一个 React 组件

```JavaScript
function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
```

> 用一个 ES6 class 定义一组件

```JavaScript
class HelloMeassage extends RecatComponent {
  render (){
    return <h1>Hello,World!</h1>;
  }
}
```

> 用 props 接收参数

```JavaScript
function HelloMessage(props) {
    return <h1>Hello,{props.name}</h1>;
}

const element = <HelloMessage name='普朗特' />

ReactDOM.render(
  element,
  document.getElementById('root')
);

//输出  > Hello,普朗特

```

### 组件嵌套

用 React 组件嵌套可以把其他组件组合成一个具有完整功能的组件

```JavaScript

function Name(props) {
  return <h1>name:{props.name}</h1>
}

function Age(props) {
  return <h1>Age:{props.age}</h1>
}

function App() {
  return (
    <div>
      <Name name="米老鼠" />
      <Age age="10岁" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
//迪士尼律师函警告
```
