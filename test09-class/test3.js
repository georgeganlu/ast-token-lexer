

function F() {
    return 1;
}

const v = F();
const o = new F();

console.log(v);
console.log(o);
// 对于原生对象来说，可以用new运算来创建新的对象。
// 几乎所有这些构造器的能力都是无法用js代码来实现的，它们也无法用class / extend语法来继承

// const toString = Object.prototype.toString;

// let str = new String('asdf');
// console.log(toString(str));   // 是String的对象
// console.log(str);

// console.log(toString.call(str));  // 鸭子类型。

// console.log(str.valueOf());  // 返回对象的原始值。

// let str1 = "asdfasdf"
// console.log(Object.prototype.toString.call(str1));

// let str2 = String(321);
// console.log(str2);
