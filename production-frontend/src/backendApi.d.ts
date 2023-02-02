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

export interface CarModel {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format float */
  complexity?: number;
}
export interface Employee {
  /** @format int64 */
  id?: number;
  name?: string;
  component?: ProductionLineComponent;
  onDuty?: boolean;
}
export interface ProductionLine {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  simSpeed?: number;
  /** @format float */
  simTime?: number;
  /** @format int64 */
  timeToCompletion?: number;
  /** @format int64 */
  finishedParts?: number;
  carModel?: CarModel;
  components?: ProductionLineComponent[];
  active?: boolean;
  runnable?: boolean;
}
export interface ProductionLineComponent {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int64 */
  step?: number;
  /** @format int64 */
  productionTime?: number;
  employees?: Employee[];
  type?: "robot" | "station";
  productionLine?: ProductionLine;
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
  simulations: {
    /**
     * No description
     *
     * @tags simulation-controller
     * @name GetActiveSimulations
     * @request GET:/simulations
     */
    getActiveSimulations: (params?: RequestParams) => Promise<HttpResponse<ProductionLine[], any>>;
    /**
     * No description
     *
     * @tags simulation-controller
     * @name AddToSimulation
     * @request POST:/simulations
     */
    addToSimulation: (data: ProductionLine, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
    /**
     * No description
     *
     * @tags simulation-controller
     * @name StopSimulation
     * @request DELETE:/simulations
     */
    stopSimulation: (data: ProductionLine, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
    /**
     * No description
     *
     * @tags simulation-controller
     * @name ModifySimulationSpeed
     * @request POST:/simulations/modifySpeed
     */
    modifySimulationSpeed: (data: ProductionLine, params?: RequestParams) => Promise<HttpResponse<boolean, any>>;
  };
  productionLines: {
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetAll
     * @request GET:/productionLines
     */
    getAll: (params?: RequestParams) => Promise<HttpResponse<ProductionLine[], any>>;
    /**
     * No description
     *
     * @tags production-line-controller
     * @name Save
     * @request POST:/productionLines
     */
    save: (data: ProductionLine, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetById
     * @request GET:/productionLines/{id}
     */
    getById: (id: number, params?: RequestParams) => Promise<HttpResponse<ProductionLine, any>>;
  };
  productionLineComponents: {
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name GetAll1
     * @request GET:/productionLineComponents
     */
    getAll1: (params?: RequestParams) => Promise<HttpResponse<ProductionLineComponent[], any>>;
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name Save1
     * @request POST:/productionLineComponents
     */
    save1: (
      data: ProductionLineComponent,
      params?: RequestParams,
    ) => Promise<HttpResponse<ProductionLineComponent, any>>;
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name GetById1
     * @request GET:/productionLineComponents/{id}
     */
    getById1: (id: number, params?: RequestParams) => Promise<HttpResponse<ProductionLineComponent, any>>;
  };
  employees: {
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetAll2
     * @request GET:/employees
     */
    getAll2: (params?: RequestParams) => Promise<HttpResponse<Employee[], any>>;
    /**
     * No description
     *
     * @tags employee-controller
     * @name Save2
     * @request POST:/employees
     */
    save2: (data: Employee, params?: RequestParams) => Promise<HttpResponse<Employee, any>>;
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetById2
     * @request GET:/employees/{id}
     */
    getById2: (id: number, params?: RequestParams) => Promise<HttpResponse<Employee, any>>;
  };
  carModels: {
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetAll3
     * @request GET:/carModels
     */
    getAll3: (params?: RequestParams) => Promise<HttpResponse<CarModel[], any>>;
    /**
     * No description
     *
     * @tags car-model-controller
     * @name Save3
     * @request POST:/carModels
     */
    save3: (data: CarModel, params?: RequestParams) => Promise<HttpResponse<CarModel, any>>;
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetById3
     * @request GET:/carModels/{id}
     */
    getById3: (id: number, params?: RequestParams) => Promise<HttpResponse<CarModel, any>>;
  };
}
export {};
