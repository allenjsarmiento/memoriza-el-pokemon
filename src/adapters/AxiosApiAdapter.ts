import type { AxiosInstance } from "axios";
import type { IApiAdapter } from "./IApiAdapter";


export class AxiosApiAdapter implements IApiAdapter{

    constructor(private readonly axiosInstance:AxiosInstance) { }

    async get<T>(url: string): Promise<T> {
        const {data} = await this.axiosInstance.get(url)
        return data
    }
    post<T>(url: string, body: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    put<T>(url: string, body: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
}