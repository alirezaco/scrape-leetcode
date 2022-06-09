import INode from "../interface/node.interface";
import ISparseMatris, {
  sizeSparceMatrisType,
} from "../interface/sparseMatris.interface";
import Node from "./node.class";

export default class SparseMatris implements ISparseMatris {
  private matris: INode[] = [];

  constructor(public colsMatris: number, public rowsMatris: number) {}

  insert = (row: number, col: number, value: number): void => {
    if (row < 0 || col < 0) throw new Error("bad value");

    if (row > this.rowsMatris || col > this.colsMatris)
      throw new Error("overflow");

    if (value === 1) {
      const node: INode = new Node(row, col, value);

      this.matris.push(node);
    }
  };

  remove = (row: number, col: number): number => {
    const index = this.get(row, col);

    if (index === -1) return -1;

    this.matris.splice(index, 1);

    return 0;
  };

  get = (row: number, col: number): number => {
    const result: (number | null)[] = this.matris
      .map((item, index) => {
        if (item.row === row && item.col === col) {
          return index;
        }

        return null;
      })
      .filter((item) => item !== null);

    if (result[0] != null) return result[0];

    return -1;
  };

  getAColumn = (col: number): INode[] => {
    let nodes: INode[] = this.matris.filter((item) => item.col === col);

    return nodes;
  };

  getARow = (row: number): INode[] => {
    const nodes: INode[] = this.matris.filter((item) => item.row === row);

    return nodes;
  };

  size = (): sizeSparceMatrisType => {
    const sizeMatris = this.colsMatris * this.rowsMatris;

    return {
      all: sizeMatris,
      withValue: this.matris.length,
      zeroCount: sizeMatris - this.matris.length
    }
  };
}
