import Smi from "./smi";

function main() {
    if (process.argv.length === 2) Smi.runRepl();
    else if (process.argv.length === 3) Smi.runFile(process.argv[2] as string);
    else Smi.printUsage()
}

main()
