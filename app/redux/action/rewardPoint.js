import Api from "../../api";
import { GET_POINT_WALLET , UPDATE_POINT_WALLET} from "../types";

export function getPointWallet(drg_store_id) {
  return dispatch =>
    new Promise(resolve => {
      Api.rewardPointApi.getPointWallet(drg_store_id).then(res=>{
        dispatch({type:GET_POINT_WALLET,pointWallet:res.data});
        resolve();
      })
    });
}

export function updatePointWallet(params) {
  return dispatch =>
    new Promise(resolve => {
      Api.rewardPointApi.updateRewardPoint(params).then(res=>{
        getPointWallet(params.drg_store_id);
        resolve();
      })
    });
}
