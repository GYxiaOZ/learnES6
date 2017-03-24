## ES6 Promise

### 1.Promise的含义

所谓`Promise`，就是一个对象，用来传递异步操作的消息。

`Promise`对象有以下两个特点:

+ 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称Fulfilled）和`Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

`Promise`也有一些缺点:

+ 首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。
+ 其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
+ 第三，当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 2.基本用法

Promise对象是一个构造函数，用来生成Promise实例

```javascript
    //创建promise
    var promise = new Promise(function(resolve, reject) {
        // 进行一些异步或耗时操作
        if ( /*如果成功 */ ) {
            resolve("Stuff worked!");
        } else {
            reject(Error("It broke"));
        }
    });
    //绑定处理程序
    promise.then(function(result) {
        //promise成功的话会执行这里
        document.write(result); // "Stuff worked!"
    }, function(err) {
        //promise失败会执行这里
        document.write(err); // Error: "It broke"
    });
```

+ resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
+ reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

### Promise实例添加状态改变时的回调函数

Promise实例具有then方法，也就是说，then方法是定义在原型对象,作用是为Promise实例添加状态改变时的回调函数。

then方法两个参数：

+ Resolved状态的回调函数；
+ Rejected状态的回调函数（可选）。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

### 指定发生错误时的回调函数

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```javascript
    getJSON("/posts.json").then(function(posts) {
      // ...
    }).catch(function(error) {
      // 处理前一个回调函数运行时发生的错误
      document.write('发生错误！', error);
    });
```

getJSON方法返回一个Promise对象，如果该对象状态变为Resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误。

```javascript
    var promise = new Promise(function(resolve, reject) {
      throw new Error('test')
    });
    promise.catch(function(error) { document.write(error) });
    // Error: test
```

上面代码中，Promise抛出一个错误，就被catch方法指定的回调函数捕获。

Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

```javascript
    getJSON("/post/1.json").then(function(post) {
      return getJSON(post.commentURL);
    }).then(function(comments) {
      // some code
    }).catch(function(error) {
      // 处理前面三个Promise产生的错误
    });
```

上面代码中，一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

### Promise.all()方法

Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。

```javascript
    var p = Promise.all([p1,p2,p3]);
```

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例。（Promise.all方法的参数不一定是数组，但是必须具有iterator接口，且返回的每个成员都是Promise实例。）

p的状态由p1、p2、p3决定，分成两种情况。

+ 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
+ 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

下面是一个具体的例子。

```javascript
    // 生成一个Promise对象的数组
    var promises = [2, 3, 5, 7, 11, 13].map(function(id){
      return getJSON("/post/" + id + ".json");
    });
     
    Promise.all(promises).then(function(posts) {
      // ...
    }).catch(function(reason){
      // ...
    });
```

### Promise.race()方法

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。

```javascript
    var p = Promise.race([p1,p2,p3]);
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

### Promise.resolve()方法

有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

如果Promise.resolve方法的参数，不是具有then方法的对象（又称thenable对象），则返回一个新的Promise对象，且它的状态为Resolved。

```javascript
    var p = Promise.resolve('Hello');
     
    p.then(function (s){
      document.write(s)
    });
    // Hello
```

由于字符串Hello不属于异步操作（判断方法是它不是具有then方法的对象），返回Promise实例的状态从一生成就是Resolved，所以回调函数会立即执行。

### Promise.reject()方法

Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。Promise.reject方法的参数reason，会被传递给实例的回调函数。

```javascript
    var p = Promise.reject('出错了');
     
    p.then(null, function (s){
      document.write(s)
    });
    // 出错了
```

上面代码生成一个Promise对象的实例p，状态为rejected，回调函数会立即执行。

### Generator函数与Promise的结合

使用Generator函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

```javascript 
    function getFoo () {
      return new Promise(function (resolve, reject){
        resolve('foo');
      });
    }
     
    var g = function* () {
      try {
        var foo = yield getFoo();
        document.write(foo);
      } catch (e) {
        document.write(e);
      }
    };
     
    function run (generator) {
      var it = generator();
     
      function go(result) {
        if (result.done) return result.value;
     
        return result.value.then(function (value) {
          return go(it.next(value));
        }, function (error) {
          return go(it.throw(error));
        });
      }
     
      go(it.next());
    }
     
    run(g);
```

上面代码的Generator函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。

### async函数

async函数与Promise、Generator函数一样，是用来取代回调函数、解决异步操作的一种方法。

async函数，就是下面这样。

```javascript
    var asyncReadFile = async function (){
      var f1 = await readFile('/etc/fstab');
      var f2 = await readFile('/etc/shells');
      document.write(f1.toString());
      document.write(f2.toString());
    };
```

async函数对Generator函数的改进，体现在以下三点。

+ 内置执行器。Generator函数的执行必须靠执行器，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。

```javascript
    var result = asyncReadFile();
```

+ 更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
+ 更广的适用性。co函数库约定，yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以跟Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。