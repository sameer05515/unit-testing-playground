import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data?: any;
  isAxiosError: boolean;
}

export class ApiClient {
  async sendRequest(config: RequestConfig): Promise<ApiResponse | ApiError> {
    const startTime = Date.now();
    
    try {
      // Prepare headers - add Content-Type if body exists and not already set
      const headers = { ...config.headers };
      if (['POST', 'PUT', 'PATCH'].includes(config.method) && config.body) {
        const hasContentType = Object.keys(headers).some(
          key => key.toLowerCase() === 'content-type'
        );
        if (!hasContentType) {
          // Try to parse as JSON, if successful add JSON content type
          try {
            JSON.parse(config.body);
            headers['Content-Type'] = 'application/json';
          } catch (e) {
            // Not valid JSON, use text/plain
            headers['Content-Type'] = 'text/plain';
          }
        }
      }

      const axiosConfig: AxiosRequestConfig = {
        method: config.method.toLowerCase() as any,
        url: config.url,
        headers: headers,
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(config.method) && config.body) {
        try {
          axiosConfig.data = JSON.parse(config.body);
        } catch (e) {
          // If not valid JSON, send as string
          axiosConfig.data = config.body;
        }
      }

      const response: AxiosResponse = await axios(axiosConfig);
      const endTime = Date.now();

      return {
        status: response.status,
        statusText: response.statusText,
        headers: this.formatHeaders(response.headers),
        data: response.data,
        time: endTime - startTime,
      };
    } catch (error) {
      const endTime = Date.now();
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return {
          message: axiosError.message,
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          headers: axiosError.response?.headers ? this.formatHeaders(axiosError.response.headers) : undefined,
          data: axiosError.response?.data,
          isAxiosError: true,
          time: endTime - startTime,
        } as ApiError;
      }

      return {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        isAxiosError: false,
        time: endTime - startTime,
      } as ApiError;
    }
  }

  private formatHeaders(headers: any): Record<string, string> {
    const formatted: Record<string, string> = {};
    
    if (headers) {
      Object.keys(headers).forEach((key) => {
        formatted[key] = String(headers[key]);
      });
    }
    
    return formatted;
  }
}
