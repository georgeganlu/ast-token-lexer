const {HTMLlexicalParser} = require('./lexer.test');

// const html = `<div class="inline pointer scroll-top" @click="top">置顶测试</div>`;

// const html = `<el-button size="mini"  type="primary" class="m-l-dialog" @click="remind"><span><span class="el-icon-setting"></span><span>弹窗提醒设置</span></span></el-button>`

const html =`<el-button size="mini"  type="primary" class="m-l-dialog" @click="test1">
测试
</el-button>` 

class TokenOutPut {
    receiveInput(token) {
        if (typeof token === 'string') {
            console.log(`String(${token.replace(/\n/, /\\n/).replace(/ /, '<whitespace>')})`);
        } else {
            console.log(token);
        }
    }
}

let syntaxer = new TokenOutPut();

let lexer = new HTMLlexicalParser(syntaxer);


// 还有一部分是node结构点的输出。
for (let c of html) {
    lexer.receiveInput(c);
}