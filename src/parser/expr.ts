import { Token } from "@/lex";

export class Expr {};

export class BinaryExpr extends Expr {
	left: Expr;
	operator: Token;
	right: Expr;
	constructor(left: Expr, operator: Token, right: Expr) {
		super();
		this.left = left;
		this.operator = operator;
		this.right = right;
	}
};

export class GroupingExpr extends Expr {
	expr: Expr;
	constructor(expr: Expr) {
		super();
		this.expr = expr;
	}
};

export class LiteralExpr extends Expr {
	value: any;
	constructor(value: any) {
		super();
		this.value = value;
	}
};

export class UnaryExpr extends Expr {
	operator: Token;
	right: Expr;
	constructor(operator: Token, right: Expr) {
		super();
		this.operator = operator;
		this.right = right;
	}
};

