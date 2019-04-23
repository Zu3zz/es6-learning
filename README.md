# ES6 Learning

1. let const var

* var是全局作用域 一旦申明在全局都只有一个变量

  ```javascript
  var name = '3zz';
  name = '2xx'; //name此时被修改为2xx
  ```

* 而let和const则是块级作用域 只在最近的一对花括号里存在{}
而通过let申明的变量可以多次被改变 而const申明的变量在同一个块级作用域里一旦被申明则无法改变

2. 箭头函数

* 使用箭头函数的时候，函数内部的this指向不用再通过如下语句直接修改this的指向
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

  ```javascript
  const { father: f, mother: m, brother: b, sister: 'have no sister' } = zz.family
  ```

* 对象值交换可以直接使用数组解构
`[a, b] = [b, a]b`

4. 模板字符串

* 用法如下

  ```javascript
  `${var}string1`// 相当于普通js中 var + 'string1'
  ```
  
* 也可以在最前面加一个function
  这样就可以在字符串输出之前先执行这个函数 用法如下

  ```javascript
  function1`${123}abc`
  function function1 () {
    // 123
  }
  ```

   **重要应用场景**
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

6. ES6for循环改进

* 直接在数组中进行forEach循环 但是这样循环中无法break也无法continue
`Array.forEach(va => {console.log(val)})`

* for in 类型的循环 正常循环，但是如果给array上挂载新的属性或者是原型链上加载新的方法，那么for in 类型的循环也会同样被循环展示出来
* for of 类型的循环 不会发生在 for in 类型循环和forEach中出现的问题

  ```javascript
  for(let val of array){
    if(val === '123'){
      break;
    } // array = ['1','12','123']
    console.log(val);
  } // 打印结果为1，12
  ```

* js数组中有原型方法iterator迭代器 在Array.intries()中 如果使用for of 就是自动在调用这个iterator迭代器 使用这个方法可以用解构的方法得到数组的index和value

  ```javascript
  const fruits = ['Apple','Banana','Orange','Mango'];

  for (let [index, fruit] of fruits.entries()){
    console.log(`${fruit} ranks ${index + 1} in my favourite fruit list`)
  } // 输出Apple rank 1 in my favourite fruits...
  ```

  **for of 不支持对象！！！**
  for of 循环还可以用于字符串 以及遍历函数中的arguments对象

7. ES6数组新加方法

* .from()方法
  使用该方法需要通过如下方法调用 因为.from()方法不在数组的原型链上

  ```javascript
  const nums = [1,2,3]
  Array.from(nums)
  ```

  **主要场景**
  将类数组或者可迭代对象转化为真正的数组

  ```javascript
  <ul>
    <li>Go to store</li>
    <li>Watch TV</li>
    <li>Go shopping</li>
  </ul>
  // 对上面这段html代码 要想获取所有li中的文本内容
  const todos = document.querySelectorALL('li');
  // 直接使用todos.map(todo => todo.textConent)会报错
  // 因为todos是一个nodelist类数组 并不是真正的数组
  // 它的原型链上并没有挂载上map方法 这个时候就需要.from()方法吧他转化为数组
  const todosArr = Array.from(todos);
  const names = todosArr.map(todo => todo.textContent);// 这样就能正确获取到names了
  // 或者可以简化为
  cost names = Array.from(todos, todo => todo.textContent);
  ```

  也可以将函数中的arguments转换为数组
* .of()方法
主要弥补了Array中构造方法中的不足
如果使用`new Array(1)`会生成一个长度为1，内容为undefined的数组 ['undefined']
但是使用`new Array（1,2,3)`则会生成一个内容为[1,2,3]的数组
为了保证一致性 需要使用`new Array.of(1)` 这样就会生成一个为[1]的数组

8. 数组方法

* vector.find()方法
* vector.findIndex()方法
返回的是index值

* .some()方法
有一个满足测试函数就返回true
也即第一个满足就返回
* .every()方法
所有都满足才返回true
有一个false就立即返回

9. 扩展运算符

