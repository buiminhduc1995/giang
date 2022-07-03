import axios from 'axios';
import appConfig from '../../app/config';
import authApi from './authApi';
import companyApi from './companyApi';
import mapApi from './mapApi';
import orderApi from './orderApi';
import productApi from './productApi';
import notification from './notification';
import socialApi from './socialApi';
import rewardPointApi from './rewardPointApi';
import invoiceApi from './invoiceApi';
import customerApi from './customerApi';
import dashboard from './dashboard';
import syncOrderToAdmin from './syncOrderToAdmin';
import warehouse from './inventory';
import syncDrugBank from './syncDrugBank';
import payVNpay from './payVNpay';

export default {
  authApi,
  companyApi,
  mapApi,
  orderApi,
  productApi,
  notification,
  socialApi,
  rewardPointApi,
  invoiceApi,
  customerApi,
  dashboard,
  syncOrderToAdmin,
  warehouse,
  syncDrugBank,
  payVNpay,
};
