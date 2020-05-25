// 基于类和基于原型的 面向对象  两者在实例的使用上都能实现 对象的抽象和复用。 并没有好坏的区分。
// 在es6 的时候，js提供了一系统的内置函数。以便更直接的访问和操作原型系统。

// Object.create  根据指定的对象创建新对象， 新对象的原型指向原对象。传入的原型可以是null;
// Object.getPrototypeOf() 获得一个对象的原型
// Object.setPrototypeOf() 设置一个对象的原型。


// class.

class Person {
    constructor() {}
    say() {
        console.log("class say")
    }
    run() {
        console.log("class run")
    }
}

class P extends Person {}

const P1 = new P();

console.log(P1.say());



const Dog = {
    say() {
        console.log('dog say');
    },
    run() {
        console.log('dog run');
    }
}


const D1 = Object.create(Dog, {
    say: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function(){
            console.log('roar!');
        }
    }
});




