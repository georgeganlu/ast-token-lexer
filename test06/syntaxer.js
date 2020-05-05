

const html =`<el-button size="mini"  type="primary" class="m-l-dialog" @click="test1">
测试
</el-button>` 

const { HtmlLexerParser  } = require('./lexer.test'); 

const { Syntaxer  } = require('./syntaxer.test');

const Output = new Syntaxer();
const lexer = new HtmlLexerParser(Output);

for (let c of html) {
    lexer.receiverInput(c);
}

console.log(`${JSON.stringify(Output.getOutPut(), null, 2)}`);