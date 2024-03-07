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

export class WhileStmt extends Stmt {
	condition: Expr;
	body: Stmt;
	constructor(condition: Expr, body: Stmt) {
		super();
		this.condition = condition;
		this.body = body;
	}
};

export class ForStmt extends Stmt {
	body: Stmt;
	initializer?: VarDecl | ExprStmt;
	condition?: Expr;
	update?: Expr;
	constructor(body: Stmt, initializer?: VarDecl | ExprStmt, condition?: Expr, update?: Expr) {
		super();
		this.body = body;
		this.initializer = initializer;
		this.condition = condition;
		this.update = update;
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

