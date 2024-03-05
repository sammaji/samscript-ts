import TokenType from "./tokens";

// const keywords = {
//     "and": TokenType.AND,
//     "class": TokenType.CLASS,
//     "else": TokenType.ELSE,
//     "false": TokenType.FALSE,
//     "for": TokenType.FOR,
//     "fun": TokenType.FUN,
//     "if": TokenType.IF,
//     "nil": TokenType.NIL,
//     "or": TokenType.OR,
//     "print": TokenType.PRINT,
//     "return": TokenType. RETURN,
//     // "super": TokenType.SUPER,
//     "this": TokenType.THIS,
//     "true": TokenType.TRUE,
//     "var": TokenType.VAR,
//     "while": TokenType.WHILE,
// }

const keywords = new Map<string, TokenType>()
keywords.set("and", TokenType.AND);
keywords.set("class", TokenType.CLASS);
keywords.set("else", TokenType.ELSE);
keywords.set("false", TokenType.FALSE);
keywords.set("for", TokenType.FOR);
keywords.set("fun", TokenType.FUN);
keywords.set("if", TokenType.IF);
keywords.set("nil", TokenType.NIL);
keywords.set("or", TokenType.OR);
keywords.set("print", TokenType.PRINT);
keywords.set("return", TokenType. RETURN);
// keywords.set("super", TokenType.SUPER);
keywords.set("this", TokenType.THIS);
keywords.set("true", TokenType.TRUE);
keywords.set("var", TokenType.VAR);
keywords.set("while", TokenType.WHILE);

export default keywords