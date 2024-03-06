import { BinaryExpr, Expr, LiteralExpr, UnaryExpr } from "./expr";
import AstPrinter from "./pretty-printer";
import Smi from "./smi";
import TokenType from "./lex/tokens";

function main() {
    if (process.argv.length === 2) Smi.runRepl();
    else if (process.argv.length === 3) Smi.runFile(process.argv[2] as string);
    else Smi.printUsage()

    // const expr = new BinaryExpr(
    //     new LiteralExpr(10),
    //     {
    //         type: TokenType.PLUS,
    //         lexeme: "+",
    //         literal: null,
    //         line: 1
    //     },
    //     new UnaryExpr({type: TokenType.MINUS,
    //         lexeme: "-",
    //         literal: null,
    //         line: 1},
    //         new LiteralExpr(15))
    // )

    // const text = AstPrinter.print(expr)
    // console.log(text)
}

main()
