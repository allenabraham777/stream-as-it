import { readFileSync } from "fs";
import { join } from "path";

export const getTemplate = (template: string, value: object) => {
  let file = readFileSync(
    join(__dirname, "templates", `${template}.html`),
    "utf-8"
  );
  const entities = Object.entries(value);
  for (const entity of entities) {
    file = file.replaceAll(`{${entity[0]}}`, entity[1]);
  }
  return file;
};
