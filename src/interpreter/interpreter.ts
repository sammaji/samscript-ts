import { Environment } from "@/environment";
import { Token, TokenType } from "@/lex";
import { AssignExpr, BinaryExpr, BlockStmt, Expr, ExprStmt, GroupingExpr, IfStmt, LiteralExpr, LogicalExpr, PrintStmt, Stmt, UnaryExpr, VarDecl, VariableExpr } from "@/parser";
import { RuntimeError } from "@/error";

class Interpreter {
    environment = new Environment()

    interpret(stmts: Stmt[]) {
        for (const stmt of stmts) {
            this.readStmt(stmt)
        }
    }

    private readStmt(stmt: Stmt) {
        switch (true) {
            case stmt instanceof PrintStmt:
                console.log(this.stringify(this.evaluate(stmt.expr)))
                return
            case stmt instanceof VarDecl:
                this.evaluateVarDecl(stmt)
                return
            case stmt instanceof BlockStmt:
                this.evaluateBlockStmt(stmt.stmts, new Environment(this.environment))
                return
            case stmt instanceof IfStmt:
                this.evaluateIfStmt(stmt.condition, stmt.thenBranch, stmt.elseBranch)
                return
            case stmt instanceof ExprStmt:
                this.evaluate(stmt.expr)
                return
        }
    }

    private evaluateIfStmt(expr: Expr, thenBranch: Stmt, elseBranch?: Stmt) {
        const condition = this.isTruthy(this.evaluate(expr))
        if (condition) this.readStmt(thenBranch)
        else if (elseBranch !== undefined) this.readStmt(elseBranch)
    }

    private evaluateVarDecl(stmt: VarDecl) {
        let value: any = null
        if (stmt.initializer != null) {
            value = this.evaluate(stmt.initializer)
        }
        this.environment.define(stmt.name, value)
    }

    private evaluateBlockStmt(stmts: Stmt[], environment: Environment) {
        const previous = this.environment
        try {
            this.environment = environment
            for (const stmt of stmts) {
                this.readStmt(stmt)
            }
        }
        finally {
            this.environment = previous
        }
    }

    private evaluate(expr: Expr): any {
        switch (true) {
            case expr instanceof GroupingExpr:
                return this.evaluate(expr.expr)
            case expr instanceof UnaryExpr:
                return this.evaluateUnaryExpr(expr)
            case expr instanceof BinaryExpr:
                return this.evaluateBinaryExpr(expr)
            case expr instanceof LogicalExpr:
                return this.evaluateLogicalExpr(expr)
            case expr instanceof VariableExpr:
                return this.environment.get(expr.name)
            case expr instanceof AssignExpr:
                const value = this.evaluate(expr.value)
                this.environment.assign(expr.name, value)
                return value
            case expr instanceof LiteralExpr:
                return expr.value
            default:
                throw new SyntaxError("Invalid expression.")
        }
    }

    private evaluateUnaryExpr(expr: UnaryExpr) {
        switch (expr.operator.type) {
            case TokenType.MINUS:
                const right: any = this.evaluate(expr.right)
                this.isNumberOperand(expr.operator, right)
                return right * -1
            case TokenType.NOT:
                return !this.isTruthy(this.evaluate(expr.right))
        }

        return null
    }

    private evaluateBinaryExpr(expr: BinaryExpr) {
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

    private evaluateLogicalExpr(expr: BinaryExpr) {
        const left = this.isTruthy(this.evaluate(expr.left))
        
        if ((expr.operator.type === TokenType.OR && left) || (expr.operator.type === TokenType.AND && !left)) {
            return left
        }

        const right = this.isTruthy(this.evaluate(expr.right))
        if (expr.operator.type === TokenType.OR) {
            return left || right
        }
        
        return left && right
    }

    private stringify(value: any) {
        if (value === null) return "nil"
        return String(value)
    }

    private isTruthy(expr: Expr): boolean {
        if (expr === null) return false
        else if (typeof expr === "boolean") return expr
        else return true
    }

    private isNumberOperand(operator: Token, right: any) {
        if (typeof right === "number") return;
        throw new RuntimeError("Operand must be a number", operator)
    }

    private isNumberOperands(operator: Token, left: any, right: any) {
        if (typeof left === "number" && typeof right === "number") return;
        throw new RuntimeError("Operands must both be numbers", operator)
    }
}

export default Interpreter