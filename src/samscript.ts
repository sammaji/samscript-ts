import path from "path";
import fs from "node:fs";
import readline from "readline";
import { Scanner } from "@/lex";
import { Parser } from "@/parser";
import { Interpreter } from "./interpreter";
import { Error, ErrorParser } from "./error";

class Samscript {
  static hadError = false;
  static hadRuntimeError = false;
  static interpreter = new Interpreter();

  static printUsage() {
    console.log("Usage: samscript [file]");
  }

  static runRepl() {
    console.log("Samscript REPL. Type :q to exit.");
    const inf = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const readlines = (inf: readline.Interface) => {
      inf.question("> ", (line: string | null) => {
        if (line === null || line === ":q") {
          process.exit();
        }
        this.run(line);
        this.hadError = false;
        this.hadRuntimeError = false;
        readlines(inf);
      });
    };

    readlines(inf);
  }

  static runFile(filepath: string) {
    const fullPath = path.join(process.cwd(), filepath);
    if (fs.existsSync(fullPath)) {
      const source = fs.readFileSync(fullPath).toString();
      this.run(source);
    }
    if (this.hadError) process.exit(65);
    if (this.hadRuntimeError) process.exit(70);
  }

  static run(source: string) {
    const sc = new Scanner(source);
    const tokens = sc.scanTokens();
    const parser = new Parser(tokens, source);
    let ast;

    try {
      ast = parser.parse();
      this.interpreter.interpret(ast);
    } catch (error: any) {
      if (error instanceof Error) {
        ErrorParser.parseError(error, source);
      } else {
        console.error(error);
      }
    }
  }
}

export default Samscript;
