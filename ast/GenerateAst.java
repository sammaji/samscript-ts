package ast;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class GenerateAst {
    public static void main(String[] args) throws IOException {
        if (args.length != 1) {
            System.err.println("Usage: generate_ast <output directory>");
            System.exit(64);
        }
        defineAst("parser/expr.ts", "Expr", Arrays.asList(
                "AssignExpr -> name: Token, value: Expr",
                "BinaryExpr -> left: Expr, operator: Token, right: Expr",
                "GroupingExpr -> expr: Expr",
                "LiteralExpr -> value: any",
                "UnaryExpr -> operator: Token, right: Expr",
                "VariableExpr -> name: Token"), Arrays.asList());

        defineAst("parser/stmt.ts", "Stmt",
            Arrays.asList(
                "BlockStmt -> stmts: Stmt[]",
                "ExprStmt -> expr: Expr",
                "PrintStmt -> expr: Expr",
                "IfStmt -> condition: Expr, block: Stmt[]",
                "VarDecl -> name: Token, initializer: Expr|null"
                ), 
                Arrays.asList("import { Expr } from \"./expr\""));
    }

    private static void defineAst(
            String filename, String basename, List<String> types, List<String> startingLines)
            throws IOException {
        String cwd = Paths.get("").toAbsolutePath().toString();
        String path = Path.of(cwd, "src", filename).toString();
        PrintWriter writer = new PrintWriter(path, "UTF-8");
        writer.println("import { type Token } from \"@/lex\";");
        if (startingLines.size() > 0) {
            for (String line : startingLines) {
                writer.println(line);
            }
        }
        writer.println();
        writer.printf("export class %s {};", basename);
        writer.println();
        writer.println();

        // the AST classes
        for (String type : types) {
            String className = type.split("->")[0].trim();
            String fields = type.split("->")[1].trim();
            defineType(writer, basename, className, fields);
        }
        writer.close();
    }

    private static void defineType(
            PrintWriter writer, String baseName,
            String className, String fieldList) {
        writer.printf("export class %s extends %s {", className, baseName);
        writer.println();

        String[] fields = fieldList.split(", ");
        for (String field : fields) {
            writer.printf("\t%s;", field);
            writer.println();
        }

        // Constructor.
        writer.printf("\tconstructor(%s) {", fieldList);
        writer.println();
        writer.println("\t\tsuper();");
        // Store parameters in fields.
        for (String field : fields) {
            String name = field.split(":")[0].trim();
            writer.printf("\t\tthis.%s = %s;", name, name);
            writer.println();
        }
        writer.println("\t}");
        writer.println("};");
        writer.println();
    }
}