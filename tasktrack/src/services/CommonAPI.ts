import axios, { AxiosResponse } from "axios";

interface ICommonAPI {
  getData<T>(url: string, headers?: any, params?: any): Promise<AxiosResponse<T>>;
  postData<T, U>(url: string, headers?: any, data?: U): Promise<AxiosResponse<T>>;
}

class CommonAPI implements ICommonAPI {
  defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: ``,
  };

  getData<T>(url: string, headers = {}, params = {}): Promise<AxiosResponse<T>> {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .get(`${import.meta.env.VITE_API_URL}/${url}`, {
        headers: combinedHeaders,
        params: params,
      })
      .then((response) => response);
  }

  postData<T, U>(url: string, headers = {}, data?: U): Promise<AxiosResponse<T>> {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .post(`${import.meta.env.VITE_API_URL}/${url}`, data, {
        headers: combinedHeaders,
      })
      .then((response) => response);
  }
  putData<T, U>(url: string, headers = {}, data?: U): Promise<AxiosResponse<T>> {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .put(`${import.meta.env.VITE_API_URL}/${url}`, data, {
        headers: combinedHeaders,
      })
      .then((response) => response);
}
deleteData<T>(url: string, headers = {}): Promise<AxiosResponse<T>> {
  const combinedHeaders = { ...this.defaultHeaders, ...headers };

  return axios
    .delete(`${import.meta.env.VITE_API_URL}/${url}`, {
      headers: combinedHeaders,
    })
    .then((response) => response);
}

}

export default new CommonAPI();