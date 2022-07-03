export default {
  dev: true,
  axios: {
    // baseURL: 'https://medlink-mobile-api.ecomedic.vn/drg-mobile-api', //PRODUCTION
    baseURL: 'http://10.2.9.69:8181/drg-mobile-api', //  UAT
    // baseURL: 'https://medlink-api.ecomedic.vn/drg-mobile-api', // Staging
    // baseURL: 'http://10.1.20.90:8080', //  DEV LONG PC
    // baseURL: 'http://10.1.120.80:8080/drg-mobile-api', // Dev Long MAC
    // baseURL: 'http://10.1.120.166:8080/drg-mobile-api', //  LONG TEST
    responseType: 'json',
    timeout: 10000,
  },
  notifycation: {
    order: 'Medlink_New_Order', //PROD
    // order: 'Medlink_Uat_New_Order', // UAT
    // order:'Medlink_Dev_New_Order', //DEV
    notifycation_order_function: 'ORDER_FUNCTION',
    notification_new_policy: 'NEW_POLICY',
    notification_holiday: 'HOLIDAY',
    notification_new_version: 'NEW_VERSION',
    notification_tet_holiday: 'TET_HOLIDAY',
    // notification_news:'NEW_POST_DEV',
    // notification_news:'NEW_POST_UAT',
    notification_news: 'NEW_POST_PRODUCTION',
  },
  baseWebURL: 'https://ezpharma.ecomedic.vn', //PRODUCTION
  // baseWebURL: 'https://drg-uat.ecomedic.vn:6868', //  UAT,
  // baseURLSocial: 'https://medlinknews.s3.amazonaws.com/', // Dev
  autoRefresh: 30000,
};
