export interface IMultiData<T> {
    data: IData<T>[];
}

export interface ISingleData<T> {
    data: IData<T>;
}

export interface IPayload<T> {
    data: IData<T>;
}

interface IData<T> {
    id: number;
    attributes: T;
}
