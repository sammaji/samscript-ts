export const tokenTypeToString = (type: TokenType) => {
  switch (type) {
    case TokenType.LPAREN:
      return "LPAREN";
    case TokenType.RPAREN:
      return "RPAREN";
    case TokenType.LBRACE:
      return "LBRACE";
    case TokenType.RBRACE:
      return "RBRACE";

    case TokenType.PLUS:
      return "PLUS";
    case TokenType.MINUS:
      return "MINUS";
    case TokenType.DIVIDE:
      return "DIVIDE";
    case TokenType.MUL:
      return "MUL";

    case TokenType.DOT:
      return "DOT";
    case TokenType.SEMI:
      return "SEMI";
    case TokenType.COMMA:
      return "COMMA";
    case TokenType.QUOTE:
      return "QUOTE";

    case TokenType.NOT:
      return "NOT";
    case TokenType.EQ:
      return "EQ";
    case TokenType.EQEQ:
      return "EQEQ";
    case TokenType.NEQ:
      return "NEQ";
    case TokenType.GT:
      return "GT";
    case TokenType.GTE:
      return "GTE";
    case TokenType.LT:
      return "LT";
    case TokenType.LTE:
      return "LTE";

    case TokenType.AND:
      return "AND";
    case TokenType.OR:
      return "OR";
    case TokenType.IF:
      return "IF";
    case TokenType.ELSE:
      return "ELSE";
    case TokenType.TRUE:
      return "TRUE";
    case TokenType.FALSE:
      return "FALSE";

    case TokenType.FUN:
      return "FUN";
    case TokenType.FOR:
      return "FOR";
    case TokenType.WHILE:
      return "WHILE";
    case TokenType.VAR:
      return "VAR";
    case TokenType.NIL:
      return "NIL";
    case TokenType.CLASS:
      return "CLASS";
    case TokenType.RETURN:
      return "RETURN";
    case TokenType.PRINT:
      return "PRINT";
    case TokenType.THIS:
      return "THIS";

    case TokenType.STRING:
      return "STRING";
    case TokenType.NUMBER:
      return "NUMBER";
    case TokenType.IDENTIFIER:
      return "IDENTIFIER";

    case TokenType.EOF:
      return "EOF";

    default:
      return "UNKNOWN";
  }
};

enum TokenType {
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,

  PLUS,
  MINUS,
  DIVIDE,
  MUL,

  DOT,
  SEMI,
  COMMA,
  QUOTE,

  NOT,
  EQ,
  EQEQ,
  NEQ,
  GT,
  GTE,
  LT,
  LTE,

  AND,
  OR,
  IF,
  ELSE,
  TRUE,
  FALSE,

  FUN,
  FOR,
  WHILE,
  VAR,
  NIL,
  CLASS,
  RETURN,
  PRINT,
  THIS,

  STRING,
  NUMBER,
  IDENTIFIER,

  EOF,
}

export default TokenType;
