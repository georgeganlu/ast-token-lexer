
const testHTML = `<html maaa=a ><head><title>cool</title></head><body><img src="a" /></body></html>`;

const { HTMLWordParser } = require("./lexer2");

function SyntaxerOutput(token) {
    if (typeof token === "string") {        
        console.log(`String(${token.replace(/\n/, '\\n').replace(/ /, "<whitespace>")})`);
    } else {
        console.log(token);
    }
}

let lexer = new HTMLWordParser(SyntaxerOutput);

for (let c  of testHTML) {
    lexer.receiveInput(c);
}