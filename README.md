# 设计模式
百科中是这么说的：
Design pattern(设计模式)是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

任何事情都有套路，设计模式，就是写代码中的常⻅套路， 有些写法我们日常都⼀直在使⽤用，下面我们来介绍一下 

## 订阅**/**发布模式 (观察者) 

pub/sub 这个应该大家用到最⼴的设计模式了， 

在这种模式中，并不是⼀个对象调用另⼀个对象的⽅法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。订阅者因此也成为观察者，⽽被观察的对象成为发布者或者主题。当发⽣了一个重要事件时候发布者会通知(调⽤用)所有订阅者并且可能经常已事件对象的形式传递消息

vue中的on源码 ⼤概也是这个样⼦子 https://github.com/vuejs/vue/blob/dev/src/core/instance/events.js#L54 

## 单例模式 

> 单例模式的定义:保证一个类仅有⼀个实例例，并提供一个访问它的全局访问点。实现的⽅法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。 

适用场景:

⼀个单一对象。⽐如:弹窗，⽆论点击多少次，弹窗只应该被创建一次，实现起来也很简单，⽤⼀个变量缓存即可 

应用场景 

我们在element中的弹窗代码中，可以看到单例模式的实际案例，保证全局唯一性

 https://github.com/ElemeFE/element/blob/dev/packages/message-box/src/main.js#L79 



## 策略模式 

>策略模式的定义：定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。
>策略模式的⽬的就是将算法的使⽤和算法的实现分离开来。

⼀个基于策略模式的程序至少由两部分组成。第⼀个部分是一组策略类(可变)，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context(不变)，Context接受客户的请求，随后将请求委托给某一个策略类。要做到这⼀一点，说明Context中要维持对某个策略对象的引用 

举个栗⼦ 

奖金计算，绩效为 S 的人年终奖有 4 倍⼯资，绩效为 A 的人年终奖有 3 倍工资，⽽绩效为 B 的⼈年年终奖是 2 倍工资 

```js
var calculateBonus = function( performanceLevel, salary ){
  if ( performanceLevel === 'S' ){  
    return salary * 4;
  }
  if ( performanceLevel === 'A' ){
    return salary * 3;
  }
  if ( performanceLevel === 'B' ){
    return salary * 2;
  }
};
calculateBonus( 'B', 20000 ); // 输出:40000 
calculateBonus( 'S', 6000 ); // 输出:24000
```

使⽤策略模式 

```js
var strategies = {
  "S": function( salary ){
    return salary * 4;
  },
  "A": function( salary ){
    return salary * 3;
  },
  "B": function( salary ){
    return salary * 2;
  }
};
var calculateBonus = function( level, salary ){
  return strategies[ level ]( salary );
};
console.log( calculateBonus( 'S', 20000 ) );// 输出:80000 
console.log( calculateBonus( 'A', 10000 ) );// 输出:30000 
```

## 代理模式 

>代理模式的定义:为⼀个对象提供⼀个代用品或占位符，以便控制对它的访问。
>常用的虚拟代理形式:某⼀个花销很⼤的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建

使⽤虚拟代理实现图片懒加载

图⽚懒加载的方式:先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面。 

假设我们在做一个文件同步的功能，当我们选中⼀个 checkbox 的时候，它对应的文件就会被同步到另外一台备⽤服务器器上⾯。当一次选中过多时，会产⽣频繁的网络请求。将带来很大的开销。可以通过⼀一个代理函数proxySynchronousFile来收集一段时间之内的请求， 最后一次性发送给服务器 

## 中介者模式 

> 中介者模式的定义:通过⼀个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，当其中的⼀个对象发⽣改变时，只需要通知中介者对象即可。通过中介者模式可以解除对象与对象之间的紧耦合关系。
> 

例如:

现实⽣活中，航线上的⻜机只需要和机场的塔台通信就能确定航线和⻜⾏状态，⽽不需要和所有飞机通信。同时塔台作为中介者，知道每架飞机的飞行状态，所以可以安排所有飞机的起降和航线安排。 

中介者模式适用的场景:

