import INode from "../interface/node.interface";

export default class Node implements INode {
  constructor(
    public row: number,
    public col: number,
    public value: number
  ) {}
}
