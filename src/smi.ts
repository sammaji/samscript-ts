import path from "path";
import fs from "node:fs"
import { type Token, TokenType, Scanner } from "@/lex";
import Parser from "./parser";
import AstPrinter from "./pretty-printer";

class Smi {
    static hadError = false;

    static printUsage() {
        console.log("Usage: smi [file]");
    }

    static runRepl() {
        console.log('running repl...')
        // InputStreamReader reader = new InputStreamReader(System.in);
        // BufferedReader buffer = new BufferedReader(reader);

        // for(;;) {
        //     System.out.print("> ");
        //     String line = buffer.readLine();
        //     if (line == null || line.equals(":q")) {
        //         break;
        //     }
        //     System.out.println(line);
        //     run(line);

        //     hadError = false;
        // }
    }

    static runFile(filepath: string) {
        const fullPath = path.join(process.cwd(), filepath)
        if (fs.existsSync(fullPath)) {
            const source = fs.readFileSync(fullPath).toString();
            Smi.run(source)
        }

        if (this.hadError) process.exit(65);
    }

    static run(source: string) {
        const sc = new Scanner(source);
        const tokens = sc.scanTokens();
        // console.table(tokens.map(token => {
        //     const { type, ...rest } = token
        //     return { type: TokenType[type], ...rest }
        // }))

        const parser = new Parser(tokens)
        const ast = parser.parse()

        if (!ast) {
            console.log("can't produce ast")
            return
        }

        console.log("Here's your ast:")
        console.log(AstPrinter.print(ast))
    }

    static errorAtLine(line: number, message: string) {
        Smi.report(line, "", message);
    }

    static error(token: Token, message: string) {
        if (token.type === TokenType.EOF) {
            this.report(token.line, "at end", message)
        } else {
            this.report(token.line, " at '" + token.lexeme + "'", message);
        }
    }

    private static report(line: number, where: string, message: string) {
        console.log(`[${line} line] ${where}: ${message}`);
    }
}

export default Smi