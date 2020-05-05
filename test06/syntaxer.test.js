


const { StartTagName, EndTagOpen } = require('./lexer.test');

// 对于节点来说总共是三种的节点  HTML  element  text;
class Html {
    constructor() {
        this.isDoc = true;
        this.childNodes = [];
    }
}


class Node {};

class Element extends Node {
    // element的作用是形成对象。
    constructor(token) {
        super();
        for(let k in token) {
            this[k] = token[k];
        }
        this.childNodes = [];
    }    
}

class Text extends Node {

}


class Syntaxer {
    constructor() {
        this.stack = [new Html()];
    }
    // 接收的是token的输入
    receiverInput(token) {
        // 如果接收的是token的话整个的过程也是按照先入后出的原则的。
        // 整个形成递归的形式。
        if (typeof token == 'string') {
            getLastOne(this.stack).childNodes.push(token);
            return token;
        }
        if (token instanceof StartTagName) {
            let el = new Element(token);
            getLastOne(this.stack).childNodes.push(el);
            this.stack.push(el);
            return token;
        }
        if (token instanceof EndTagOpen) {
            this.stack.pop();   // 每碰到结束标签的时候就删除最后一个元素。
        }
    }

    getOutPut() {
        return this.stack[0];
    }
}

function getLastOne(list) {
    return list[list.length - 1];
}

module.exports = {
    Syntaxer,
}