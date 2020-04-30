
// 解析的过程，先词法的解析，之后才是语法的解析。

const  { HTMLlexicalParser } = require('./lexer.test'); 
const { HtmlSyntaxerParser } = require('./syntaxer.test');
const html = `<el-button size="mini"  type="primary" class="m-l-dialog" @click="remind"><span><span class="el-icon-setting"></span><span>弹窗提醒设置</span></span></el-button>`
// const html =`<el-button size="mini"  type="primary" class="m-l-dialog" @click="test1">
// 测试
// </el-button>` 



let syntaxer = new HtmlSyntaxerParser();
let lexer = new HTMLlexicalParser(syntaxer);

// 还有一部分是node结构点的输出。
for (let c of html) {
    lexer.receiveInput(c);
}

console.log(`${JSON.stringify(syntaxer.getOutPut(), null, 2)}`);