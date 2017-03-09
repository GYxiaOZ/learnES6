## ES6 Set

### 1.基本用法

数据结构Set类似于数组，但是成员的值都是唯一的，没有重复的值。

```javascript
    var s = new Set();
    [2,3,5,4,5,2,2].map(x => s.add(x))
    for (i of s) {document.write(i)}
    // 2 3 5 4
```

Set函数可以接受一个数组作为参数，用来初始化。

```javascript
    var items = new Set([1,2,3,4,5,5,5,5]);
    document.write(items.size); // 5
```

向Set加入值的时候，不会发生类型转换，所以5和“5”是两个不同的值。

```javascript
    let set = new Set([{},{}]);
    set.size // 2
    set.add(5);
    set.add('5');
    set.size // 4
```

上面代码表示，由于两个空对象不是精确相等，所以它们被视为两个值。

### 3.Set实例的属性

Set结构的实例有以下属性。

+ Set.prototype.constructor：构造函数，默认就是Set函数。
+ Set.prototype.size：返回Set实例的成员总数。

### 4.Set实例的方法-操作方法（用于操作数据）

+ add(value)：添加某个值，返回Set结构本身。
+ delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
+ has(value)：返回一个布尔值，表示该值是否为Set的成员。
+ clear()：清除所有成员，没有返回值。

```javascript
    let s = new Set();
    s.add(1).add(2).add(2);
     
    s.has(1) // true
    s.has(2) // true
    s.has(3) // false
    s.delete(2);
    s.has(2) // false
```

Array.from方法可以将Set结构转为数组：

```javascript
    var items = new Set([1, 2, 3, 4, 5]);
    var array = Array.from(items);
```

### 5.Set实例的方法-遍历方法（用于遍历成员）

+ keys()：返回一个键名的遍历器
+ values()：返回一个键值的遍历器
+ entries()：返回一个键值对的遍历器
+ forEach()：使用回调函数遍历每个成员

由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以key方法和value方法的行为完全一致。

```javascript
    let set = new Set(['red', 'green', 'blue']);
     
    for ( let item of set.keys() ){
      document.write(item);
    }
    // red
    // green
    // blue
     
    for ( let item of set.values() ){
      document.write(item);
    }
    // red
    // green
    // blue
     
    for ( let item of set.entries() ){
      document.write(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
     
    set.forEach(function(item){
        document.write(item);
    })
```

### 6.WeakSet

WeakSet和Set一样都不存储重复的元素，但有一些不同点 。  
WeakSet的成员只能是对象，而不能是其他类型的值。

```javascript
    var ws = new WeakSet();
    ws.add(1)
    // TypeError: Invalid value used in weak set
```

WeakSet结构有以下三个方法。

+ WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
+ WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
+ WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在

WeakSet没有size属性，没有办法遍历它的成员。