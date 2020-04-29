
const { StartTagToken, EndTagToken } = require("./lexer2");

class HTMLDocument {
    constructor() {
        this.isDocument = true;
        this.childNodes = [];
    }
}

class Node {};

class Element extends Node {
    constructor(token) {
        super(token);
        for (const key in token) {
            this[key] = token[key];            
        }
        this.childNodes = [];
    }
    [Symbol.toStringTag] () {
        return `Element<${this.name}>`;
    }
}

class Text extends Node {
    constructor(value) {
        super(value);
        this.value = value || "";
    }
}

class HtmlSyntaticalParser {
    constructor() {
        this.stack = [new HTMLDocument];  // 
    }
    // 始终在里面都有形成一个词法
    receiveInput(token) {
        if (typeof token === "string") {
            if (getTop(this.stack) instanceof Text) {
                getTop(this.stack).value += token;
            } else {
                // getTop取栈里面最后的一dom节点。
                let t = new Text(token);
                getTop(this.stack).childNodes.push(t);
                this.stack.push(t);
            }
        } else if (getTop(this.stack) instanceof Text) {
            this.stack.pop();
        }

        if (token instanceof StartTagToken) {
            let e = new Element(token);   // 新产生的节点标签。
            getTop(this.stack).childNodes.push(e);  // 把节点标签推入到子栈中去 
            return this.stack.push(e);
        }

        if (token instanceof EndTagToken) {
            return this.stack.pop();
        }        
    }

    getOutput() {
        return this.stack[0];
    }
}


function getTop(stack) {
    return stack[stack.length - 1];
}







module.exports = {
    HtmlSyntaticalParser
};