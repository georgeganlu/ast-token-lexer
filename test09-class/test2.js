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

// 5. URIError
// console.log(decodeURIComponent('%'))


//  6. RangeError.
// 超出范围大小的错误。

// function fun


// const url = `htt://192.168.1.12:8000?${ encodeURI('name') }=${ encodeURI('陈') }`;
// console.log(url);  // encodeURI 是js标准本身提供的对象。




// console.log(new Date); // 1
// console.log(Date())


// 几种错误的类型。
// let err1 = new Error('asdfasdf');   // 可以结合throw-error的方法来使用。
// let err2 = Error('zxcvzcvz');
// console.log(err1);   // error对象通过函数对象创建和构造器对象创建表现一致。
// console.log(err2);


// 2. Reference
// console.log(a);


// 3. TypeError
// let a = 'asdf'
// console.log(a.test());


// 4. SyntaxError;
function a = 'test';
console.log(a);

