import readline from "readline";
import { installSkill } from "./installer.js";

function createPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(question) {
  const rl = createPrompt();

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function parseArguments() {
  const args = process.argv.slice(2);

  const targetIndex = args.indexOf("--target");
  const pathIndex = args.indexOf("--path");

  return {
    target: targetIndex !== -1 ? args[targetIndex + 1] : null,

    customPath: pathIndex !== -1 ? args[pathIndex + 1] : null,

    force: args.includes("--force"),
  };
}

async function confirmReplace() {
  const answer = await ask(`
Existing installation found.
Replace existing skill? (y/n): 
`);

  return answer.toLowerCase() === "y";
}

async function selectTarget() {
  console.log(`
Select installation target:

1. Claude Code
2. OpenAI Codex
3. Generic skill folder
`);

  const choice = await ask("Choose option: ");

  switch (choice) {
    case "1":
      return "claude";

    case "2":
      return "codex";

    case "3":
      return "generic";

    default:
      throw new Error("Invalid option selected.");
  }
}

async function main() {
  console.log(`
Product Decision Reviewer Installer
`);

  const args = parseArguments();

  const target = args.target ?? (await selectTarget());

  await installSkill({
    target,
    customPath: args.customPath,
    force: args.force,
    confirmReplace,
  });

  console.log(`
✓ Installation completed.

Your Product Decision Reviewer skill is ready.
`);
}

main().catch((error) => {
  console.error(`
Installation failed:
${error.message}
`);

  process.exit(1);
});
