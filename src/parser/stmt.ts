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

export class IfStmt extends Stmt {
	condition: Expr;
	thenBranch: Stmt;
	elseBranch?: Stmt;
	constructor(condition: Expr, thenBranch: Stmt, elseBranch?: Stmt) {
		super();
		this.condition = condition;
		this.thenBranch = thenBranch;
		this.elseBranch = elseBranch;
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

