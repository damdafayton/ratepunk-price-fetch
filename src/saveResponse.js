import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export const saveResponse = async (content) => {
  await fs.writeFile(path.join(__dirname, `result.html`), content, (err) => {
    if (err) {
      throw err;
    }
    console.log(`result.html is saved`);
  });
};
