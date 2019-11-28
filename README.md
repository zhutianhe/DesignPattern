# 设计模式
百科中是这么说的：
Design pattern(设计模式)是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

任何事情都有套路，设计模式，就是写代码中的常⻅套路， 有些写法我们日常都⼀直在使⽤用，下面我们来介绍一下 

## 订阅**/**发布模式 (观察者) 

pub/sub 这个应该大家用到最⼴的设计模式了， 

在这种模式中，并不是⼀个对象调用另⼀个对象的⽅法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。订阅者因此也成为观察者，⽽被观察的对象成为发布者或者主题。当发⽣了一个重要事件时候发布者会通知(调⽤用)所有订阅者并且可能经常已事件对象的形式传递消息

vue中的on源码 ⼤概也是这个样⼦子 https://github.com/vuejs/vue/blob/dev/src/core/instance/events.js#L54 

## 单例模式 



```
 单例模式的定义:保证一个类仅有⼀个实例例，并提供一个访问它的全局访问点。实现的⽅法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
```

适⽤用场景:⼀个单一对象。⽐如:弹窗，⽆论点击多少次，弹窗只应该被创建一次，实现起来也很简单，⽤⼀个变量缓存即可 

应⽤用场景 

我们再element中的弹窗代码中，可以看到单例例模式的实际案例例 保证全局唯⼀一性 https://github.com/El emeFE/element/blob/dev/packages/message-box/src/main.js#L79 



## 策略模式 

```
策略略模式的定义:定义⼀一系列列的算法，把他们⼀一个个封装起来，并且使他们可以相互替换。
策略略模式的⽬目的就是将算法的使⽤用算法的实现分离开来。
```

⼀一个基于策略略模式的程序⾄至少由两部分组成。第⼀一个部分是⼀一组策略略类(可变)，策略略类封装了了具体的 算法，并负责具体的计算过程。第⼆二个部分是环境类Context(不不变)，Context接受客户的请求，随后 将请求委托给某⼀一个策略略类。要做到这⼀一点，说明Context中要维持对某个策略略对象的引⽤用 

举个栗栗⼦子 

奖⾦金金计算，绩效为 S 的⼈人年年 终奖有 4 倍⼯工资，绩效为 A 的⼈人年年终奖有 3 倍⼯工资，⽽而绩效为 B 的⼈人年年终 奖是 2 倍⼯工资 

```
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
calculateBonus( 'B', 20000 ); // 输出:40000 calculateBonus( 'S', 6000 ); // 输出:24000
```



使⽤用策略略模式 

```
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
```

console.log( calculateBonus( 'S', 20000 ) );// 输出:80000 console.log( calculateBonus( 'A', 10000 ) );// 输出:30000 



表单校验 

// 正常写法
 var registerForm = document.getElementById( 'registerForm' ); registerForm.onsubmit = function(){ 

if ( registerForm.userName.value === '' ){ alert ( '⽤用户名不不能为空' );
 return false; 

} 

if ( registerForm.password.value.length < 6 ){ alert ( '密码⻓长度不不能少于 6 位' );
 return false; 

```
    }
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ){
```

alert ( '⼿手机号码格式不不正确' ); 

```
        return false;
    }
```

} 



```
var strategies = {
    isNonEmpty: function( value, errorMsg ){
        if ( value === '' ){
            return errorMsg ;
```

} }, 

```
    minLength: function( value, length, errorMsg ){
        if ( value.length < length ){
            return errorMsg;
        }
```

},
 isMobile: function( value, errorMsg ){ // ⼿手机号码格式 

```
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
            return errorMsg;
```

} } 

```
};
```





```
var Validator = function(){
```

this.cache = []; // 保存校验规则 }; 

```
Validator.prototype.add = function(
    var ary = rule.split( ':' );
    this.cache.push(function(){ //
        var strategy = ary.shift();
        ary.unshift( dom.value );
        ary.push( errorMsg ); //
        return strategies[strategy].apply(dom, ary);
```

}); }; 



## 代理模式 

```
代理理模式的定义:为⼀一个对象提供⼀一个代⽤用品或占位符，以便便控制对它的访问。
常⽤用的虚拟代理理形式:某⼀一个花销很⼤大的操作，可以通过虚拟代理理的⽅方式延迟到这种需要它的时候才去
创建(例例:使⽤用虚拟代理理实现图⽚片懒加载)
```

图⽚片懒加载的⽅方式:先通过⼀一张loading图占位，然后通过异步的⽅方式加载图⽚片，等图⽚片加载好了了再把 完成的图⽚片加载到img标签⾥里里⾯面。 

假设我们在做⼀一个⽂文件同步的功能，当我们选中⼀一个 checkbox 的时候，它对应的⽂文件就会被同 步到另 外⼀一台备⽤用服务器器上⾯面。当⼀一次选中过多时，会产⽣生频繁的⽹网络请求。将带来很⼤大的开销。可以通过⼀一 个代理理函数 proxySynchronousFile 来收集⼀一段时间之内的请求， 最后⼀一次性发送给服务器器 



## 中介者模式 

```
中介者模式的定义:通过⼀一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，⽽而不不是相
互引⽤用，当其中的⼀一个对象发⽣生改变时，只需要通知中介者对象即可。通过中介者模式可以解除对象与
对象之间的紧耦合关系。
例例如:现实⽣生活中，航线上的⻜飞机只需要和机场的塔台通信就能确定航线和⻜飞⾏行行状态，⽽而不不需要和所有
⻜飞机通信。同时塔台作为中介者，知道每架⻜飞机的⻜飞⾏行行状态，所以可以安排所有⻜飞机的起降和航线安
```

排。 

中介者模式适⽤用的场景:例例如购物⻋车需求，存在商品选择表单、颜⾊色选择表单、购买数量量表单等等，都 会触发change事件，那么可以通过中介者来转发处理理这些事件，实现各个事件间的解耦，仅仅维护中介 者对象即可。 

redux，vuex 都属于中介者模式的实际应⽤用，我们把共享的数据，抽离成⼀一个单独的store， 每个都通 过store这个中介来操作对象 

⽬目的就是减少耦合 



## 装饰器模式 

装饰者模式的定义:在不不改变对象⾃自身的基础上，在程序运⾏行行期间给对象动态地添加⽅方法。常⻅见应⽤用， react的⾼高阶组件, 或者react-redux中的@connect 或者⾃自⼰己定义⼀一些⾼高阶组件 