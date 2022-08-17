import { ShallowRef, Ref } from 'vue-demi';
import { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';

interface UseAxiosReturn<T> {
    /**
     * Axios Response
     */
    response: ShallowRef<AxiosResponse<T> | undefined>;
    /**
     * Axios response data
     */
    data: Ref<T | undefined>;
    /**
     * Indicates if the request has finished
     */
    isFinished: Ref<boolean>;
    /**
     * Indicates if the request is currently loading
     */
    isLoading: Ref<boolean>;
    /**
     * Indicates if the request was canceled
     */
    isAborted: Ref<boolean>;
    /**
     * Any errors that may have occurred
     */
    error: ShallowRef<AxiosError<T> | undefined>;
    /**
     * Aborts the current request
     */
    abort: (message?: string | undefined) => void;
    /**
     * isFinished alias
     * @deprecated use `isFinished` instead
     */
    finished: Ref<boolean>;
    /**
     * isLoading alias
     * @deprecated use `isLoading` instead
     */
    loading: Ref<boolean>;
    /**
     * isAborted alias
     * @deprecated use `isAborted` instead
     */
    aborted: Ref<boolean>;
    /**
     * abort alias
     */
    cancel: (message?: string | undefined) => void;
    /**
     * isAborted alias
     * @deprecated use `isCanceled` instead
     */
    canceled: Ref<boolean>;
    /**
     * isAborted alias
     */
    isCanceled: Ref<boolean>;
}
interface StrictUseAxiosReturn<T> extends UseAxiosReturn<T> {
    /**
     * Manually call the axios request
     */
    execute: (url?: string, config?: AxiosRequestConfig) => PromiseLike<StrictUseAxiosReturn<T>>;
}
interface EasyUseAxiosReturn<T> extends UseAxiosReturn<T> {
    /**
     * Manually call the axios request
     */
    execute: (url: string, config?: AxiosRequestConfig) => PromiseLike<EasyUseAxiosReturn<T>>;
}
interface UseAxiosOptions {
    /**
     * Will automatically run axios request when `useAxios` is used
     *
     */
    immediate?: boolean;
}
declare function useAxios<T = any>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>>;
declare function useAxios<T = any>(url: string, instance?: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>>;
declare function useAxios<T = any>(url: string, config: AxiosRequestConfig, instance: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T> & PromiseLike<StrictUseAxiosReturn<T>>;
declare function useAxios<T = any>(config?: AxiosRequestConfig): EasyUseAxiosReturn<T> & PromiseLike<EasyUseAxiosReturn<T>>;
declare function useAxios<T = any>(instance?: AxiosInstance): EasyUseAxiosReturn<T> & PromiseLike<EasyUseAxiosReturn<T>>;
declare function useAxios<T = any>(config?: AxiosRequestConfig, instance?: AxiosInstance): EasyUseAxiosReturn<T> & PromiseLike<EasyUseAxiosReturn<T>>;

export { EasyUseAxiosReturn, StrictUseAxiosReturn, UseAxiosOptions, UseAxiosReturn, useAxios };
