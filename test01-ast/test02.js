export function fun1 () {
    console.log(1);
}

export var aa = 10;

export let bb = 20;

export class C{
    constructor(id) {
        this.id = id;
    }
}

export default function func2 () {
    console.log("default的值是什么");
}


// // comment

// if (true) {
//     let foo = 123
//     console.log(foo)
//   }
  
//   const student = 'Bob'
//   const teacher = 'Winter'
//   function say () {
//     console.log('winter is coming')
//   }
  
//   export var a = 1
//   export const b = 9
//   export let c = 100
//   export function hello () {
//     console.log('hello world')
//   }
//   export default a + b + c
//   export {student as anotherStudent, teacher, say}