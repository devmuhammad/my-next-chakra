import { defaults } from "../../services";
import * as types from "../actionTypes";

export const fetchAppConfigs = () => async (dispatch: (arg0: any) => void) => {
  try {
    await defaults.getAppConfig().then((resp: any) => {
      const { status, data } = resp;
      if (status === 200) {
        
        dispatch({
          type: types.APP_CONFIG,
          payload: data.data,
        });
        return data.data;
      }
    });
  } catch (error) {
    return console.error(error);
  }
};

export const fetchAllPlans = () => async (dispatch: (arg0: any) => void) => {
  try {
    await defaults.getAllPlans().then((resp: any) => resp.data.data)
    .then((res:any) => {
      const { status, data } = res;
      if (status === 'Success') {
        
        dispatch({
          type: types.ALL_PLANS,
          payload: data,
        });
        return data;
      }
    });
  } catch (error) {
    return console.error(error);
  }
};
