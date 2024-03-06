import { BinaryExpr,UnaryExpr, LiteralExpr, Expr, GroupingExpr } from "./expr";

class AstPrinter {
	static prettify(expr: Expr): string {
        if (expr instanceof BinaryExpr) {
            const left = this.prettify(expr.left);
            const right = this.prettify(expr.right);
            return this.parenthesize(`${expr.operator.lexeme} ${left} ${right}`)
        }
        else if (expr instanceof GroupingExpr) {
            return this.prettify(expr.expr)
        }
        else if (expr instanceof UnaryExpr) {
            const right = this.prettify(expr.right);
            return this.parenthesize(`${expr.operator.lexeme} ${right}`)
        }
        else if (expr instanceof LiteralExpr) {
            return `${expr.value}`
        }
        else throw new Error("Invalid Expr")
    }

    private static parenthesize(text: string) {
        return `(${text})`
    }
}

export default AstPrinter