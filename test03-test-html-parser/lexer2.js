class StartTagToken {};
class EndTagToken {};
class Attribute {};

const regSpace = /[\t \f\n]/;
const regName = /[a-zA-Z]/;


class HTMLWordParser {
    constructor(handle) {
        this.handle = handle;
        this.state = this.data;
        this.token = undefined;
        this.attribute = undefined;
        this.charReference = "";
    }
    /** 接收输入 */ 
    receiveInput(c) {
        if (!this.state) {
            throw new Error("there start main func is wrong");
        } else {
            this.state = this.state(c);
        }
    }
    /** 入口函数 */ 
    data(c) {
        if (c === "<") {
            return this.tagOpen;
        } else if (c === "&") {
            return this.charReferenceInData;
        } else {
            this.emmitToken(this.token);
            return this.data;
        }
    }

    // 进入标签开始
    tagOpen(c) {
        // 可能是闭合的标签
        if (c === "/") {
            return this.endTagOpen;
        } else if (/[a-zA-Z]/.test(c)) {
            this.token = new StartTagToken();
            this.token.name = c.toLowerCase();
            return this.tagName;
        } else {
            this.error(c);
        }         
    }

    tagName(c) {
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttribute
        } else if (/[a-zA-Z]/.test(c)) {
            this.token.name += c.toLowerCase();
            return this.tagName;
        } 
    }

    beforeAttribute(c) {
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttribute;
        } else if (regName.test(c)) {
            this.attribute = new Attribute();
            this.attribute.name = c.toLowerCase();
            return this.attributeName;
        } 
        if (c === ">") {
            this.emmitToken()
        }
    }

    attributeName(c) {
        if (regName.test(c)) {
            this.attribute.name += c.toLowerCase();
            return this.attributeName;
        } else if (regSpace.test(c)) {
            return this.attributeName;
        } else if (c === "=") {
            return this.beforeAttributeValue;
        }
    }

    beforeAttributeValue(c) {
        if (regSpace.test(c)) {
           return this.beforeAttributeValue;
        } else if (c === "'") {
            return this.attributeValueSingleQuto;
        } else if (c === '"') {
            return this.attributeValueDoubleQuto;
        } else if (regName.test(c)) {
            this.attribute.value = c.toLowerCase();
            return this.attributeValue;
        }
    }

    attributeValue(c) {
        if (regName.test(c)) {
            this.attribute.value += c.toLowerCase();
            return this.attributeValue;            
        } else if (regSpace.test(c)) {
            return this.beforeAttribute;
        }
    }

    attributeValueSingleQuto(c) {
        if (regName.test(c)) {
            this.attribute.value += c.toLowerCase();
            return this.attributeValueSingleQuto;
        } else if (c === "'") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttribute;
        }
    }

    attributeValueDoubleQuto(c) {
        if (regName.test(c)) {
            this.attribute.value += c.toLowerCase();
            return this.attributeValueDoubleQuto;
        } else if (c === '"') {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttribute;
        }        
    }
    




    /** 错误输出 */ 
    error(c) {
        console.log(`warn : unexpected token '${c}'`);
    }
    /** 输出 */
    emmitToken(token) {
        this.handle(token);
    } 
};


module.exports = {
    HTMLWordParser,
    StartTagToken,
    EndTagToken
}