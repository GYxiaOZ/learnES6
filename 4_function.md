## ES6 函数

### 1.默认参数

```javascript
    function sayHello2(name='hubwiz'){
        document.write(`Hello ${name}`);
    }
```

### 2.rest参数

rest参数（形式为“...变量名”）可以称为不定参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。

```javascript
    function add(...values) {
       let sum = 0;
     
       for (var val of values) {
          sum += val;
       }
     
       return sum;
    }
    add(1, 2, 3) // 6
```

### 3.扩展运算符

扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。  
它允许传递数组或者类数组直接做为函数的参数而不用通过apply。

```javascipt
    var people=['张三','李四','王五'];
    //sayHello函数本来接收三个单独的参数people1，people2和people3
    function sayHello(people1,people2,people3){
        document.write(`Hello ${people1},${people2},${people3}`);
    }
    //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
    sayHello(...people);   //输出：Hello 张三,李四,王五 
    //而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
    sayHello.apply(null,people);   //输出：Hello 张三,李四,王五 
```

### 4.箭头函数

```javascript
    var array = [1, 2, 3];
    //传统写法
    array.forEach(function(v, i, a) {
        document.write(v);
    });
    //ES6
    array.forEach((v,i,a) => console.log(v,i,a));
```

它们同时支持表达式体和语句体。与（普通的）函数所不同的是，箭头函数和其上下文中的代码共享同一个具有词法作用域的this。

```javascipt
    var evens = [1,2,3,4,5];
    var fives = [];

    // 表达式体
    var odds = evens.map(v => v + 1);
    var nums = evens.map((v, i) => v + i);
    var pairs = evens.map(v => ({even: v, odd: v + 1}));

    // 语句体
    nums.forEach(v => {
      if (v % 5 === 0)
        fives.push(v);
    });
    document.write(fives);

    // 具有词法作用域的 this
    var bob = {
      _name: "Bob",
      _friends: ["Amy", "Bob", "Cinne", "Dylan", "Ellen"],
      printFriends() {
        this._friends.forEach(f =>
          document.write(this._name + " knows " + f));
      }
    }
    bob.printFriends();
```

箭头函数有几个使用注意点。

+ 函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
+ 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
+ 不可以使用arguments对象，该对象在函数体内不存在。

上面三点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

### 5.函数绑定

函数绑定运算符是并排的两个双引号（::），双引号左边是一个对象，右边是一个函数。  
该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

```javascript
    let log = ::console.log;
    // 等同于
    var log = console.log.bind(console);
     
    foo::bar;
    // 等同于
    bar.call(foo);
     
    foo::bar(...arguments);
    i// 等同于
    bar.apply(foo, arguments);
```

### 6.尾调用优化

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。

```javascript
    function f() {
      let m = 1;
      let n = 2;
      return g(m + n);
    }
    f();
     
    // 等同于
    function f() {
      return g(3);
    }
    f();
     
    // 等同于
    g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧，这样可以节省内存。