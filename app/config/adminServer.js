export default {
  dev: true,
  axios: {
    baseURL: 'https://crm-medlink.ecomedic.vn', // PRODUCTION
    // baseURL: 'http://10.2.9.55:8078', // UAT
    responseType: 'json',
    timeout: 10000,
  },
};
