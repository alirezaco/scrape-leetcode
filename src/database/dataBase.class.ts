import IDataBace from "../interface/dataBase.interface.js";
import IDB, { createDataBase } from "./initialDataBase";

export default class DataBase<Type> implements IDataBace<Type> {
  private readonly db: IDB<Type>;

  constructor(jsonFile: string) {
    this.db = createDataBase<Type>(jsonFile);
  }

  getOneData = (filter: Function): Type => {
    const data = this.db.data.find((item) => filter(item));

    if (typeof data === "undefined") throw new Error("not found data");

    return data;
  };

  getAllData = (filter: Function, count: number = 20, page: number = 0): Type[] => {
    const datas = this.db.data
      ?.filter((item) => filter(item))
      .slice(page * count, page * count + count);

    return datas;
  };

  createData = (data: Type): void => {
    this.db.data?.push(data);

    this.db.write();
  };

  updateData = (filter: Function, value: Type): Type => {
    const index = this.db.data?.findIndex((item) => filter(item));

    if (index === -1) throw new Error("not found data");

    this.db.data[index] = value;

    return value;
  };

  deleteData = (filter: Function): Type => {
    const index = this.db.data?.findIndex((item) => filter(item));

    if (index === -1) throw new Error("not found data");

    const data = this.db.data.splice(index, 1);

    return data[0];
  };

  getLength = (): number => {
    return this.db.data.length
  }
}
