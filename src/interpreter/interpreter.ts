import { Token, TokenType } from "@/lex";
import { BinaryExpr, Expr, GroupingExpr, LiteralExpr, UnaryExpr } from "@/parser";

export class RuntimeError extends Error {
    name: string = "RuntimeError";
    token: Token;
    constructor(message: string, token: Token) {
        super()
        this.message = message
        this.token = token
    }
}

class Interpreter {
    interpret(expr: Expr) {
        try {
            const result: any = Interpreter.evaluate(expr);
            console.log(result)
        }
        catch(error: any) {
            if (error instanceof RuntimeError) {
                console.error(error.message);
            }
        }
    }

    private static evaluate(expr: Expr): any {
        switch (true) {
            case expr instanceof GroupingExpr:
                return this.evaluate(expr.expr)
            case expr instanceof UnaryExpr:
                return this.evaluateUnaryExpr(expr)
            case expr instanceof BinaryExpr:
                return this.evaluateBinaryExpr(expr)
            case expr instanceof LiteralExpr:
                return expr.value
            default:
                throw new Error("Invalid expression.")
        }
    }

    private static evaluateUnaryExpr(expr: UnaryExpr) {
        switch (expr.operator.type) {
            case TokenType.MINUS:
                const right: any = this.evaluate(expr.right)
                this.isNumberOperand(expr.operator, right)
                return right * -1
            case TokenType.NOT:
                return !this.isTruthy(expr.right)
        }

        return null
    }

    private static evaluateBinaryExpr(expr: BinaryExpr) {
        const left:any = this.evaluate(expr.left)
        const right:any = this.evaluate(expr.right)

        switch(expr.operator.type) {
            case TokenType.EQEQ:
                return left===right
            case TokenType.NEQ:
                return left!=right
            case TokenType.GT:
                this.isNumberOperands(expr.operator, left, right)
                return left>right
            case TokenType.GTE:
                this.isNumberOperands(expr.operator, left, right)
                return left>=right
            case TokenType.LT:
                this.isNumberOperands(expr.operator, left, right)
                return left<right
            case TokenType.LTE:
                this.isNumberOperands(expr.operator, left, right)
                return left<=right           
            case TokenType.MUL:
                this.isNumberOperands(expr.operator, left, right)
                return left*right
            case TokenType.DIVIDE:
                this.isNumberOperands(expr.operator, left, right)
                if (right === 0) {
                    throw new RuntimeError("Cannot divide by zero", expr.operator)
                }
                return left/right
            case TokenType.PLUS:
                if (typeof left === "number" && typeof right === "number") {
                    return left+right
                }
                else if (typeof left === "string" || typeof right === "string") {
                    return this.stringify(left) + this.stringify(right)
                };
                throw new RuntimeError("Operands must be both numbers or one must be string", expr.operator)
            case TokenType.MINUS:
                this.isNumberOperands(expr.operator, left, right)
                return left-right 
        }

        return null
    }

    private static stringify(value: any) {
        if (value === null) return "nil"
        return String(value)
    }

    private static isTruthy(expr: Expr): boolean {
        if (expr === null) return false
        else if (typeof expr === "boolean") return expr
        else return true
    }

    private static isNumberOperand(operator: Token, right: any) {
        if (typeof right === "number") return;
        throw new RuntimeError("Operand must be a number", operator)
    }

    private static isNumberOperands(operator: Token, left: any, right: any) {
        if (typeof left === "number" && typeof right === "number") return;
        throw new RuntimeError("Operands must both be numbers", operator)
    }
}

export default Interpreter