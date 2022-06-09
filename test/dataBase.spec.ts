import DataBase from "../src/database/dataBase.class";

type TestType = {
  name: string;
  age: number;
};

const datas: TestType[] = [
  {
    name: "ali",
    age: 1,
  },
  {
    name: "reza",
    age: 2,
  },
  {
    name: "hassan",
    age: 3,
  },
];

let dataBase = new DataBase<TestType>("test");

describe("class database", () => {
  describe("create", () => {
    it("success", () => {
      const res = dataBase.createData(datas[0]);

      expect(res).toBeUndefined();
    });
  });

  beforeEach(() => {
    dataBase = new DataBase<TestType>("test");
    datas.map((item) => {
      dataBase.createData(item);
    });
  });

  describe("get All", () => {
    it("success without count and page", () => {
      const res = dataBase.getAllData((item: TestType) => item.age > 1);

      expect(res).toEqual(datas.slice(1, 3));
    });

    it("success with count and page", () => {
      const res = dataBase.getAllData((item: TestType) => item.age > 1, 1, 0);

      expect(res).toEqual([datas[1]]);
    });
  });

  describe("get One", () => {
    it("success", () => {
      const res = dataBase.getOneData((item: TestType) => item.age === 1);

      expect(res).toEqual(datas[0]);
    });
  });

  describe("update", () => {
    it("success", () => {
      let res = dataBase.updateData((item: TestType) => item.age === 1, {
        ...datas[0],
        name: "test",
      });

      expect(res).toEqual({ ...datas[0], name: "test" });

      res = dataBase.getOneData((item: TestType) => item.age === 1);

      expect(res).toEqual({ ...datas[0], name: "test" });
    });
  });

  describe("delete", () => {
    it("success", () => {
      try {
        let res = dataBase.deleteData((item: TestType) => item.age === 1);

        expect(res).toEqual(datas[0]);

        dataBase.getOneData((item: TestType) => item.age === 1);
      } catch (error) {
        expect(error.message).toEqual("not found data");
      }
    });
  });
});
