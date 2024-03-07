import Samscript from "./samscript";

function main() {
  if (process.argv.length === 2) Samscript.runRepl();
  else if (process.argv.length === 3)
    Samscript.runFile(process.argv[2] as string);
  else Samscript.printUsage();
}

main();
