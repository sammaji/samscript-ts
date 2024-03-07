import { type Token } from "@/lex";
import { Expr } from "./expr"

export class Stmt {};

export class BlockStmt extends Stmt {
	stmts: Stmt[];
	constructor(stmts: Stmt[]) {
		super();
		this.stmts = stmts;
	}
};

export class ExprStmt extends Stmt {
	expr: Expr;
	constructor(expr: Expr) {
		super();
		this.expr = expr;
	}
};

export class PrintStmt extends Stmt {
	expr: Expr;
	constructor(expr: Expr) {
		super();
		this.expr = expr;
	}
};

export class VarDecl extends Stmt {
	name: Token;
	initializer: Expr|null;
	constructor(name: Token, initializer: Expr|null) {
		super();
		this.name = name;
		this.initializer = initializer;
	}
};

