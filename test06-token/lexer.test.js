

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
        this.emitToken(c);
        return this.data;
    }

    tagOpen(c) {
        if (/[a-zA-Z-]/.test(c)) {
            this.token = new StartTagName();
            this.token.name = c.toLowerCase();
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
            return  this.beforeAttributeName;
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

    beforeAttributeName(c) {
        // 属性开始
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        } 
        if (c == '/') {
            return this.selfTagClosing;
        }
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
       
        this.attribute = new Attribute();
        this.attribute.name = c.toLowerCase();
        this.attribute.value = '';
        return this.attributeName;
        
    }

    attributeName(c) {
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        } 
        if (c == '=') {
            return this.beforeAttributeValue;
        }
        if (c == "/") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.selfTagClosing;
        }
        if (c == '>') {
            this.token[this.attribute.name] = this.attribute.value;
            this.emitToken(this.token);
            return this.data;
        }
        this.attribute.name += c;
        return this.attributeName
    }

    beforeAttributeValue(c) {
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeValue;
        }
        if (c == '"') {
            return this.attributeDoubleQuoted;
        }
        if (c == "'") {
            return this.attributeSingleQuoted
        }
        this.attribute.value += c.toLowerCase();

        // 属性值的两种情况 单引号和双引号都考虑之后，还有一种属性值不带引号的。
        return this.attributeUnquoted();
    }

    attributeUnquoted(c) {
        if (/[\t \f\n]/.test(c)) {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c.toLowerCase();
        return this.attributeUnquoted;
    }

    attributeSingleQuoted(c) {
        if (c == "'") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c.toLowerCase();
        return this.attributeSingleQuoted;
    }

    attributeDoubleQuoted(c) {
        if (c == '"') {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c.toLowerCase();
        return this.attributeDoubleQuoted;
    }

    selfTagClosing(c) {
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
    }
    /** 正常的结尾的标签 */ 
    endTagOpen(c) {
        if (/[a-zA-Z-]/.test(c)) {
            this.token.name = c;
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
        this.handle.receiverInput(token);
    }

}



module.exports = {
    HtmlLexerParser,
    StartTagName,
    EndTagOpen
}