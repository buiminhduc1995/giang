import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Invoice_Create, SearchParams, Invoice_Detail } from './Invoice';
import { Drug, Product_List } from './Product';
import { User, Login, Store } from './Auth';

export interface Navigation extends NavigationScreenProp<NavigationState, NavigationParams> {}
export { Invoice_Create, SearchParams, Invoice_Detail };
export { Drug, Product_List };
export { User, Store, Login };
