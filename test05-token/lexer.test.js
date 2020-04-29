// const html = `<div class="inline pointer scroll-top" @click="top">置顶测试</div>`;
class StartTagToken { } // 开启标签
class Attribute { } // 属性标签
class EndTagToken { } // 结束标签

class HTMLlexicalParser {
    constructor() {
        this.token = ''; // 形面的token的栈。
        this.attribute = null;
        this.state = this.data;
        this.characterReference = '';
        this.characterReferenceInData = this.characterReferenceInData;
    }

    /** 接收的入口数据 */
    receiveInput(c) {
        if (this.state) {
            this.state = this.state(c);
        } else {
           console.error(c);   
        }        
    }
    /** 数据入口的发发。 */
    data(c) {
        if (c === '&') {
            return this.characterReferenceInData;
        }
        if (c == '<') {
            return this.tagOpen;
        }

        this.emitToken(c);
        return this.data;
        // 如果为 ''的话，直接输出字符。  
        // else if (/[\t \f\n]/.test(c)) {
            
        // }
    }

    // tagOpen同时可以打开和
    tagOpen(c) {
        // open开始的可能性有 /[a-zA-z-]/   /   or else 
        if (/[a-zA-z--]/.test(c)) {
            this.token = new StartTagToken();
            this.token.name = c;
            return this.tagName;
        } else if (c == '/') {
            return this.endTagOpen;
        } else {
            return error(c);
        }
    }

    tagName(c) {
        // 开始标签名 [a-zA-z-] or  ''及制表符  or '/' or '>'   // 比如 <hr/>  <img> 标签
        if (/[a-zA-z-]/.test(c)) {
            this.token.name += c.toLowerCase();
            return this.tagName;
        } else if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        } else if (c == '/') {
            return this.selfClosingTag;
        } else if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
    }

    // const html = `<div class="inline pointer scroll-top" onClick="top">置顶测试</div>`;
    // 进入属性前面。
    beforeAttributeName(c) {
        // space or [a-zA-z-] or / or >     eg   <xxxx  xx >  <xxxx  xx  />
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        }
        if (c == '/') {
            return this.selfClosingTag;
        }
        if (c == '>') { // <img > 的例子从tagName直接  
            this.emitToken(this.token);
            return this.data;
        }
        if (/["'<]/.test(c)) {
            return this.error(c);
        }

        this.attribute = new Attribute();
        this.attribute.name = c.toLowerCase();
        this.attribute.value = '';
        return this.attributeName;

    }

    attributeName(c) {
        //  属性名可能的有 space or = or [a-zA-z-] or / or >
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeName;
        }
        if (c == '=') {
            //  进入属性值前
            return this.beforeAttributeValue;
        }
        if (c == '/') {
            this.token[this.attribute.name] = this.attribute.value;
            return this.selfClosingTag;
        }
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
        this.attribute.name += c;
        this.attribute.value = '';
        return this.attributeName;
    }

    beforeAttributeValue(c) {
        //  进入属性值可能有  space or singleQuoted or DoubleQuoted or value值。
        if (/[\t \f\n]/.test(c)) {
            return this.beforeAttributeValue;
        }
        if (c == "'") {
            return this.attributeValueSingleQuoted;
        }
        if (c == '"') {
            return this.attributeValueDoubleQuoted;
        }
        // 如果属性值不带引号的话。
        this.attribute.value += c;
        return this.attributeValueUnquoted;
    }

    // 属性值不带引号的情况。
    attributeValueUnquoted(c) {
        // 直接是值的情况  value or [\t]
        if (/[\t \f\n]/.test(c)) {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c;
        return this.attributeValueUnquoted;
    }


    attributeValueSingleQuoted() {
        // 属性值进入单引号的话 可能的是 space or 各种值。
        if (c == "'") {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;  // 单引号结束的话，继续进行属性的确认。
        }
        this.attribute.value += c;
        return this.attributeValueSingleQuoted;  // 还是进入单引引
    }

    attributeValueDoubleQuoted(c) {
        if (c == '"') {
            this.token[this.attribute.name] = this.attribute.value;
            return this.beforeAttributeName;
        }
        this.attribute.value += c;
        return this.attributeValueDoubleQuoted;
    }

    // <xxx   xxx='xxx' ></div>  or  <hr/>  
    // 进入是以 / 来进入的。
    endTagOpen(c) {
        if (/[a-zA-z-]/.test(c)) {
            this.token = new EndTagToken();
            this.token.name = c.toLowerCase();
            return this.tagName;
        }
        if (c == ">") {
            return this.error(c);
            // 抛出错误进入错误循环。
            // return this.data;  
        }
    }

    // 自身标签的关闭   <hr />
    selfClosingTag(c) {
        if (c == '>') {
            this.emitToken(this.token);
            return this.data;
        }
    }

    /** 输出 */
    emitToken(token) {
        if (typeof token === 'string') {
            console.log(`String(${token.replace(/\n/, /\\n/).replace(/ /, '<whitespace>')})`);
        } else {
            console.log(token);
        }
    }
    error(c) {
        console.log(`Error(${c}) - 无法识别的字符`);
    }

    // 仅处理右字符的引用 -- 这里是处理连接符，直到处理到; 然后直接输出
    characterReferenceInData(c) {
        if (c == ';') {
            this.characterReference += c;
            this.emitToken(this.characterReference);
            this.characterReference = '';
            return this.data
        } else {
            this.characterReference += c;
            return this.characterReferenceInData;
        }
    }
}

module.exports = HTMLlexicalParser;