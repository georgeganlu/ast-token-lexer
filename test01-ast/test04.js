// 只需要三步走 1. 读取文件形成字符流。 2. 使用babel的力量，把字符流词法化。  3. 对ast语法树进行分类判断输出。

const path = require("path");
const fs = require("fs");
const bableParser = require("@babel/parser");
require("core-js/features/array/flat");   // 引入array的flat深入遍历的功能。

fs.readFile(path.join(__dirname, "./test02.js"), "utf-8", (err, data) => {
    const ast = bableParser.parse(data, {   // 词法解析的同时指定文件资源的类型。 sourceType -- module;
        sourceType:"module"
    });
    // console.log(ast.program.body);
    let exportNameDeclaration = ast.program.body.filter(node => node.type === "ExportNamedDeclaration" || node.type === "ExportDefaultDeclaration")
       .map(node => {
        //    console.log(node.declaration === null && node.specifiers.length)
            if (node.declaration === null && node.specifiers.length) {
                return node.specifiers.map(sub => {
                    return sub.exported.name;
                })
            } else if(node.declaration.type === "VariableDeclaration") {
                return node.declaration.declarations[0].id.name;
            } else if(node.declaration.type === "ClassDeclaration") { 
                return node.declaration.id.name;
            } else if (node.declaration.type === "FunctionDeclaration") {
                return node.declaration.id.name;
            } else {
                console.log(node);
                throw new Error("Unknow Declaration Type");
            }
       });
       console.log(`Export name : ${exportNameDeclaration.flat(1).join(",")}`);
});
