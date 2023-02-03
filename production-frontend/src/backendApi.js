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

export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  baseUrl = "https://prodplanner.azurewebsites.net";
  securityData = null;
  securityWorker;
  abortControllers = new Map();
  customFetch = (...fetchParams) => fetch(...fetchParams);
  baseApiParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  constructor(apiConfig = {}) {
    Object.assign(this, apiConfig);
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  contentFormatters = {
    [ContentType.Json]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createAbortSignal = (cancelToken) => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }
    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };
  abortRequest = (cancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };
  request = async ({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response;
      r.data = null;
      r.error = null;
      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });
      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }
      if (!response.ok) throw data;
      return data;
    });
  };
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api extends HttpClient {
  simulations = {
    /**
     * No description
     *
     * @tags simulation-controller
     * @name GetActiveSimulations
     * @request GET:/simulations
     */
    getActiveSimulations: (params = {}) =>
      this.request({
        path: `/simulations`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags simulation-controller
     * @name AddToSimulation
     * @request POST:/simulations
     */
    addToSimulation: (data, params = {}) =>
      this.request({
        path: `/simulations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags simulation-controller
     * @name StopSimulation
     * @request DELETE:/simulations
     */
    stopSimulation: (data, params = {}) =>
      this.request({
        path: `/simulations`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags simulation-controller
     * @name ModifySimulationSpeed
     * @request POST:/simulations/modifySpeed
     */
    modifySimulationSpeed: (data, params = {}) =>
      this.request({
        path: `/simulations/modifySpeed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  productionLines = {
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetAll
     * @request GET:/productionLines
     */
    getAll: (params = {}) =>
      this.request({
        path: `/productionLines`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags production-line-controller
     * @name Save
     * @request POST:/productionLines
     */
    save: (data, params = {}) =>
      this.request({
        path: `/productionLines`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags production-line-controller
     * @name Delete
     * @request DELETE:/productionLines
     */
    delete: (data, params = {}) =>
      this.request({
        path: `/productionLines`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags production-line-controller
     * @name GetById
     * @request GET:/productionLines/{id}
     */
    getById: (id, params = {}) =>
      this.request({
        path: `/productionLines/${id}`,
        method: "GET",
        ...params,
      }),
  };
  productionLineComponents = {
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name GetAll1
     * @request GET:/productionLineComponents
     */
    getAll1: (params = {}) =>
      this.request({
        path: `/productionLineComponents`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name Save1
     * @request POST:/productionLineComponents
     */
    save1: (data, params = {}) =>
      this.request({
        path: `/productionLineComponents`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags production-line-component-controller
     * @name GetById1
     * @request GET:/productionLineComponents/{id}
     */
    getById1: (id, params = {}) =>
      this.request({
        path: `/productionLineComponents/${id}`,
        method: "GET",
        ...params,
      }),
  };
  employees = {
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetAll2
     * @request GET:/employees
     */
    getAll2: (params = {}) =>
      this.request({
        path: `/employees`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags employee-controller
     * @name Save2
     * @request POST:/employees
     */
    save2: (data, params = {}) =>
      this.request({
        path: `/employees`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags employee-controller
     * @name GetById2
     * @request GET:/employees/{id}
     */
    getById2: (id, params = {}) =>
      this.request({
        path: `/employees/${id}`,
        method: "GET",
        ...params,
      }),
  };
  carModels = {
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetAll3
     * @request GET:/carModels
     */
    getAll3: (params = {}) =>
      this.request({
        path: `/carModels`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags car-model-controller
     * @name Save3
     * @request POST:/carModels
     */
    save3: (data, params = {}) =>
      this.request({
        path: `/carModels`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags car-model-controller
     * @name GetById3
     * @request GET:/carModels/{id}
     */
    getById3: (id, params = {}) =>
      this.request({
        path: `/carModels/${id}`,
        method: "GET",
        ...params,
      }),
  };
}
