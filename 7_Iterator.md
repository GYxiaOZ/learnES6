## ES6 Iterator(遍历器)

### 1.Iterator（遍历器）的概念

遍历器（Iterator）就是统一的接口机制，来处理所有不同的数据结构。

Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

Iterator的遍历过程是这样的。

+ 创建一个指针，指向当前数据结构的起始位置。也就是说，遍历器的返回值是一个指针对象。
+ 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
+ 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
+ 调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回当前成员的信息，具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

### 2.数据结构的默认Iterator接口

在ES6中，可迭代数据结构(比如数组)都必须实现一个名为Symbol.iterator的方法，该方法返回一个该结构元素的迭代器。注意，Symbol.iterator是一个Symbol，Symbol是ES6新加入的原始值类型。

```javascript
    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();
     
    iter.next() // { value: 'a', done: false }
    iter.next() // { value: 'b', done: false }
    iter.next() // { value: 'c', done: false }
    iter.next() // { value: undefined, done: true }
```

上面代码中，变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器。

### 3.调用默认Iterator接口的场合

有一些场合会默认调用iterator接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

**解构赋值**  
对数组和Set结构进行解构赋值时，会默认调用iterator接口。

```javascript
    let set = new Set().add('a').add('b').add('c');
     
    let [x,y] = set;
    // x='a'; y='b'
     
    let [first, ...rest] = set;
    // first='a'; rest=['b','c'];
```

**扩展运算符**  
扩展运算符（...）也会调用默认的iterator接口。

``` javascript
// 例一
    var str = 'hello';
    [...str] //  ['h','e','l','l','o']
     
    // 例二
    let arr = ['b', 'c'];
    ['a', ...arr, 'd']
    // ['a', 'b', 'c', 'd']
```

**其他场合**  
以下场合也会用到默认的iterator接口，可以查阅相关章节。

+ yield*
+ Array.from()
+ Map(), Set(), WeakMap(), WeakSet()
+ Promise.all(), Promise.race()

### 4.原生具备Iterator接口的数据结构

字符串是一个类似数组的对象，也原生具有Iterator接口。

```javascript
    var someString = "hi";
    typeof someString[Symbol.iterator]
    // "function"
     
    var iterator = someString[Symbol.iterator]();
     
    iterator.next()  // { value: "h", done: false }
    iterator.next()  // { value: "i", done: false }
    iterator.next()  // { value: undefined, done: true }
```

上面代码中，调用Symbol.iterator方法返回一个遍历器，在这个遍历器上可以调用next方法，实现对于字符串的遍历。

可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。

```javascript
    var str = new String("hi");
     
    [...str] // ["h", "i"]
     
    str[Symbol.iterator] = function() {
      return {
        next: function() {
          if (this._first) {
            this._first = false;
            return { value: "bye", done: false };
          } else {
            return { done: true };
          }
        },
        _first: true
      };
    };
     
    [...str] // ["bye"]
    str // "hi"
```

上面代码中，字符串str的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。

### 5.Iterator接口与Generator函数

Symbol.iterator方法的最简单实现，是使用Generator函数。

```javascript
    var myIterable = {};
     
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    [...myIterable] // [1, 2, 3]
     
    // 或者采用下面的简洁写法
     
    let obj = {
      * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    };
     
    for (let x of obj) {
      document.write(x);
    }
    // hello
    // world
```

上面代码中，Symbol.iterator方法几乎不用部署任何代码，只要用yield命令给出每一步的返回值即可。

### 6.遍历器的return()，throw()

遍历器返回的指针对象除了具有next方法，还可以具有return方法和throw方法。其中，next方法是必须部署的，return方法和throw方法是否部署是可选的。

return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。

throw方法主要是配合Generator函数使用，一般的遍历器用不到这个方法。

### 7.for...of循环

