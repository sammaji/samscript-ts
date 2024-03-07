import { type Token } from "@/lex";

export class Expr {};

export class AssignExpr extends Expr {
	name: Token;
	value: Expr;
	constructor(name: Token, value: Expr) {
		super();
		this.name = name;
		this.value = value;
	}
};

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

export class VariableExpr extends Expr {
	name: Token;
	constructor(name: Token) {
		super();
		this.name = name;
	}
};

