import fs from "fs/promises";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const skillSource = path.join(__dirname, "../skill");

function resolveInstallPath(target, customPath) {
  if (customPath) {
    return customPath;
  }

  const cwd = process.cwd();

  switch (target) {
    case "claude":
      return path.join(cwd, ".claude", "skills", "product-decision-reviewer");

    case "codex":
      return path.join(cwd, ".codex", "skills", "product-decision-reviewer");

    case "generic":
      return path.join(cwd, "skills", "product-decision-reviewer");

    default:
      throw new Error(`Unsupported target: ${target}`);
  }
}

export async function installSkill({
  target,
  customPath,
  force = false,
  confirmReplace,
}) {
  const destination = resolveInstallPath(target, customPath);

  const exists = await directoryExists(destination);

  if (exists && !force) {
    const shouldReplace = await confirmReplace();

    if (!shouldReplace) {
      throw new Error("Installation cancelled.");
    }

    await fs.rm(destination, {
      recursive: true,
      force: true,
    });
  }
  await fs.mkdir(destination, {
    recursive: true,
  });

  await fs.cp(skillSource, destination, {
    recursive: true,
  });

  console.log(`
Installed to:

${destination}
`);

  await verifyInstallation(destination);
}

async function verifyInstallation(destination) {
  const skillFile = path.join(destination, "SKILL.md");

  await fs.access(skillFile);

  console.log("✓ SKILL.md verified");
}

async function directoryExists(directory) {
  try {
    await fs.access(directory);

    return true;
  } catch {
    return false;
  }
}
