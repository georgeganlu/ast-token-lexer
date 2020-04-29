{/* <html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html> */}

// 词法的解析过程。 --- 直到形成ast语法树的过程。
let str = `<html maaa=a><head><title>cool</title></head><body><img src="a" /></body></html>`;

let tokens = str.split("");

console.log(tokens);