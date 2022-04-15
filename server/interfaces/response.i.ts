// This describes API responses
// All API responses need to return a status string

export interface Response {
    status: string;
    data?: object | boolean | string | any;
    error?: string;
    warning?: string;
    count?: number;
}