例如购物⻋需求，存在商品选择表单、颜色选择表单、购买数量表单等等，都会触发change事件，那么可以通过中介者来转发处理这些事件，实现各个事件间的解耦，仅仅维护中介者对象即可。 

redux，vuex都属于中介者模式的实际应⽤，我们把共享的数据，抽离成一个单独的store，每个都通过store这个中介来操作对象，目的就是减少耦合 

## 装饰器模式 

> 装饰者模式的定义:在不改变对象⾃身的基础上，在程序运行期间给对象动态地添加⽅法。常⻅应用， react的⾼阶组件, 或者react-redux中的@connect 或者自己定义⼀些⾼阶组件 

装饰者模式和代理模式的结构看起来⾮常相像，这两种模式都描述了怎样为对象提供一定程度上的间接引用，它们的实现部分都保留了对另外⼀个对象的引⽤，并且向那个对象发送请求。 代理模式和装饰者模式最重要的区别在于它们的意图和设计⽬的。代理模式的目的是，当直接访问本体不⽅便或者不符合需要时，为这个本体提供⼀个替代者。本体定义了关键功能，⽽代理提供或拒绝对它的访问，或者在访问本体之前做⼀些额外的事情。装饰者模式的作用就是为对象动态加入⾏为。 

其实Vue中的v-input，v-checkbox也可以认为是装饰器模式， 对原生的input和checkbox做一层装饰 

## 外观模式 

> 外观模式即让多个方法一起被调⽤涉及到兼容性，参数⽀持多格式，有很多这种代码，对外暴露统一的api

⽐如上面的$on 支持数组， ¥off参数支持多个情况， 对面只⽤⼀个函数，内部判断实现

⾃⼰封装组件库经常看到 

```js

myEvent = {
  stop: function(e) {
    if (typeof e.preventDefault() === "function") {
      e.preventDefault();
    }
    if (typeof e.stopPropagation() === "function") {
      e.stopPropagation();
    }
    //for IE
    if (typeof e.returnValue === "boolean") {
      e.returnValue = false;
    }
    if (typeof e.cancelBubble === "boolean") {
      e.cancelBubble = true;
    }
  }
  addEvent(dom, type, fn) {
    if (dom.addEventListener) {
      dom.addEventListener(type, fn, false);
    } else if (dom.attachEvent) {
      dom.attachEvent('on' + type, fn);
    } else {
      dom['on' + type] = fn;
    } }
}
```

## ⼯⼚模式 

提供创建对象的接⼝，把成员对象的创建⼯作转交给⼀个外部对象，好处在于消除对象之间的耦合(也就是相互影响) 

常见的例⼦，ElementUI的弹框组件message，对外提供的api，都是调用api，然后新建⼀个弹窗或者Message 的实例，就是典型的⼯⼚模式 

```js
const Notification = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  const userOnClose = options.onClose;
  const id = 'notification_' + seed++;
  const position = options.position || 'top-right';
  options.onClose = function() {
    Notification.close(id, userOnClose);
  };
  instance = new NotificationConstructor({
    data: options
  });
  if (isVNode(options.message)) {
    instance.$slots.default = [options.message];
    options.message = 'REPLACED_BY_VNODE';
  }
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instance.dom = instance.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  let verticalOffset = options.offset || 0;
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};
```

https://github.com/ElemeFE/element/blob/dev/packages/notification/src/main.js#L11 

## 建造者模式 

和工厂模式相⽐，参与了更多创建的过程 或者更复杂 

例如：

```js

var Person = function(name, work) { // 创建应聘者缓存对象
  var _person = new Human();
  // 创建应聘者姓名解析对象 _person.name = new Named(name);
  // 创建应聘者期望职位 _person.work = new Work(work);
  return _person;
};
var person = new Person('xiao ming', 'code');
console.log(person)
```

## 迭代器模式

> 迭代器模式是指提供⼀种方法顺序访问⼀个聚合对象中的各个元素，⽽⼜不需要暴露该对象的内部表示。迭代器器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关⼼对象的内部构造，也可以按顺序访问其中的每个元素 

这个⽤就太多了， 好多遍历的方法都是这种原理，比如：each 、map 

