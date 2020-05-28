// 各种类型的错误。


// 1. Error() 抛出错误
// let E1 = new Error('出现一个错误');   // new 与使用 Error函数调用时产生的对象表现一致
// console.log(E1);  抛出错误


// 2. ReferenceError: 引用错误.
// function f1(a, b) {
//     console.log(a, b, c);   // ReferenceError: c is not defined
// }
// f1(1, 2, 3);


// 3. TypeError: 类型错误.
// let a = {};
// console.log(a());  是对象,却当成函数来使用.

// 4. SyntaxError: 语法错误.
// let test == 'asdf'
// console.log(test);