* 用法
* [...'3zz'] = ['3','z','z']

  ```javascript
  const a = ['1','2','3']
  const b = ['4','5','6']
  let c = [...a,'z',...b] // c = ['1','2','3','z','4','5','6']
  ```

* 使用扩展运算符相当于深拷贝

  ```javascript
  const a = [...b]
  // 此时修改a中元素并不会影响b中的元素
  ```

* 可以与array.from()起到相同的作用，即将类数组对象转化为数组

* 可以直接添加对象中的数组属性[...obj.array]

10. 字面量拓展

* name: name等同于直接简写为name

11. Promise

* axios.get('url')直接返回promise对象
* 使用.then() 相当于监听事件 promise对象事件成功的话就执行
* 使用.catch()监听错误信息

  ```javascript
  const p = new Promise((resolve, reject) => {
    resolve('3zz is good');
  })// 成功返回resolve 失败返回reject
  p.then(data => { console.log(data) });
  ```

* 使用.all()方法监听所有promise对象

  ```javascript
  const p1 = new Promise((resolve, reject) => {
    resolve(['1','2','3'])
  })
  const p2 = new Promise((resolve, reject) => {
    resolve({name: '3zz'})
  })
  Promise
    .all(p1,p2)
    .then(responses => {
      const [pp1,pp2] = responses;
      console.log(pp1);// ['1','2','3']
      console.log(pp2);// {name: '3zz'}
    })
  ```

  只要有一个reject 那么.all()方法就不会执行

* .race()方法 返回结果由第一个Promise对象决定
   resolve就then
   reject就catch
   和.all()方法不同

12. Symbol

* symbol标识符是js里第七种数据类型 具有唯一性
* 为了避免冲突
* 无法被遍历获取属性名
* 使用Object.getOwnPropertySymbols('3zz')获取

13. ES6 Module

* 可以按照以下方式导出
  ```javascript
  export const apikey = '123'
  export function greet(name) {
    console.log(`hello ${name}`)
  }
  export { apikey as key, greet }// import {key as apikey} from xxx.js
  ```

* 对于export default形式导出的 使用import xxx from './xxx.js'
* 对于export const / function 形式导出的 使用import { xxx, yyy } from './xxx.js'

14. ES6的类 Class

* 作为函数 可以变量提升，但是类不可以 直接在类的定义之前调用会报错

  ```javascript
  class User {
    // constructor 是构造函数
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
    info() {
      console.log(`i'm info`)
    }
    static description() {
      console.log(`i'm description`)
    } 
  }
  ```

* class中定义的static静态方法无法在类生成的实例中调用，但是可以直接在User中调用
* 使用set get 来对属性进行定义和获取
* ES6中类的继承

  ```javascript
  class myArray extends Array{
    super();
  }
  ```

15. Generator

* 可以开始暂停 并且传入另外的参数
* 如何定义一个generator

  ```javascript
  function* listColors() {
    yield 'red';
    yield 'green';
    yield 'bule';
  }
  const colors = listColors();
  ```

* 返回的是一个迭代器 需要调用.next()方法
* 可以配合axios Promise的.then()方法实现异步

16. Proxy

* 可以重新定义对象默认的方法
* 代码如下

  ```javascript
  const person = { name: '3zz', age: 23 };
  const personProxy = new Proxy(person, {
    get (target, key) {
      return target[key].toUpperCase();
    }
    set(target, key, value){
      if (typeof value === 'string'){
        target[key] = value.trim()
      }
    }
    // personProxy.love = 'i love hit     '
    // log: 'i love hit      '
    // persionProxy.love
    // log: 'I LOVE HIT'
  })
  ```

17. Set和WeakSet

* WeakSet只能含有对象 不能含有字符串和数字
* WeakSet不能通过for of来循环 没有iterator迭代器
* WeakSet没有clear方法 但是有自动清理机制

  ```javascript
  let mary = { name: '12', age: 21 }
  let tom = { name: '21', age: 23 }
  const weakPeople = new WeakSet([mary, tom])
  mary = null
  console.log(weakPeople) // mary属性过一点时间会被自动删除 但是使用正常数组就会发生内存泄漏
  ```