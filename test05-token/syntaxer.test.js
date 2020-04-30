const {
    StartTagToken,
    EndTagToken
} = require('./lexer.test');


/**  一个dom应该有的 是html文档， 加上Node  element  text  */ 


class HTMLDocument {
    constructor() {
        this.isDocument = true;
        this.childNodes = [];
    }
}

class Node {}


/** 元素 */ 
class Element extends Node {
    constructor(token) {
            super(token);
            for (const key in token) {
                this[key] = token[key];
            }
            this.childNodes = [];
        }
        [Symbol.toStringTag]() {
            return `Element<${this.name}>`;
        }
}

/** 文本 */
class Text extends Node {
    constructor(value) {
        super(value);
        this.value = value || '';
    }
}



/**  */ 
function getTop(stack) {
    return stack[stack.length - 1];  
}

// 
/**  整个过程实际上是由词法解析的过程中，由状态机形成对应的 标签加属性的 也就是Node节点element，
 * 之后在由syntaxer 合成对应的dom树。 这个合并的过程是外层的根目录Node element节点放入 stack中，同时把这个element也顺势推入栈中，
 * 然后依次取最后的一个element节点，形成递归。  其实这个也符合了 dom进入的顺序是 先入后出的 dom树的递归情况。    --- 真正由栈来形成 递归 先入后出。
 * 
 *  
 *  
 * */ 

class HtmlSyntaxerParser {

    constructor() {
        this.stack = [new HTMLDocument];  // 里面的文档对象包含当前的文档对象及childNodes
    }
    /** 接收上一步词法分析的输出 */ 
    receiveInput(token) {
        if (typeof token === 'string') {
            if (getTop(this.stack) instanceof Text) {
                getTop(this.stack).value += token;
            } else {
                // getTop取栈里面最后的dom节点
                let t = new Text(token);
                getTop(this.stack).childNodes.push(t);

            }
        } else if (getTop(this.stack) instanceof Text) {
            this.stack.pop();
        }

        if (token instanceof StartTagToken) {
            let element = new Element(token);  // 通过 element 这个元素对象一直保持对子元素的链接，同时间接的形成递归。 -- 通过递归形成dom树。

            let obj = getTop(this.stack)            
            obj.childNodes.push(element);  // stack栈里第一个对象。            

            return this.stack.push(element);   // 重要一步的操作。        
        }
        
        if (token instanceof EndTagToken) {
            return this.stack.pop();  // 删除最后一个元素。
        }
    }

    // 把所有的接受到了之后一性输出。
    getOutPut() {
        return this.stack[0];
    }
}


module.exports = {
    HtmlSyntaxerParser,
}