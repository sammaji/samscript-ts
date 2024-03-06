import keywords from "./keywords";
import Smi from "@/samscript";
import TokenType from "./tokens";
import { isAlpha, isAlphaNumeric, isDigit } from "@/util";

export type Token = {
    type: TokenType,
    lexeme: string,
    literal: any,
    line: number
}

class Scanner {
    source: string;
    tokens: Token[];

    start = 0
    current = 0
    line = 1

    constructor(source: string) {
        this.source = source
        this.tokens = []
    }

    private isEof() {
        return this.current >= this.source.length;
    }

    private peek(lookahead: number = 0) {
        if (this.current + lookahead >= this.source.length) return '\0'
        return this.source.charAt(this.current + lookahead)
    }

    private advance() {
        this.current++;
        return this.source.charAt(this.current-1)
    }

    private match(expected: string) {
        if (this.isEof()) return false;
        if (this.source.charAt(this.current) != expected) return false;

        this.current++;
        return true;
    }

    private string() {
        while (this.peek() !== '"' && !this.isEof()) {
            if (this.peek() === '\n') this.line++
            this.advance()
        }

        if (this.isEof()) {
            Smi.errorAtLine(this.line, "Unterminated string.")
            return
        }

        this.advance()

        const value = this.source.substring(this.start+1, this.current-1)
        this.addToken(TokenType.STRING, value)
    }

    private number() {
        while (isDigit(this.peek())) this.advance()

        if (this.peek() === '.' && isDigit(this.peek(1))) {
            this.advance()
            while (isDigit(this.peek())) this.advance()
        }

        const value = Number(this.source.substring(this.start, this.current))
        this.addToken(TokenType.NUMBER, value)
    }

    private identifier() {
        while (isAlphaNumeric(this.peek())) this.advance()
        const text: string = this.source.substring(this.start, this.current);
        let type = keywords.get(text)
        if (!type) type = TokenType.IDENTIFIER
        this.addToken(type)
    }

    private addToken(type: TokenType, literal: any = null) {
        const lexeme = this.source.substring(this.start, this.current)
        this.tokens.push({
            type, lexeme, line: this.line, literal
        })
    }

    scanTokens(): Token[] {
        while (!this.isEof()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push({
            type: TokenType.EOF,
            lexeme: "",
            literal: null,
            line: this.line
        });

        return this.tokens;
    }

    private scanToken() {
        const c = this.advance();
        switch (c) {
            case '(': this.addToken(TokenType.LPAREN); break;
            case ')': this.addToken(TokenType.RPAREN); break;
            case '{': this.addToken(TokenType.LBRACE); break;
            case '}': this.addToken(TokenType.RBRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case '*': this.addToken(TokenType.MUL); break;
            case ';': this.addToken(TokenType.SEMI); break;

            case '!': this.addToken(this.match('=') ? TokenType.NEQ: TokenType.NOT); break;
            case '=': this.addToken(this.match('=') ? TokenType.EQEQ: TokenType.EQ); break;
            case '>': this.addToken(this.match('=') ? TokenType.GTE: TokenType.GT); break;
            case '<': this.addToken(this.match('=') ? TokenType.LTE: TokenType.LT); break;
            
            case '/':
                if (this.match('/')) {
                    while (this.peek() != '\n' && !this.isEof()) this.advance();
                }
                else {
                    this.addToken(TokenType.DIVIDE);
                }
                break;
            
            case ' ':
            case '\t':
            case '\r':
                break; 
            case '\n':
                this.line++;
                break;

            case '"': this.string(); break;

            default:
                if (isDigit(c)) this.number()
                else if (isAlpha(c)) this.identifier()
                else Smi.errorAtLine(this.line, `unexpected token: ${c}`)
        }
    }
}

export default Scanner