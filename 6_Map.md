## ES6 Map

### 1.Map结构的目的和基本用法

Map 是一个“超对象”，其 key 除了可以是 String 类型之外，还可以为其他类型（如：对象）

```javascript
    var m = new Map();
     
    o = {p: "Hello World"};
     
    m.set(o, "content")
     
    document.write(m.get(o))
    // "content"
```

### 2.Map属性和方法

他的方法和 Set 差不多：

+ size：返回成员总数。

操作方法

+ set(key, value)：设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。
+ get(key)：读取key对应的键值，如果找不到key，返回undefined。
+ has(key)：返回一个布尔值，表示某个键是否在Map数据结构中。
+ delete(key)：删除某个键，返回true。如果删除失败，返回false。
+ clear()：清除所有成员，没有返回值。

遍历方法

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回所有成员的遍历器。

```javascript
    let map = new Map([
      ['F', 'no'],
      ['T',  'yes'],
    ]);
     
    for (let key of map.keys()) {
      document.write(key);
    }
    // "F"
    // "T"
     
    for (let value of map.values()) {
      document.write(value);
    }
    // "no"
    // "yes"
     
    for (let item of map.entries()) {
      document.write(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"
     
    // 或者
    for (let [key, value] of map.entries()) {
      document.write(key, value);
    }
     
    // 等同于使用map.entries()
    for (let [key, value] of map) {
      document.write(key, value);
    }
```

Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。

```javascript
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    [...map.keys()]
    // [1, 2, 3]
    [...map.values()]
    // ['one', 'two', 'three']
    [...map.entries()]
    // [[1,'one'], [2, 'two'], [3, 'three']]
    [...map]
    // [[1,'one'], [2, 'two'], [3, 'three']]
```

此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。

```javascript
    map.forEach(function(value, key, map)) {
        document.write("Key: %s, Value: %s", key, value);
    };
```

### 3.WeakMap

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受原始类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。set()和get()分别用来添加数据和获取数据:

```javascript
    var map = new WeakMap(),
        element = document.querySelector(".element");
    map.set(element, "Original");
     
    // 下面就可以使用了
    var value = map.get(element);
    document.write(value); // "Original"
```

WeakMap与Map在API上的区别主要是两个:

+ 一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性；
+ 二是无法清空，即不支持clear方法。这与WeakMap的键不被计入引用、被垃圾回收机制忽略有关。

因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。