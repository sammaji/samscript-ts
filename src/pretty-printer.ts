import { BinaryExpr,UnaryExpr, LiteralExpr, Expr, GroupingExpr } from "./expr";

class AstPrinter {
	static print(expr: Expr): string {
        if (expr instanceof BinaryExpr) {
            const left = this.print(expr.left);
            const right = this.print(expr.right);
            return this.parenthesize(`${expr.operator.lexeme} ${left} ${right}`)
        }
        else if (expr instanceof GroupingExpr) {
            return this.print(expr)
        }
        else if (expr instanceof UnaryExpr) {
            const right = this.print(expr.right);
            return this.parenthesize(`${expr.operator.lexeme} ${right}`)
        }
        else if (expr instanceof LiteralExpr) {
            return `${expr.value}`
        }
        else return ""
    }

    private static parenthesize(text: string) {
        return `(${text})`
    }
}

export default AstPrinter