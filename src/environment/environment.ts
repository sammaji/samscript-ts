import { RuntimeError } from "@/error";
import { Token } from "@/lex";

class Environment {
  enclosing?: Environment;
  private values: Map<string, any> = new Map();

  constructor(enclosing?: Environment) {
    this.enclosing = enclosing;
  }

  define(name: Token, value: any) {
    if (this.values.has(name.lexeme)) {
      throw new RuntimeError(`Cannot redeclare variable ${name.lexeme}`, name);
    }
    this.values.set(name.lexeme, value);
  }

  assign(name: Token, value: any) {
    if (this.values.has(name.lexeme)) {
      this.values.set(name.lexeme, value);
      return;
    } else if (this.enclosing !== undefined) {
      this.enclosing.assign(name, value);
      return;
    }
    throw new RuntimeError(`Undefined variable ${name.lexeme}`, name);
  }

  get(name: Token): any {
    if (this.values.has(name.lexeme)) {
      return this.values.get(name.lexeme);
    } else if (this.enclosing !== undefined) {
      return this.enclosing.get(name);
    }
    throw new RuntimeError(`Undefined variable ${name.lexeme}`, name);
  }
}

export default Environment;
