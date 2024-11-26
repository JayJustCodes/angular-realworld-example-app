export interface LoadingState {
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
    data?: any;
}
