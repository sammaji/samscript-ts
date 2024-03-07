import { Token } from "@/lex";
import { getNthLine } from "@/util";

export class Error {
  message: string;
  name: string = "Error";
  constructor(message: string) {
    this.message = message;
  }
}

export class SyntaxError extends Error {
  token: Token;
  name: string = "SyntaxError";
  constructor(message: string, token: Token) {
    super(message);
    this.token = token;
  }
}

export class RuntimeError extends Error {
  token: Token;
  name: string = "SyntaxError";
  constructor(message: string, token: Token) {
    super(message);
    this.token = token;
  }
}

export class ErrorParser {
  static parseError(error: Error, source?: string) {
    switch (true) {
      case error instanceof SyntaxError:
        this.parseSyntaxError(error, source);
        return;
      case error instanceof RuntimeError:
        this.parseRuntimeError(error, source);
        return;
      default:
        console.log(`Error: ${error.message}`);
    }
  }

  static parseSyntaxError(error: SyntaxError, source?: string) {
    this.report(error, source);
  }

  static parseRuntimeError(error: RuntimeError, source?: string) {
    this.report(error, source);
  }

  private static report(error: SyntaxError | RuntimeError, source?: string) {
    if (!source) {
      console.error(`${error.name}: ${error.message}`);
      return;
    }

    console.error(
      `${error.token.line}| ${getNthLine(source, error.token.line)}`,
    );
    console.error(`${error.name}: ${error.message}\n`);
  }
}
