import * as types from "../actionTypes";

export const UpdateAgentPayments = (agentDet: any) => async (dispatch: (arg0: any) => void) => {
  try { 
        dispatch({
          type: types.UPDATE_RECENT_TRANSACTIONS,
          payload: agentDet,
        });
        return agentDet;
  } catch (error) {
    return console.error(error);
  }
};