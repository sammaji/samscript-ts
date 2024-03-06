import { type Token, TokenType } from "@/lex";
import { BinaryExpr, Expr, GroupingExpr, LiteralExpr, UnaryExpr } from "./expr";
import Smi from "./smi";

export class ParseError extends SyntaxError {}

class Parser {
    private tokens: Token[]
    private current: number = 0

    constructor(tokens: Token[]) {
        this.tokens = tokens
    }

    private isEof() {
        return this.peek().type === TokenType.EOF;
    }

    private check(type: TokenType) {
        if (this.isEof()) return false
        return this.peek().type === type;
    }

    private advance(): Token {
        if (!this.isEof()) this.current++
        return this.tokens[this.current-1] as Token;
    }

    private previous(): Token {
        return this.tokens[this.current-1] as Token;
    }

    private peek(): Token {
        return this.tokens[this.current] as Token;
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance()
                return true
            }
        }

        return false;
    }

    private consume(type: TokenType, message: string) {
        if (this.check(type)) return this.advance()
        throw this.error(this.peek(), message)
    }

    private error(token: Token, message: string) {
        Smi.errorAtLine(token.line, message)
        throw new ParseError()
    }

    private synchronize() {
        this.advance()
        while (this.isEof()) {
            if (this.previous().type === TokenType.SEMI) return

            switch (this.peek().type) {
                case TokenType.CLASS:
                case TokenType.FUN:
                case TokenType.VAR:
                case TokenType.FOR:
                case TokenType.IF:
                case TokenType.WHILE:
                case TokenType.PRINT:
                case TokenType.RETURN:
                    return;
            }

            this.advance();
        }
    }

    private expression(): Expr {
        return this.equality()
    }

    private equality(): Expr {
        let expr = this.comparison()

        while (this.match(TokenType.NEQ, TokenType.EQEQ)) {
            const operator = this.previous()
            const right = this.comparison()
            expr = new BinaryExpr(expr, operator, right)
        }

        return expr
    }

    private comparison(): Expr {
        let expr = this.term()

        while (this.match(TokenType.GT, TokenType.GTE, TokenType.LT, TokenType.LTE)) {
            const operator = this.previous()
            const right = this.term()
            expr = new BinaryExpr(expr, operator, right)
        }

        return expr
    }

    private term(): Expr {
        let expr = this.factor()

        while (this.match(TokenType.MUL, TokenType.DIVIDE)) {
            const operator = this.previous()
            const right = this.factor()
            expr = new BinaryExpr(expr, operator, right)
        }

        return expr
    }

    private factor(): Expr {
        let expr = this.unary()

        while (this.match(TokenType.PLUS, TokenType.MINUS)) {
            const operator = this.previous()
            const right = this.unary()
            expr = new BinaryExpr(expr, operator, right)
        }

        return expr
    }

    private unary(): Expr {
        if (this.match(TokenType.NOT, TokenType.MINUS)) {
            const operator = this.previous()
            const right = this.unary()
            return new UnaryExpr(operator, right)
        }

        return this.primary()
    }

    private primary(): Expr {
        if (this.match(TokenType.TRUE)) return new LiteralExpr(true);
        if (this.match(TokenType.FALSE)) return new LiteralExpr(false);
        if (this.match(TokenType.NIL)) return new LiteralExpr(null);
        if (this.match(TokenType.NUMBER, TokenType.STRING)) return new LiteralExpr(this.previous().literal);
        if (this.match(TokenType.LPAREN)) {
            const expr = this.expression();
            this.consume(TokenType.RPAREN, "Expected ')' after expression");
            return new GroupingExpr(expr)
        }
        throw this.error(this.peek(), "Syntax error.");
    }

    parse() {
        try {
            return this.expression()
        }
        catch (e: any) {
            return null
        }
    }
}

export default Parser