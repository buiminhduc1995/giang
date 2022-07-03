import axios from 'axios';
import appConfig from '../config';
import adminServerConfig from '../config/adminServer';
import serverVNPay from '../config/serverVNPay'
const apiLogRequest = (apiName, axiosRequest) => {
  console.group &&
    console.group(
      '%cAPI Request',
      'color:white;font-weight:bold;background:#0194ff;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', axiosRequest.method.toUpperCase());
  console.log('Endpoint\t\t', axiosRequest.url);
  axiosRequest.data && console.log('Request Body\t', axiosRequest.data);
  console.log('AXIOS Request\t', axiosRequest);
  console.groupEnd && console.groupEnd();
};

const apiLogResponse = (apiName, axiosResponse) => {
  console.log(axiosResponse);
  console.group &&
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:green;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', axiosResponse.config.method.toUpperCase());
  console.log('Endpoint\t\t', axiosResponse.config.url);
  axiosResponse.config.data && console.log('Request Body\t', axiosResponse.config.data);
  axiosResponse.data && console.log('Response Body\t', axiosResponse.data);
  console.log('AXIOS Response\t', axiosResponse);
  console.groupEnd && console.groupEnd();
};

const apiLogError = (apiName, error) => {
  console.log('error', error);
  console.group &&
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:red;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', error.config.method.toUpperCase());
  console.log('Endpoint\t\t', error.config.url);
  error && error.config.data && console.log('Request Body\t', error.config.data);
  error && error.data && console.log('Response Body\t', error.data);
  console.log('AXIOS Error\t', error);
  console.groupEnd && console.groupEnd();
};

const client = axios.create(appConfig.axios);

// enable request logging for dev
if (appConfig.dev) {
  client.interceptors.request.use(
    request => {
      const apiName = request.apiName || 'UNKNOWN';
      apiLogRequest(apiName, request);
      return request;
    },
    error => {
      console.log('API Error', error);
      return error;
    }
  );

  client.interceptors.response.use(
    response => {
      const apiName = response.config.apiName || 'UNKNOWN';
      apiLogResponse(apiName, response);
      return response;
    },
    error => {
      if (error.response) {
        const apiName = error.config.apiName || 'UNKNOWN';
        apiLogError(apiName, error.response);
      } else if (error.request) {
        // console.log('hahahaha',error.request, error.status, 'sfsfsfsdfs');return;
        // const apiName = error.config.headers['X_HEADER_API_LOG'] || 'UNKNOWN';
        // apiLogError(apiName, error.request);
      } else {
        console.log('API Error', error.message);
      }
      throw error;
    }
  );
}

export default client;

export const adminClient = axios.create(adminServerConfig.axios);
if (adminServerConfig.dev) {
  adminClient.interceptors.request.use(
    request => {
      const apiName = request.apiName || 'UNKNOWN';
      apiLogRequest(apiName, request);
      return request;
    },
    error => {
      console.log('API Error', error);
      return error;
    }
  );

  adminClient.interceptors.response.use(
    response => {
      const apiName = response.config.apiName || 'UNKNOWN';
      apiLogResponse(apiName, response);
      return response;
    },
    error => {
      if (error.response) {
        const apiName = error.config.apiName || 'UNKNOWN';
        apiLogError(apiName, error.response);
      } else if (error.request) {
        // console.log('hahahaha',error.request, error.status, 'sfsfsfsdfs');return;
        // const apiName = error.config.headers['X_HEADER_API_LOG'] || 'UNKNOWN';
        // apiLogError(apiName, error.request);
      } else {
        console.log('API Error', error.message);
      }
      throw error;
    }
  );
}
export const vnPay = axios.create(serverVNPay.axios);
if (serverVNPay.dev) {
  vnPay.interceptors.request.use(
    request => {
      const apiName = request.apiName || 'UNKNOWN';
      apiLogRequest(apiName, request);
      return request;
    },
    error => {
      console.log('API Error', error);
      return error;
    }
  );

  vnPay.interceptors.response.use(
    response => {
      const apiName = response.config.apiName || 'UNKNOWN';
      apiLogResponse(apiName, response);
      return response;
    },
    error => {
      if (error.response) {
        const apiName = error.config.apiName || 'UNKNOWN';
        apiLogError(apiName, error.response);
      } else if (error.request) {
        // console.log('hahahaha',error.request, error.status, 'sfsfsfsdfs');return;
        // const apiName = error.config.headers['X_HEADER_API_LOG'] || 'UNKNOWN';
        // apiLogError(apiName, error.request);
      } else {
        console.log('API Error', error.message);
      }
      throw error;
    }
  );
}


