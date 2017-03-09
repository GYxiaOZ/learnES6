1.属性的简洁表示法  
    ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
    function f( x, y ) {
        return { x, y };
    }
    var Person = {
        name: 'zz',
        hello () {
            console.log(this.name);
        }
    }
```

2.属性名表达式  

```javascript
    let obj = {
        ['a'+'bc']: 123,
        ['h'+'ello']() {
            return 'hi';
        }
    };
```

3.比较两个值是否严格相等  

```javascript
    +0 === -0 //true
    NaN === NaN // false
    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true
```

4.Object.assign  
    将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。
    如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```javascript
    var target = { a: 1, b: 1 };
    var source1 = { b: 2, c: 2 };
    var source2 = { c: 3 };
    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
```

5.`__proto__  `  
    读取或设置当前对象的prototype对象

```javascript
    // ES6
    var obj = {
        __proto__: someOtherObj,
        method: function() { ... }
    }
    // ES5
    var obj = Object.create(someOtherObj);
    obj.method = function() { ... }
```
    
6.Symbol类型  
    原始数据类型Symbol，表示独一无二的ID。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
    Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。
    Symbol类型的值不能与其他类型的值进行运算，会报错。但是，Symbol类型的值可以转为字符串。

```javascript
    var sym = Symbol('My symbol');
    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'
```

7.内置代理  
    Proxy 内置的一个代理工具，使用他可以在对象处理上加一层屏障  
    `var proxy = new Proxy(target, handler)`  
    new Proxy()表示生成一个Proxy实例，它的target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

```javascript
    var handler = {
        get: function(target, name){
            return name in target?
                target[name] :
                37;
        }
    };

    var p = new Proxy({}, handler);
    p.a = 1;
    p.b = undefined;

    console.log(p.a, p.b); // 1, undefined
    console.log('c' in p, p.c); // false, 37
```

Proxy(target, handler), 这里的 handler有如下的方法：

+ get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']，返回类型不限。最后一个参数receiver可选，当target对象设置了propKey属性的get函数时，receiver对象会绑定get函数的this对象。
+ set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
+ has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
+ deleteProperty(target, propKey) ：拦截delete proxy[propKey]的操作，返回一个布尔值。
+ enumerate(target)：拦截for (var x in proxy)，返回一个遍历器。
+ hasOwn(target, propKey)：拦截proxy.hasOwnProperty('foo')，返回一个布尔值。
+ ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。
+ getOwnPropertyDescriptor(target, propKey) ：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
+ defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
+ preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
+ getPrototypeOf(target) ：拦截Object.getPrototypeOf(proxy)，返回一个对象。
+ isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
+ setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。

如果目标对象是函数，那么还有两种额外操作可以拦截。

+ apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
+ construct(target, args, proxy)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)。
    
