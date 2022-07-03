export default {
  dev: true,
  axios: {
    // baseURL: 'http://pay-uat.ecomedic.vn', // PRODUCTION
    baseURL: 'http://10.2.9.69:8083', // UAT
    responseType: 'json',
    timeout: 100000,
  },
};
