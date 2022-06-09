import SparseMatris from "../src/classes/sparseMatris.class";
import ISparseMatris, {
  sizeSparceMatrisType,
} from "../src/interface/sparseMatris.interface";
import Node from "../src/classes/node.class";

let sparseMatris: ISparseMatris = new SparseMatris(5, 5);

beforeEach(() => {
  sparseMatris = new SparseMatris(5, 5);
});

describe("sparseMatris", () => {
  describe("insert", () => {
    it("success", () => {
      const res = sparseMatris.insert(1, 1, 1);
      expect(res).toBeUndefined();
    });

    it("fail (overflow)", () => {
      try {
        sparseMatris.insert(15, 15, 1);
      } catch (error) {
        expect(error.message).toEqual("overflow");
      }
    });

    it("fail (bad value)", () => {
      try {
        sparseMatris.insert(15, -15, 1);
      } catch (error) {
        expect(error.message).toEqual("bad value");
      }
    });

    it("fail (value is 0)", () => {
      const res = sparseMatris.insert(1, 1, 0);
      expect(res).toBeUndefined();
    });
  });

  describe("get", () => {
    it("success", () => {
      sparseMatris.insert(0, 0, 1);
      sparseMatris.insert(2, 0, 1);
      sparseMatris.insert(1, 0, 1);
      sparseMatris.insert(0, 2, 1);
      const index = sparseMatris.get(0, 0);

      expect(index).toEqual(0);
    });

    it("not found", () => {
      const index = sparseMatris.get(0, 3);

      expect(index).toEqual(-1);
    });
  });

  describe("get column", () => {
    it("success", () => {
      sparseMatris.insert(0, 2, 1);
      const columnNodes = sparseMatris.getAColumn(2);

      expect(columnNodes).toEqual([new Node(0, 2, 1)]);
    });
  });

  describe("get row", () => {
    it("success", () => {
      sparseMatris.insert(0, 2, 1);
      const columnNodes = sparseMatris.getARow(0);

      expect(columnNodes).toEqual([new Node(0, 2, 1)]);
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      sparseMatris.insert(0, 0, 1);
      sparseMatris.insert(1, 0, 1);
      sparseMatris.insert(2, 0, 1);
    });

    it("success", () => {
      const res = sparseMatris.remove(0, 0);

      expect(res).toEqual(0);
    });

    it("not found", () => {
      const res = sparseMatris.remove(4, 0);

      expect(res).toEqual(-1);
    });
  });

  describe("size", () => {
    it("success", () => {
      sparseMatris.insert(1, 0, 1);

      const output: sizeSparceMatrisType = {
        all: 25,
        zeroCount: 24,
        withValue: 1,
      };

      const res = sparseMatris.size();

      expect(res).toEqual(output);
    });
  });
});
