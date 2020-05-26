// // 基于类和基于原型的 面向对象  两者在实例的使用上都能实现 对象的抽象和复用。 并没有好坏的区分。
// // 在es6 的时候，js提供了一系统的内置函数。以便更直接的访问和操作原型系统。

// // Object.create  根据指定的对象创建新对象， 新对象的原型指向原对象。传入的原型可以是null;   本质来说还是创建和读写。
// // Object.getPrototypeOf() 获得一个对象的原型
// // Object.setPrototypeOf() 设置一个对象的原型。


// // class.

// class Person {
//     constructor() {}
//     say() {
//         console.log("class say")
//     }
//     run() {
//         console.log("class run")
//     }
// }

// class P extends Person {}

// const P1 = new P();

// P1.say()


// // 不管是基于类还是基于原型，都能实现对象的抽象的调用和复用。  要记住的是oop

// const Dog = {
//     say() {
//         console.log('dog say');
//     },
//     run() {
//         console.log('dog run');
//     }
// }


// const D1 = Object.create(Dog, {
//     say: {
//         writable: true,
//         configurable: true,
//         enumerable: true,
//         value: function(){
//             console.log('roar!');
//         }
//     }
// });

// D1.say()


// 基于类和基于原型的 面向对象  两者在实例的使用上都能实现 对象的抽象和复用。 并没有好坏的区分。
// // 在es6 的时候，js提供了一系统的内置函数。以便更直接的访问和操作原型系统。

// // Object.create  根据指定的对象创建新对象， 新对象的原型指向原对象。传入的原型可以是null;   本质来说还是创建和读写。
// // Object.getPrototypeOf() 获得一个对象的原型
// // Object.setPrototypeOf() 设置一个对象的原型。


// // class.

// class Person {
//     constructor() {}
//     say() {
//         console.log("class say")
//     }
//     run() {
//         console.log("class run")
//     }
// }

// class P extends Person {}

// const P1 = new P();

// P1.say()


// // 不管是基于类还是基于原型，都能实现对象的抽象的调用和复用。  要记住的是oop

// const Dog = {
//     say() {
//         console.log('dog say');
//     },
//     run() {
//         console.log('dog run');
//     }
// }


// const D1 = Object.create(Dog, {
//     say: {
//         writable: true,
//         configurable: true,
//         enumerable: true,
//         value: function(){
//             console.log('roar!');
//         }
//     }
// });

// D1.say()



// var o = { [Symbol.toStringTag]: "MyObject" }
// console.log(o + "");   // 正常是返回Object.prototype.toString()的结果。


// class Animal { 
//     constructor(name) {
//       this.name = name;
//     }
    
//     speak() {
//       console.log(this.name + ' makes a noise.');
//     }
//   }
  
//   class Dog extends Animal {
//     constructor(name) {
//       super(name); // call the super class constructor and pass in the name parameter
//     }
  
//     speak() {
//       console.log(this.name + ' barks.');
//     }
//   }
  
// // 同时也展现了类的封装，继承，多态。

//   let d = new Dog('Mitzie');
//   d.speak(); // Mitzie barks.



class A1 extends Array {}

console.log(A1.isArray([2, 4, 5, 6]));  // 直接让A1继承了很多原生属性，