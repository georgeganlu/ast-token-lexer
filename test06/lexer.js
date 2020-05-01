

const html =`<el-button size="mini"  type="primary" class="m-l-dialog" @click="test1">
测试
</el-button>` 

const { HtmlLexerParser  } = require('./lexer.test'); 

class TokenOutPut {
    receiverInput(token) {

    }
}


const lexer = new HtmlLexerParser();
for (let c of html) {
    lexer.receiverInput(c);
}