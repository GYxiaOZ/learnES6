## ES6 Class

### Class基本语法

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
```javascript
    //定义类
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      toString() {
        return '('+this.x+', '+this.y+')';
      }
    }
```
上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。

#### constructor方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。

实例对象
```
var point = new Point(2, 3);
```

name属性
```
class Point {}
Point.name // "Point"
```

class表达式

与函数一样，Class也可以使用表达式的形式定义。
```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

### Class的继承

Class之间可以通过extends关键字，实现继承。

子类会继承父类的属性和方法。

```javascript
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }
     
    class ColorPoint extends Point {
      constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
      }
    }
```

上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。

注意：ColorPoint继承了父类Point，但是它的构造函数必须调用super方法。

下面是生成子类实例的代码。
```javascript
    let cp = new ColorPoint(25, 8, 'green');
     
    cp instanceof ColorPoint // true
    cp instanceof Point // true
```

### class的取值函数（getter）和存值函数（setter）

在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数。
```javascript
    class MyClass {
      get prop() {
        return 'getter';
      }
      set prop(value) {
        document.write('setter: '+value);
      }
    }
     
    let inst = new MyClass();
     
    inst.prop = 123;
    // setter: 123
     
    inst.prop
    // 'getter'
```
上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

### Class的Generator方法

如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。

```javascript
    class Foo {
      constructor(...args) {
        this.args = args;
      }
      * [Symbol.iterator]() {
        for (let arg of this.args) {
          yield arg;
        }
      }
    }
     
    for (let x of new Foo('hello', 'world')) {
      document.write(x);
    }
    // hello
    // world
```

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

### Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    Foo.classMethod() // 'hello'
    var foo = new Foo();
    foo.classMethod()
    // TypeError: undefined is not a function
```
上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

父类的静态方法，可以被子类继承。
```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    class Bar extends Foo {
    }
    Bar.classMethod(); // 'hello'
```
上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

静态方法也是可以从super对象上调用的。
```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    class Bar extends Foo {
      static classMethod() {
        return super.classMethod() + ', too';
      }
    }
    Bar.classMethod();
```

### new.target属性

new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```javascript
    function Person(name) {
      if (new.target !== undefined) {
        this.name = name;
      } else {
        throw new Error('必须使用new生成实例');
      }
    }
     
    // 另一种写法
    function Person(name) {
      if (new.target === Person) {
        this.name = name;
      } else {
        throw new Error('必须使用new生成实例');
      }
    }
     
    var person = new Person('张三'); // 正确
    var notAPerson = Person.call(person, '张三');  // 报错
```
上面代码确保构造函数只能通过new命令调用。

Class内部调用new.target，返回当前Class。
子类继承父类时，new.target会返回子类。

### 修饰器-类的修饰

修饰器（Decorator）是一个表达式，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。
```javascript
    function testable(target) {
      target.isTestable = true;
    }
     @testable
    class MyTestableClass {}
    console.log(MyTestableClass.isTestable) // true
```
上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。

基本上，修饰器的行为就是下面这样。
```javascript
     @decorator
    class A {}
     
    // 等同于
     
    class A {}
    A = decorator(A) || A;
```
也就是说，修饰器本质上就是能在编译时执行的函数。

修饰器函数可以接受三个参数，依次是目标函数、属性名和该属性的描述对象。后两个参数可省略。上节修饰器-类的修饰1代码中，testable函数的参数target，就是所要修饰的对象。如果希望修饰器的行为，能够根据目标对象的不同而不同，就要在外面再封装一层函数。
```javascript
     function testable(isTestable) {
       return function(target) {
         target.isTestable = isTestable;
       }
     }
     
     @testable(true) class MyTestableClass () {}
     document.write(MyTestableClass.isTestable) // true
     
     @testable(false) class MyClass () {}
     document.write(MyClass.isTestable) // false
```
如果想要为类的实例添加方法，可以在修饰器函数中，为目标类的prototype属性添加方法。
```javascript
    function testable(target) {
      target.prototype.isTestable = true;
    }
     
     @testable
    class MyTestableClass () {}
     
    let obj = new MyClass();
     
    document.write(obj.isTestable) // true
```