// 对于js引擎来说，是一直常住内存中间的，等待着宿主来传递js代码给到引擎来执行，当js本身的标准引入异步之后。
// js引擎本身来能发起执行任务了，通常按标准中的来说由宿主发起的就是宏任务，由js引擎发起的就是微任务。

// 这里都是执行算法的过程。


// promise和settimeout微任务和宏任务的。

// let r = new Promise((succ, fail) => {
//     console.log('a');
//     succ();   // 这个succ的执行函数就是then里面注册的函数。
// });

// setTimeout(() => {
//     console.log('d');
// }, 0);

// r.then(() => {     // 在promise源码中 then是提前注册完成的。是绑定在一个对象上的。
//     console.log('c');
// })
// console.log('b');



// 对于一个执行栈来说，是一个宏任务，但在这个执行栈中新产生了一个宏任务和一个微任务，so 微任务是跟在当前宏任务中的尾部完成执行的。 就是先于另一个新产生的宏任务。





setTimeout(()=>console.log("d"), 0)
var r = new Promise(function(resolve, reject){
    console.log('1')
    resolve()
});
r.then(() => { 
    var begin = Date.now();
    // while(Date.now() - begin < 1000);
    console.log("c1") 
    new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve()            
        }, 1000);        
    }).then(() => console.log("c2"))
});

// 很好的体现了一个执行栈里面 有多个微任务的情况下，依旧会先把微任务全部完成后，在执行下一个宏任务。




// 确定一个执行栈中各种宏任务和微任务执行顺序的问题。
// 通常把宿主发起的任务叫做宏任务，把js引擎发起的任务叫做微任务。 但这里明显有一个问题点是，怎么样判断是宿主发起的还是js引擎发起的。
// 对promise源码的解读可以知道，所谓的微任务，只不过是在 在宏任务的执行栈中，有新生成一个promise的对象，在向下执行的过程中，可以给这个对象传入要执行的函数。也就是通过执行
// then((res) => {}, (err) => {}) 分别传入这两个函数，也是利用了高阶函数，函数可以被当成参数传入和返回的特性中