```js
var each = function( ary, callback ){
  for ( var i = 0, l = ary.length; i < l; i++ ){
    callback.call( ary[i], i, ary[ i ] );
  }
};
each( [ 1, 2, 3 ], function( i, n ){
  alert ( [ i, n ] );
})
```

## 享元模式 

> 享元(flyweight)模式是⼀种⽤用于性能优化的模式，“fly”在这⾥是苍蝇的意思，意为蝇量级。享元模式的核⼼是运用共享技术来有效⽀持⼤量细粒度的对象。 如果系统中因为创建了⼤量类似的对象⽽而导致内存占⽤过⾼，享元模式就非常有⽤了。在 JavaScript 中，浏览器特别是移动端的浏览器分配的内存并不算多，如何节省内存就成了了⼀件⾮非常有意义的事情。 

* 内部状态存储于对象内部
* 内部状态可以被⼀些对象共享
* 内部状态独⽴于具体的场景，通常不会改变
* 外部状态取决于具体的场景，并根据场景⽽而变化，外部状态不能被共享

## 职责链模式 

> 职责链模式的定义是:使多个对象都有机会处理请求，从⽽避免请求的发送者和接收者之间的耦合关系， 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为⽌。 职责链模式的名字⾮常形象，⼀系列列可能会处理请求的对象被连接成一条链，请求在这些对象之间依次传递，直到遇到⼀个可以处理它的对象，我们把这些对象称为链中的节点 

## 适配器模式 

> 适配器模式的作⽤是解决两个软件实体间的接⼝不兼容的问题。使⽤用适配器模式之后，原本由于接⼝不兼容⽽而不能⼯作的两个软件实体可以⼀起工作。 适配器的别名是包装器(wrapper)，这是⼀个相对简单的模式。

在程序开发中有许多这样的场景

​	当我们试图调用模块或者对象的某个接⼝时，却发现这个接⼝的格式并不符合目前的需求。 这时候有两种解决办法，第⼀种是修改原来的接⼝实现，但如果原来的模块很复杂，或者我们拿到的模块是一段别⼈人编写的经过压缩的代码，修改原接⼝就显得不太现实了。第⼆种办法是创建⼀个适配器，将原接⼝转换为客户希望的另⼀个接⼝，客户只需要和适配器打交道 

```js

var googleMap = {
  show: function(){
    console.log( '开始渲染⾕谷歌地图' ); }
};
var baiduMap = {
  display: function(){
    console.log( '开始渲染百度地图' );
  } };
var baiduMapAdapter = {
  show: function(){
    return baiduMap.display();
  }
};
renderMap( googleMap ); // 输出:开始渲染⾕谷歌地图 
renderMap( baiduMapAdapter ); // 输出:开始渲染百度地图
```

适配器器模式主要⽤来解决两个已有接⼝之间不匹配的问题，它不考虑这些接⼝是怎样实现的，也不考虑它们将来可能会如何演化。适配器器模式不需要改变已有的接⼝，就能够使它们协同作⽤。 

装饰者模式和代理理模式也不会改变原有对象的接⼝，但装饰者模式的作⽤是为了给对象增加功能。装饰者模式常常形成一条⻓长的装饰链，⽽适配器器模式通常只包装⼀次。代理模式是为了控制对对象的访问， 通常也只包装一次。 

我们设计很多插件，有默认值，也算是适配器器的⼀种应⽤， vue的prop校验，default也算是适配器的应⽤了 

外观模式的作用倒是和适配器⽐较相似，有⼈把外观模式看成⼀组对象的适配器，但外观模式最显著的特点是定义了⼀个新的接⼝。

## 模板方法模式 

>模板方法模式在一个⽅法中定义一个算法的骨架，而将⼀些步骤的实现延迟到子类中。模板⽅法使得子类可以在不改变算法结构的情况下，重新定义算法中某些步骤的具体实现

这个我们用的很多，vue中的slot，react中的children

## 备忘录模式 

可以恢复到对象之前的某个状态，其实⼤家学习react或者redux的时候，时间旅行的功能，就算是备忘录模式的一个应⽤ 

https://zh-hans.reactjs.org/tutorial/tutorial.html#implementing-time-travel 

