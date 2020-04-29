
const HTMLlexicalParser = require('./lexer.test');

// const html = `<div class="inline pointer scroll-top" @click="top">置顶测试</div>`;

const html = `<el-button size="mini"  type="primary" class="m-l-dialog" @click="remind"><span><span class="el-icon-setting"></span><span>弹窗提醒设置</span></span></el-button>`

let lexer = new HTMLlexicalParser();

for(let c of html) {
    lexer.receiveInput(c);
}