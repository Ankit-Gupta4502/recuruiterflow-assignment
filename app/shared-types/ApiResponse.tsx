export type Response<T> = {
    error: null | Error;
    data: T;
    count: null | number;
    status: number;
    statusText: string;
} 