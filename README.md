# ES6 Learning

1. let const var

* var是全局作用域 一旦申明在全局都只有一个变量

  ```javascript
  var name = '3zz';
  name = '2xx'; //name此时被修改为2xx
  ```

* 而let和const则是块级作用域 只在最近的一对花括号里存在{}
而通过let申明的变量可以多次被改变 而const申明的变量在同一个块级作用域里一旦被申明则无法改变

2. 箭头函数

* 使用箭头函数的时候，函数内部的this指向不用再通过如下语句直接修改this的指向
`let self = this;` 然后在函数体中使用self.attr
直接用箭头函数的函数体中使用this.attr即可
* 函数参数默认值 直接在括号之后(a=1, b= 2)即可 要想在调用函数的使用默认值 直接 `function(undefined,2)`

**何种情况下最好不要使用箭头函数**

* 构造函数不适合使用箭头函数 内部this无法绑定属性，因为this会被自动指向外部变量

  ```javascript
  const Person = (name, points) => {
    this.name = name;
    this.points = points;
  }
  const 3zz = new Person('3zz', 24);
  ```

* 定义一个对象的方法的时候也不能使用箭头函数，因为箭头函数的this在没有参数的情况下会直接绑定到window上
**箭头函数的this会绑定到外层的对象上 重要！！！！！！！**
* 使用arguments对象也不能使用箭头函数

3. 解构赋值

* 结构赋值： 数组 对象
[a,b…test]
赋值给test一个数组 [a,,,b]隔开赋值
* 解构赋值可以重命名 并且赋予默认值

```javasciprt
const { father: f, mother: m, brother: b, sister: 'have no sister' } = zz.family
```

* 对象值交换可以直接使用数组解构
`[a, b] = [b, a]b`

4. 模板字符串

* 用法``${abc}def``abc是变量名称
* 可以在最前面加一个function

```javascript
function1`${123}abc`
function function1 () {
  // 123
}
```

* **重要应用场景**
可以使用DOMPurify进行xss攻击预防 在``前面加入sanitize函数，定义sanitize函数

```javascript
function sanitize(strings, ...values) {
  const dirty = strings.reduce((prev,curr,i) => `${prev}${curr}${values[i] || ''}`, '');
}
```

5. string 类提供的四种新方法

* .startsWith()
大小写敏感 可以直接使用
`str1.startsWith('a')`
或者指定位数
`str1.startsWith('b', 6)`
* .endsWith()
使用方法与startsWith大体相同
* .includes() 查看是否包含子串
* .repeat() 查看字符串重复