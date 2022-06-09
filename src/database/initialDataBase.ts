import { join } from "path";
import { writeFileSync, readFileSync } from "fs";

export default interface IDB<Type> {
  data: Array<Type>;
  write: () => void;
  read: () => void;
}

class DB<Type> implements IDB<Type> {
  constructor(private readonly jsonFilePath: string) {}

  data: Array<Type> = [];

  write = (): void => {
    if (process.env.NODE_ENV !== "test") {
      writeFileSync(this.jsonFilePath, JSON.stringify(this.data), "utf-8");

      this.read();
    }
  };

  read = (): void => {
    if (process.env.NODE_ENV !== "test") {
      const strData = readFileSync(this.jsonFilePath, "utf-8");

      this.data = strData ? JSON.parse(strData) : [];
    }
  };
}

export function createDataBase<Type>(jsonFile: string) {
  const db = new DB<Type>(join(__dirname, "../../db", jsonFile));

  db.read();

  return db;
}
