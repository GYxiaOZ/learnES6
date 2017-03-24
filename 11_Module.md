## ES6 Module

### export命令

模块功能主要由两个命令构成：export和import。

export命令用于用户自定义模块，规定对外接口；
import命令用于输入其他模块提供的功能，同时创造命名空间（namespace），防止函数名冲突。
ES6允许将独立的JS文件作为模块，允许一个JavaScript脚本文件调用另一个脚本文件。

现有profile.js文件，保存了用户信息。ES6将其视为一个模块，里面用export命令对外部输出了三个变量。
```javascript
    // profile.js
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
     
    export {firstName, lastName, year};
```

### import命令

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
```javascript
    // main.js
    import {firstName, lastName, year} from './profile';
     
    function sfirsetHeader(element) {
      element.textContent = firstName + ' ' + lastName;
    }
```
上面代码属于另一个文件main.js，import命令就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import语句中要使用as关键字，将输入的变量重命名。
```javascript
    import { lastName as surname } from './profile';
```
ES6支持多重加载，即所加载的模块中又加载其他模块。

### 模块的整体输入

export命令除了输出变量，还可以输出方法或类（class）。下面是一个circle.js文件，它输出两个方法area和circumference。
```javascript
    // circle.js
    export function area(radius) {
      return Math.PI * radius * radius;
    }
    export function circumference(radius) {
      return 2 * Math.PI * radius;
    }
```
然后，main.js输入circlek.js模块。
```javascript
    // main.js
    import { area, circumference } from 'circle';
    document.write("圆面积：" + area(4));
    document.write("圆周长：" + circumference(14));
```
上面写法是逐一指定要输入的方法。另一种写法是整体输入。
```javascript
    import * as circle from 'circle';
    document.write("圆面积：" + circle.area(4));
    document.write("圆周长：" + circle.circumference(14));
```

### module命令

module命令可以取代import语句，达到整体输入模块的作用。
```javascript
    // main.js
    module circle from 'circle';
     
    document.write("圆面积：" + circle.area(4));
    document.write("圆周长：" + circle.circumference(14));
```
module命令后面跟一个变量，表示输入的模块定义在该变量上。

### export default命令

为加载模块指定默认输出，使用export default命令。
```javascript
    // export-default.js
    export default function () {
      document.write('foo');
    }
```
上面代码是一个模块文件export-default.js，它的默认输出是一个函数。

其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
```javascript
    // import-default.js
    import customName from './export-default';
    customName(); // 'foo'
```
上面代码的import命令，可以用任意名称指向export-default.js输出的方法。需要注意的是，这时import命令后面，不使用大括号。

### 模块的继承

模块之间也可以继承。

假设有一个circleplus模块，继承了circle模块。
```javascript
    // circleplus.js
    export * from 'circle';
    export var e = 2.71828182846;
    export default function(x) {
        return Math.exp(x);
    }
```
上面代码中的“export *”，表示输出circle模块的所有属性和方法，export default命令定义模块的默认方法。

这时，也可以将circle的属性或方法，改名后再输出。
```javascript
    // circleplus.js
    export { area as circleArea } from 'circle';
```
上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。

加载上面模块的写法如下。
```javascript
    // main.js
    module math from "circleplus";
    import exp from "circleplus";
    document.write(exp(math.pi));
```