import INode from "./node.interface.js";

export type sizeSparceMatrisType = {
  all: number,
  zeroCount: number,
  withValue: number
}

export default interface ISparseMatris {
  colsMatris: number;

  rowsMatris: number;

  insert: (row: number, col: number, value: number) => void;

  remove: (row: number, col: number) => number;

  get: (row: number, col: number) => number;

  getAColumn: (col: number) => Array<INode>;

  getARow: (row: number) => Array<INode>;

  size: () => sizeSparceMatrisType;
}
