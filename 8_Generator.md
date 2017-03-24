## ES6 Generator

### 1.简介

Generator函数是一个函数的内部状态的遍历器（也就是说，Generator函数是一个状态机）。

形式上，Generator函数是一个普通函数，但是有两个特征。

一是，function命令与函数名之间有一个星号；  
二是，函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态。

```javascript
    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }
     
    var hw = helloWorldGenerator();
    hw.next()
    // { value: 'hello', done: false }
     
    hw.next()
    // { value: 'world', done: false }
     
    hw.next()
    // { value: 'ending', done: true }
     
    hw.next()
    // { value: undefined, done: true }
```

### 2.next方法的参数

yield语句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

```javascript
    function* f() {
      for(var i=0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
      }
    }
     
    var g = f();
     
    g.next() // { value: 0, done: false }
    g.next() // { value: 1, done: false }
    g.next(true) // { value: 0, done: false }
```

上面代码先定义了一个可以无限运行的Generator函数f，如果next方法没有参数，每次运行到yield语句，变量reset的值总是undefined。当next方法带一个参数true时，当前的变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

### 3.for...of循环

for...of循环可以自动遍历Generator函数，且此时不再需要调用next方法。

```javascript
    function *foo() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      return 6;
    }
     
    for (let v of foo()) {
      document.write(v);
    }
    // 1 2 3 4 5
```

上面代码使用for...of循环，依次显示5个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

下面是一个利用generator函数和for...of循环，实现斐波那契数列的例子。

```javascript
    function* fibonacci() {
      let [prev, curr] = [0, 1];
      for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
      }
    }
     
    for (let n of fibonacci()) {
      if (n > 1000) break;
      document.write(n);
    }
```

从上面代码可见，使用for...of语句时不需要使用next方法。

### 4.throw方法

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```javascript
    function* gen(x){
      try {
        var y = yield x + 2;
      } catch (e){ 
        document.write(e);
      }
      return y;
    }
     
    var g = gen(1);
    g.next();
    g.throw（'出错了'）;
    // 出错了
```

上面代码的最后一行，Generator 函数体外，使用指针对象的 throw 方法抛出的错误，可以被函数体内的 try ... catch 代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。

### 5.yield*语句


如果yield命令后面跟的是一个遍历器，需要在yield命令后面加上星号，表明它返回的是一个遍历器。这被称为yield*语句。

其实yield关键字就是以一种更直观、便捷的方式让我们创建用于遍历有限序列集合的迭代器，而yield则用于将生成器函数的代码切片作为有限序列集合的元素（元素的类型为指令+数据，而不仅仅是数据而已）。下面我们一起看看yield关键字是怎样对代码切片的吧！

```javascript
// 定义生成器函数
    function *enumerable(msg){
      document.write(msg)
      var msg1 = yield msg + '  after '
      document.write(msg1)
      var msg2 = yield msg1 + ' after'
      document.write(msg2 + ' over')
    }
```

上述代码最终会被解析为下面的代码：

```javascript
    var enumerable = function(msg){
      var state = -1
     
      return {
        next: function(val){
          switch(++state){
             case 0:
                      document.write(msg + ' after')
                      break
             case 1:
                      var msg1 = val
                      document.write(msg1 + ' after')
                      break
             case 2:
                      var msg2 = val
                      document.write(msg2 + ' over')
                      break
          }
        }
      }
    }
```

### 6.作为对象属性的Generator函数


如果一个对象的属性是Generator函数，可以简写成下面的形式。

```javascript
    let obj = {
      * myGeneratorMethod() {
        // ···
      }
    };
```

上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个Generator函数。

它的完整形式如下，与上面的写法是等价的。

```javascript
    let obj = {
      myGeneratorMethod: function* () {
        // ···
      }
    };
```