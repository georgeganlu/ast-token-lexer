const babelParser = require("@babel/parser");
const fs = require('fs');
const path = require("path");
require("core-js/features/array/flat");

fs.readFile(path.join(__dirname, './test02.js'), 'utf-8', (err, data) => {
    // 先把读取的内容解析成语法树 -- 在解析的过程中以 moudle的形式去解析，通过babel的编译。
    const ast = babelParser.parse(data, {
        sourceType: 'module'
    });
    // 通过babel的词法解析  -- 语法树。
    console.log(ast.program.body, "---------------------");
    const exportNameDeclarations = ast.program.body.filter(node => node.type === "ExportNamedDeclaration")
      .map(node => {
          if (node.declaration === null && node.specifiers.length) {
              return node.specifiers.map(sub => {
                  return sub.exported.name;
              });
          } else if (node.declaration.type === "VariableDeclaration") {
            //   console.log(node.declaration.declarations[0]);
              return node.declaration.declarations[0].id.name
          } else if (node.declaration.type === "FunctionDeclaration") {
              return node.declaration.id.name;
          } else if (node.declaration.type === "ClassDeclaration") {
              return node.declaration.id.name;
          } else {
              console.log(node);
              throw new Error("Unknow Decalration type");   // 抛出错误不知道声明的类型。
          }
      })
      console.log(exportNameDeclarations);
      console.log(`Export names: ${exportNameDeclarations.flat(1).join(",")}`)
});


