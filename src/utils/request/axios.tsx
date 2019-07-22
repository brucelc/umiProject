import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { CANCEL_REQUEST_MESSAGE } from 'constants/index';

const { CancelToken } = axios;
window.cancelRequest = new Map();

export default function request(options) {
  console.log('data,11,,,', options);

  const { data, method = 'get' } = options;
  let { url } = options;
  const cloneData = cloneDeep(data);

  console.log('data,,,,', data, url, method);

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    console.log('eeee', e);
    message.error(e.message);
  }

  options.url = url;
  options.params = cloneData;
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  console.log('options', options, data, url);

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;

      let result: any = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          result.list = data;
        }
      } else {
        result.data = data;
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch(error => {
      const { response, message } = error;

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        };
      }

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
