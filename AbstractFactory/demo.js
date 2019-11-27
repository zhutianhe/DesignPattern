/*
*
* @Author: zth
* @Date:   2018-12-04 20:51:31
* @Last Modified by:   zth
* @Last Modified time: 2018-12-04 21:32:56
* 抽象工厂模式
*
* 定义： 提供一个创建一系列相关或相互依赖对象的接口，而无需制定它们具体的类。
*
* 本质：
* 选择产品簇的实现。
*
* 功能：
* 为一系列相关对象或相互依赖的对象创建一个接口。这个接口内的方法不是任意堆砌的，而是一系列相关或相互依赖的方法。
* 从某种意义上看，抽象工厂其实是一个产品系列，或者是产品簇。
*
* 使用工厂方法来实现抽象工厂。
*
* 工厂方法是选择单个产品的实现，虽然一个类里面可以有多个工厂方法，但是这些方法之间一般是没有联系的，即使看起来像有联系。
* 但是抽象工厂着重的就是为一个产品簇选择实现，定义在抽象工厂里面的方法通常是由联系的，它们都是产品的某一部分或者是相互依赖的。如果抽象工厂里面只定义一个方法，直接创建产品，那么就退化成为工厂方法。
*
* 何时使用？
* 1.如果希望一个系统独立于它的产品的创建，组合和表示的时候。也就是一个系统只是知道产品的接口，而不关心实现的时候、
* 2.如果一个系统要由多个产品系列中的一个来配置的时候。也就是可以动态地切换产品簇的时候。
* 3.如果要强调一系列相关产品的接口，以便联合使用它们的时候。
*
* 优点：
* 分离接口和实现
* 使得切换产品簇变得容易
*
* 缺点：
* 不太容易扩展新产品
* 容易造成雷层次复杂
*
* 抽象工厂模式和单例模式
* 这两个模式可以组合使用。
* 在抽象工厂模式里面，具体的工厂实现，在整个应用中，通常一个产品系列只需要一个实例就可以了，因此可以把具体的工厂实现成为单例。
*
*/


var AbstractFactory = function() {};
AbstractFactory.prototype = {
  
  createProductA: function() {},
  createProductB: function() {}
};


var AbstractProductA = function() {};
var AbstractProductB = function() {};


var ProductA1 = function() {};
ProductA1.prototype = Object.create(AbstractProductA.prototype);
var ProductA2 = function() {};
ProductA2.prototype = Object.create(AbstractProductA.prototype);


var ProductB1 = function() {};
ProductB1.prototype = Object.create(AbstractProductB.prototype);
var ProductB2 = function() {};
ProductB2.prototype = Object.create(AbstractProductB.prototype);


var ConcretFacotory1 = function () {}
ConcretFacotory1.prototype = Object.create(AbstractFactory.prototype);
ConcretFacotory1.prototype.createProductA = function() {
  return new ProductA1();
};
ConcretFacotory1.prototype.createProductB = function() {
  return new ProductB1();
};

var ConcretFacotory2 = function () {}
ConcretFacotory2.prototype = Object.create(AbstractFactory.prototype);
ConcretFacotory2.prototype.createProductA = function() {
  return new ProductA2();
};
ConcretFacotory2.prototype.createProductB = function() {
  return new ProductB2();
};

var af = new ConcretFacotory1();
af.createProductA()；
af.createProductB();




