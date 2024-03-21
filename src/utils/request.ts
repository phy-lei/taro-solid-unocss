import Taro from "@tarojs/taro";
import { $user, $clearUser } from "@/stores/user";
import { $setNeedRefresh } from '@/stores/refresh';
import $message from "@/components/Message/$message";

type RequestTaro<T = unknown> = typeof Taro.request<T>

type Service = <T>(url: string, options: Omit<Parameters<RequestTaro>['0'], 'url'>) => ReturnType<RequestTaro<ResponseData<T>>>


interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

// baseURL
const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : '/api';

const config = {
  baseURL: BASE_URL,
};

const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      $message({ tips: "请求失败！请您稍后重试", type: 'error' })
      break;
    case 401:
      $clearUser()
      Taro.switchTab({
        url: '/pages/mine/index',
        success: () => {
          $message({ tips: "登录失效！请您重新登录", type: 'error' })
        }
      });
      break;
    case 403:
      $message({ tips: "当前账号无权限访问！", type: 'error' })
      break;
    case 404:
      $message({ tips: "你所访问的资源不存在！", type: 'error' })
      break;
    case 405:
      $message({ tips: "请求方式错误！请您稍后重试", type: 'error' })
      break;
    case 408:
      $message({ tips: "请求超时！请您稍后重试", type: 'error' })
      break;
    case 500:
      $message({ tips: "服务异常！", type: 'error' })
      break;
    case 502:
      $message({ tips: "网关错误！", type: 'error' })
      break;
    case 503:
      $message({ tips: "服务不可用！", type: 'error' })
      break;
    case 504:
      $message({ tips: "网关超时！", type: 'error' })
      break;
    default:
      $message({ tips: "请求失败！", type: 'error' })
  }
};

class RequestHttp {
  service: Service;

  public constructor(config) {
    // instantiation
    this.service = this.createHttp(config) as Service;
  }

  private createHttp(config) {
    return (url, options) => {
      return new Promise((resolve, reject) => Taro.request({
        ...options,
        url: config.baseURL + url,
        method: options.method,
        header: {
          /** 从缓存拿 */
          satoken: $user.get().token,
          ...options.header
        },
        complete(res: any) {
          if (res.data.code !== 200) {
            checkStatus(res.data.code)
            reject(new Error('请求失败！'))
            $setNeedRefresh(true)
            return
          }
          resolve(res)
        }
      }))
    }
  }
  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, data?: object, _object = {}): Promise<T> {
    return this.service<T>(url, {
      method: 'GET',
      data,
      ..._object
    }).then((res) => (res.data.data))
  }
  post<T>(url: string, data?: object | string, _object = {}): Promise<T> {
    return this.service<T>(url, {
      method: 'POST',
      data,
      ..._object
    }).then((res) => (res.data.data))
  }
  put<T>(url: string, data?: object, _object = {}): Promise<T> {
    return this.service<T>(url, {
      method: 'PUT',
      data,
      ..._object
    }).then((res) => (res.data.data))
  }
  delete<T>(url: string, data?: any, _object = {}): Promise<T> {
    return this.service<T>(url, {
      method: 'DELETE',
      data,
      ..._object
    }).then((res) => (res.data.data))
  }
}

export default new RequestHttp(config);
