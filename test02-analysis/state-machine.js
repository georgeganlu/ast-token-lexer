
// 实现的规则是  一个函数是一种状态  接收的参数是字符  返回值是下一个函数。
// EOF界定符。 
// 一个函数是一种状态，接收的参数是字符，返回值是下一个函数。
var data = function (c) {
    if (c == "&") {
        return chaaracterReferenceIndData;
    }
    if (c == "<") {
        return tagOpen;
    } else if (c == "\0") {
        error();
        emitToken(c);
        return data;
    } else if ( c == EOF) {
        emitToken(EOF);
        return data;
    } else {
        emitToken(c);
        return data;
    }
}

var tagOpenState = function tagOpenState(c) {
    if (c == "/") {
        return endTagOpenState;
    }
    if (c.match(/[A-Z]/)) {
        token = new StartTagToken();
        token.name = c.toLowerCase();
        return tagNameState;
    }
    if (c.match([a-z])) {
        token = new StartTagToken();
        token.name = c;
        return tagNameState;
    }
    if (c == "?") {
        return bogusCommentState;
    } else {
        error();
        return dataState;
    }
}

// 状态迁移，就是当前状态函数返回下一个状态函数。

let state = data;
while(char = getInput()) {
    state = state(char);
}


// 词法分析接收器，其实与之前的 9 + 8 = 20 就是对每一个字符进行控制,然后解析输出 or 加入到词法单元流。
function HTMLLexicalParser(){

    // 状态函数们……
    function data() {
        // ……
    }

    function tagOpen() {
        // ……
    }
    // ……
    var state = data;
    this.receiveInput = function(char) {
        state = state(char);
    }
}

// 把字符流形成词法流之后，就要形成dom树了。 ast语法树的情况。
function HTMLSyntaticalParser() {
    var stack = [new HTMLDocument];
    this.receiveInput = function (token) {
        // .....
    }
    this.getOutput = function() {
        return stack[0];
    }
}

// 构建dom树的过程。我们需要一个Node类，接下来我们所有的节点都会是这个Node类的实例。
function Element() {
    this.childNodes = [];
}

function Text(value) {
    this.value = value || ""; 
} 







