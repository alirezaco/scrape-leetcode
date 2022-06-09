export default interface IDataBace<Type> {
    getOneData: (filter: Function) => Type;

    getAllData: (filter: Function, count?: number, page?: number) => Type[];

    createData: (data: Type) => void;

    updateData: (filter: Function, value: Type) => Type;

    deleteData: (filter: Function) => Type | void;

    getLength: () => number
}