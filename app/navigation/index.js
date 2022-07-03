import { createStackNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import LoginScreen from '../screens/LoginScreen/index';
import Home from '../screens/Home/index';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/MapScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import HelpScreen from '../screens/HelpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HistoryOrderScreen from '../screens/HistoryOrderScreen';
import ProviderDetailScreen from '../screens/ProviderDetailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ProviderFavoriteScreen from '../screens/ProviderFavoriteScreen';
import DrugFavoriteScreen from '../screens/DrugFavoriteScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import NewDetailScreen from '../screens/NewDetailScreen';
import NewCreateScreen from '../screens/NewCreateScreen';
import MyOrderScreen from '../screens/MyOrderScreen';
import PointDetailPolicyScreen from '../screens/PointDetailPolicyScreen';
import OrderManagement from '../screens/OrderManagement/';
import AddNewOrder from '../screens/AddNewOrder/';
import CustomerScreen from '../screens/CustomerScreen/';
import RewardPointsScreen from '../screens/RewardPointsScreen';
import ProductPortfolioScreen from '../screens/ProductPortfolioScreen';
import AddNewProductScreen from '../screens/AddNewProductScreen';
import DetailCustomerScreen from '../screens/DetailCustomerScreen';
import InvoiceDetail from '../screens/InvoiceDetail';
import QRCodeScreen from '../screens/QRCodeScreen';
import OrderProductOutOfStockScreen from '../screens/OrderProductOutOfStockScreen/';
import AddNewOrderStepTwo from '../screens/AddNewOrderStepTwo/';
import NotificationScreen from '../screens/NotificationScreen/';

//INVENTORY
import InvCheckHistory from '../screens/InvCheckHistory';
import InventoryTab from '../screens/InventoryTab/';
import InvImportHistory from '../screens/InvImportHistory/';
import InvImportCreateStep2 from '../screens/InvImportCreateStep2';
import InvImportDetail from '../screens/InvImportDetail/';
import InvImportCreateTabStep1 from '../screens/InvImportCreateTabStep1/';
import InvImportDQG from '../screens/InvImportCreateWithDQG';
import InvCheckDetail from '../screens/InvCheckDetail';
import InvCheckCreate from '../screens/InvCheckCreate';
//InvExport
import InvExportDetail from '../screens/InvExportDetail';
import InvExportCreate from '../screens/InvExportCreate';
import InvExportDrugList from '../screens/InvExportDrugList';
import InvExportHistory from '../screens/InvExportHistory';

//INVOICE
import InvoicePrinter from '../screens/InvoicePrinter';
import DetailOrderPharmacyScreen from '../screens/DetailOrderPharmacyScreen';
import InvImportCreateStep3 from '../screens/InvImportCreateStep3/';
import InvImportAddNewDrug from '../screens/InvImportAddNewDrug/';
import OrderListToProvider from '../screens/OrderToProvider/OrderListToProvider';
import InvImportWithDrugNew from '../screens/InvImportWithDrugNew/';
import InvCheckedList from '../screens/InvCheckedList';
// import ConnectDrugBank from '../screens/ConnectDrugBank/';
import ConnectDrugBankTab from '../screens/ConnectTab';
// import ConnectInvoice from '../screens/ConnectDrugBank/Invoice/ConnectInvoice/';
import ConnectInvoiceCreate from '../screens/ConnectInvoiceCreate';
import ConnectImportCreate from '../screens/ConnectImportCreate/';
import ConnectExportHistory from '../screens/ConnectExportHistory';
import ConnectExportCreate from '../screens/ConnectExportCreate/';
import CategoryCashFlowHistory from '../screens/CategoryCashFlowHistory';
import CategoryCashFolowDetail from '../screens/CategoryCashFolowDetail/';
export const AppNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Login: { screen: LoginScreen },
    Home: { screen: Home },
    Map: {
      screen: MapScreen,
    },
    OrderDetail: {
      screen: OrderDetailScreen,
    },
    HelpScreen: {
      screen: HelpScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    HistoryOrderScreen: {
      screen: HistoryOrderScreen,
    },
    ProviderDetailScreen: {
      screen: ProviderDetailScreen,
    },
    ResetPasswordScreen: {
      screen: ResetPasswordScreen,
    },
    AccountInfoScreen: {
      screen: AccountInfoScreen,
    },
    ChangePasswordScreen: {
      screen: ChangePasswordScreen,
    },
    ProviderFavoriteScreen: {
      screen: ProviderFavoriteScreen,
    },
    DrugFavoriteScreen: {
      screen: DrugFavoriteScreen,
    },
    ProductDetailScreen: {
      screen: ProductDetailScreen,
    },
    NewDetailScreen: {
      screen: NewDetailScreen,
    },
    NewCreateScreen: {
      screen: NewCreateScreen,
    },
    MyOrderScreen: {
      screen: MyOrderScreen,
    },
    PointDetailPolicyScreen: {
      screen: PointDetailPolicyScreen,
    },
    OrderManagement: {
      screen: OrderManagement,
    },
    AddNewOrder: {
      screen: AddNewOrder,
    },
    CustomerScreen: {
      screen: CustomerScreen,
    },
    RewardPointsScreen: {
      screen: RewardPointsScreen,
    },
    ProductPortfolioScreen: {
      screen: ProductPortfolioScreen,
    },
    AddNewProductScreen: {
      screen: AddNewProductScreen,
    },
    DetailCustomerScreen: {
      screen: DetailCustomerScreen,
    },
    InvoiceDetail: {
      screen: InvoiceDetail,
    },
    QRCodeScreen: {
      screen: QRCodeScreen,
    },
    OrderProductOutOfStockScreen: {
      screen: OrderProductOutOfStockScreen,
    },
    AddNewOrderStepTwo: {
      screen: AddNewOrderStepTwo,
    },
    NotificationScreen: {
      screen: NotificationScreen,
    },
    InventoryTab: {
      screen: InventoryTab,
    },

    //InvExport
    InvExportCreate: {
      screen: InvExportCreate,
    },
    InvExportHistory: {
      screen: InvExportHistory,
    },
    InvExportDetail: {
      screen: InvExportDetail,
    },
    InvExportDrugList: {
      screen: InvExportDrugList,
    },
    InvCheckHistory: {
      screen: InvCheckHistory,
    },
    InvImportHistory: {
      screen: InvImportHistory,
    },
    InvImportCreateStep2: {
      screen: InvImportCreateStep2,
    },
    InvImportCreateStep3: {
      screen: InvImportCreateStep3,
    },
    InvImportDetail: {
      screen: InvImportDetail,
    },
    InvImportDQG: {
      screen: InvImportDQG,
    },
    InvImportCreateTabStep1: {
      screen: InvImportCreateTabStep1,
    },
    InvCheckDetail: {
      screen: InvCheckDetail,
    },
    InvCheckCreate: {
      screen: InvCheckCreate,
    },
    DetailOrderPharmacyScreen: {
      screen: DetailOrderPharmacyScreen,
    },
    OrderListToProvider: {
      screen: OrderListToProvider,
    },
    InvImportAddNewDrug: {
      screen: InvImportAddNewDrug,
    },
    InvImportWithDrugNew: {
      screen: InvImportWithDrugNew,
    },
    InvCheckedList: {
      screen: InvCheckedList,
    },
    ConnectDrugBankTab: {
      screen: ConnectDrugBankTab,
    },
    ConnectInvoiceCreate: {
      screen: ConnectInvoiceCreate,
    },
    ConnectExportHistory: {
      screen: ConnectExportHistory,
    },
    ConnectExportCreate: {
      screen: ConnectExportCreate,
    },
    ConnectImportCreate: {
      screen: ConnectImportCreate,
    },
    CategoryCashFlowHistory: {
      screen: CategoryCashFlowHistory,
    },
    CategoryCashFolowDetail: {
      screen: CategoryCashFolowDetail,
    },
    InvoicePrinter: {
      screen: InvoicePrinter,
    },
  },
  {
    //initialRouteName: 'WarehouseScreen',
    initialRouteName: 'Splash',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    navigationOptions: navigation => ({
      header: null,
      gesturesEnabled: false,
    }),
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
