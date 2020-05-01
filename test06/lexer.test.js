

// token过程。

class StartTagName{}
class Attribute{}
class EndTagOpen{};



class HtmlLexerParser {
    constructor(handle) {
        this.token = null;
        this.attribute = null;
        this.state = this.data;   // 函数的状态变化  -- 接收到每一个状态机的函数
        this.charsetReferData = '';
        this.handle = handle;
    }

    /** token的接收点 */ 
    receiverInput(c) {
        if (!this.state) {
            this.error(c);
        } else {
            this.state = this.state(c);    // 函数状态的变化。
        }
    }

    /** 初始函数 */ 
    data(c) {
        if (c === '&') {
            return this.charsetReferFun;
        }
        if (c == '<') {
            return this.tagOpen;
        }
        this.error(c);
        return this.data;
    }

    tagOpen(c) {
        if (/[a-zA-Z-]/.test(c)) {
            this.token = new StartTagName();
            this.token.name = c;
            return this.tagName;
        } 
        if (c == '/') {
            this.token = new EndTagOpen();
            return this.endTagOpen;
        }
        this.error(c);
    }
     
    tagName(c) {
        if (/[\t \f\n]/.test(c)) {
            return  this.beforeAttribute;
        }
        if (c == "/") {
            return this.selfTagClosing;
        } 
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
        if (/[a-z-A-Z]/.test(c)) {
            this.token.name += c;
            return this.tagName;
        }
        this.error(c);
    }

    selfTagClosing(c) {
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
    }

    endTagOpen(c) {
        if (/[a-zA-Z-]/.test(c)) {
            this.token.name += c;
            return this.tagName;
        } 
        if (c == '>') {
            this.error(c);
        }
    }




    error(c) {
        console.error(`解析出错${c}`);
    }

    charsetReferFun(c) {
        if (c === ';') {            
            this.emitToken(this.charsetReferData);
            this.charsetReferData = '';
            return this.data;           
        }
        this.charsetReferData += c;
        return charsetReferFun;
    }

    // 输出。
    emitToken(token) {
        this.handle.getOutPut(token);
    }

}



module.exports = {
    HtmlLexerParser
}