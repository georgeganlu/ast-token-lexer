
class StartTagToken {}
class EndTagToken {}
class Attribute {}

class HTMLLexicalParser {
    constructor(handle) {
        this.handle = handle;
        // 初始化数据。
        this.state = this.data.bind(this);   // 
        this.token = null;
        this.attribute = null;
        this.characterReference = "";
    }
    // 按照执行的顺序应该是

    // 首先的逻辑是依次接收字符输入。
    receiveInput(char) {
        if (this.state == null) {
            return new Error("there is an error");
        } else {
            this.state = this.state(char);
        }
    } 
    // 重置函数。
    reset() {
        this.state = this.data;
    }

    // 数据初始输入的状态开始working;
    data(char) {
        switch(char) {
            case "&":
                return this.characterReferenceInData;
            case '<': 
                return this.tagOpen;  // 第一个打开标签的字符。
            default:
                this.emitToken(char);
                return this.data;             
        }
    }
    // 开始标签 <
    tagOpen(c) {
        if (c === "/") {
            return this.endTagOpen;
        }
        if (/[a-zA-Z]/.test(c)) {
            this.token = new StartTagToken();
            this.token.name = c.toLowerCase();
            return this.tagName;
        }
        return this.error(c);
    }

    // 结束标签。  --- 这里是从tagOpen里面过来的数据。
    endTagOpen(c) {
        if (/[a-zA-Z]/.test(c)) {
            this.token = new EndTagToken();
            this.token.name = c.toLowerCase();
            return this.tagName;
        }
        if (c === ">") {
            this.error(c);
        }
    }

    // 形成标签名
    tagName(c) {
        if (c === "/") {
            return this.selfClosingTag;   // 标签名的闭合
        }
        if (/[\t \f\n]/.test(c)) {
            return  this.beforeAttributeName; // 标签名里面属性的函数开始，一个函数也就是一个状态。
        }
        if (c === ">") { // tagName之后的关闭标签。  // 如果碰到 > 闭合标签的话，就直接打印输出。
            this.emitToken(this.token);   
            return this.data;
        }
        if (/[a-zA-Z]/.test(c)) {
            this.token.name += c.toLowerCase();
            return this.tagName;
        }
    }
    // 属性名开始
    beforeAttributeName(c) {
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        }
        if (c === "/") {
            return this.selfClosingTag;
        }
        if (c === ">") {
            this.emitToken(this.token);
            return this.data;
        }
        if (/["'<]/.test(c)) {
            return this.error(c);
        }
        this.attribute = new Attribute();
        this.attribute.name = c.toLowerCase();
        this.attribute.value = "";
        return this.attributeName;   // 属性名。
    }

    // 属性名
    attributeName(c) {
        if (c === "/") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.selfClosingTag;
        }
        if (c === "=") {
            return this.beforeAttributeValue;
        }
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeValue;
        }
        this.attribute.name += c.toLowerCase();
        return this.attributeName;
    }

    // 属性值开始
    beforeAttributeValue(c) {
        if (c === '"') {
            return this.attributeValueDoubleQuoted;
        }
        if (c === "'") {
            return this.attributeValueSingleQuoted;
        } 
        if (/\t \f\n/.test(c)) {
            return this.beforeAttributeValue;
        }
        this.attribute.value += c;
        return this.attributeValueUnquoted;
    }

    // 属性值的双引号。
    attributeValueDoubleQuoted(c) {
        if (c === '"') {  // 如果又碰到双引号的话，就说明value值应该是空的。
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c;   // 碰到双引就一直用双引，碰到单引就一直用单引。
        return this.attributeValueDoubleQuoted;
    }

    // 属性值的单引号
    attributeValueSingleQuoted(c) {
        if (c === "'") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value +=c;
        return attributeValueSingleQuoted;
    }

    // 去除属性值的引号
    attributeValueUnquoted(c) {
        if (/[\t \f\n].test(c)/) {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value = c;
        return this.attributeValueUnquoted;
    }
    // 标签闭合。
    selfClosingTag(c) {
        if (c === ">") {
            this.emitToken(this.token);
            return this.data;
        }        
    }

    
    // only handle right character reference
    characterReferenceInData(c) {
        if (c === ";") {
            characterReferenceInData += c;
            
        }
    }
    /** 接受错误输出。 */
    error(c) {
        console.log(`warn: unexpected char '${c}'`);
    } 
    // 输出打印。
    emitToken(token) {
        this.receiveOutput(token)
    }

    /** 接收输出 */ 
    receiveOutput(token) {
        this.handle(token);
    }
}


module.exports = {
    HTMLLexicalParser,
    StartTagToken,
    EndTagToken
};