export interface ApiResponse {
    status: string;
    warning?: string;
    error?: string;
    data: any;
}