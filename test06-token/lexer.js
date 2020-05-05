

const html =`<el-button size="mini"  type="primary" class="m-l-dialog" @click="test1">
测试
</el-button>` 

const { HtmlLexerParser  } = require('./lexer.test'); 

class TokenOutPut {
    receiverInput(token) {
        if (typeof token === 'string') {
            // console.log(`String(${token})`);
            console.log(`String(${ token.replace(/\n/, '\\n').replace(/ /, '<whitespace>')})`);

        } else {
            console.log(token);
        }
    }
}

const Output = new TokenOutPut();
const lexer = new HtmlLexerParser(Output);

for (let c of html) {
    lexer.receiverInput(c);
}