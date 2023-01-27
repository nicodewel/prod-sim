/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Employee {
  name?: string;
  /** @format int64 */
  id?: number;
  onDuty?: boolean;
}
export interface Station {
  /** @format int64 */
  productionTime?: number;
  employees?: Employee[];
  name?: string;
  /** @format int64 */
  id?: number;
  onDuty?: boolean;
}
export interface Robot {
  /** @format int64 */
  productionTime?: number;
  /** @format int64 */
  lifetime?: number;
  name?: string;
  /** @format int64 */
  id?: number;
  onDuty?: boolean;
}
export interface CarModel {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format float */
  complexity?: number;
}
export interface ProductionLine {
  /** @format int64 */
  id?: number;
  name?: string;
  carModel?: CarModel;
  componentMap?: Record<string, ProductionLineComponent>;
  active?: boolean;
  runnable?: boolean;
}
export interface ProductionLineComponent {
  /** @format int64 */
  productionTime?: number;
  name?: string;
  /** @format int64 */
  id?: number;
  onDuty?: boolean;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string;
  private securityData;
  private securityWorker?;
  private abortControllers;
  private customFetch;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected encodeQueryParam(key: string, value: any): string;
  protected addQueryParam(query: QueryParamsType, key: string): string;
  protected addArrayQueryParam(query: QueryParamsType, key: string): any;
  protected toQueryString(rawQuery?: QueryParamsType): string;
  protected addQueryParams(rawQuery?: QueryParamsType): string;
  private contentFormatters;
  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
  protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
  abortRequest: (cancelToken: CancelToken) => void;
  request: <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  stations: {
    /**
     * No description
     *
     * @tags station-controller
     * @name GetAll
     * @request GET:/stations
     */
    getAll: (params?: RequestParams) => Promise<HttpResponse<Station[], any>>;
    /**
     * No description
     *
     * @tags station-controller
     * @name Save
     * @request POST:/stations
     */
    save: (data: Station, params?: RequestParams) => Promise<HttpResponse<Station, any>>;
    /**
     * No description
     *
     * @tags station-controller
     * @name GetById
     * @request GET:/stations/{id}
     */
    getById: (id: number, params?: RequestParams) => Promise<HttpResponse<Station, any>>;
  };
  robots: {
    /**
     * No description
     *
     * @tags robot-controller
     * @name GetAll1
     * @request GET:/robots
     */
    getAll1: (params?: RequestParams) => Promise<HttpResponse<Robot[], any>>;
    /**
     * No description
     *
     * @tags robot-controller
     * @name Save1
     * @request POST:/robots
     */
    save1: (data: Robot, params?: RequestParams) => Promise<HttpResponse<Robot, any>>;
    /**
     * No description
     *
     * @tags robot-controller
     * @name GetById1
     * @request GET:/robots/{id}
     */
    getById1: (id: number, params?: RequestParams) => Promise<HttpResponse<Robot, any>>;
  };
  productionLines: {
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetAll2
     * @request GET:/productionLines
     */
    getAll2: (params?: RequestParams) => Promise<HttpResponse<ProductionLine[], any>>;
    /**
     * No description
     *
     * @tags production-line-controller
     * @name Save2
     * @request POST:/productionLines
     */
    save2: (data: ProductionLine, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetById2
     * @request GET:/productionLines/{id}
     */
    getById2: (id: number, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
  };
  employees: {
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetAll3
     * @request GET:/employees
     */
    getAll3: (params?: RequestParams) => Promise<HttpResponse<Employee[], any>>;
    /**
     * No description
     *
     * @tags employee-controller
     * @name Save3
     * @request POST:/employees
     */
    save3: (data: Employee, params?: RequestParams) => Promise<HttpResponse<Employee, any>>;
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetById3
     * @request GET:/employees/{id}
     */
    getById3: (id: number, params?: RequestParams) => Promise<HttpResponse<Employee, any>>;
  };
  carModels: {
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetAll4
     * @request GET:/carModels
     */
    getAll4: (params?: RequestParams) => Promise<HttpResponse<CarModel[], any>>;
    /**
     * No description
     *
     * @tags car-model-controller
     * @name Save4
     * @request POST:/carModels
     */
    save4: (data: CarModel, params?: RequestParams) => Promise<HttpResponse<CarModel, any>>;
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetById4
     * @request GET:/carModels/{id}
     */
    getById4: (id: number, params?: RequestParams) => Promise<HttpResponse<CarModel, any>>;
  };
}
export {};
