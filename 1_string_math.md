## ECMAscript6 学习1

1. let,const  
    都没有变量提升，都有块级作用域，都不能重复声明

2. 是否包含字符串三中新方法  
    `includes()`：返回布尔值，表示是否找到了参数字符串。  
    `startsWith()`：返回布尔值，表示参数字符串是否在源字符串的头部。  
    `endsWith()`：返回布尔值，表示参数字符串是否在源字符串的尾部。  
    都有第二个参数，表示开始搜索的位置  
    使用第二个参数n时，endsWith 的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

3. repeat() 原字符串重复  
    参数是数字，表重复次数

4. 模板字符串  
    ```
    let first = 'hello';
    let last = 'world';
    document.write(`${first} ${last}!`);
    // hello world!
    let strTpl = `
        多行模板
        两行
        三行
    `
    ```

5. 标签模板  
    ```
    var a = 5;
    var b = 10;
    function tag(s, v1, v2) {
        document.write(s[0]);
        document.write(s[1]);
        document.write(v1);
        document.write(v2);
        return "OK";
    }
    tag`Hello ${ a + b } world ${ a * b}`;
    ```  
    模板字符串前面有一个标识名tag，它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串后的返回值。

    `String.raw();`  
    使用String.raw 作为模板字符串的前缀，则模板字符串可以是原始(raw)的。反斜线也不再是特殊字符，\n 也不会被解释成换行符：

6. Number.isFinite()、Number.isNaN()、Number.isInteger()  
    ES6在Number对象上，新提供了Number.isFinite()->(是否有穷)和Number.isNaN()两个方法，用来检查Infinite和NaN这两个特殊值。
    Number.isInteger()，判断整数，但是3和3.0被视为一样

7. Math对象新增的方法  
    Math.trunc()：去除一个数的小数部分，返回整数部分。  
    Math.sign()：判断一个数到底是正数、负数、还是零。  
    + 返回五种值：参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN。

    Math.cbrt：计算一个数的立方根。  
    Math.hypot：返回所有参数的平方和的平方根。  
    ```
        Math.hypot(3, 4); // 5
        Math.hypot(3, 4, 'foo'); // NaN
        Math.hypot(3, '4');   // 5
    ```

8. Math对数方法  
    Math.expm1(x)：返回e^x - 1。  
    Math.log1p(x)：返回1 + x的自然对数。如果x小于-1，返回NaN。  
    Math.log10(x)：返回以10为底的x的对数。如果x小于0，则返回NaN。  
    Math.log2(x)：返回以2为底的x的对数。如果x小于0，则返回NaN。  
    Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）  
    Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）  
    Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）  
    Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）  
    Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）  
    Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）  