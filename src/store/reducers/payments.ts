import {
  GET_AGENT_INFO,
  UPDATE_RECENT_TRANSACTIONS
} from '../actionTypes';

const initialState = {
  agentDetails:{
    agentname: 'Moh Olawale',
    transactions: 0,
    totalAmount: 0,
    recentTx:[
      // {
      //   tx_ref: 'ffe0cd5-13fe-805c-fee4-a604e856a0',
      //   transaction_date: new Date(1621260808501),
      //   amount: 22000,
      //   status:'SUCCESS'
      // }
    ]
  }
};

const PaymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_AGENT_INFO:
      return { ...state, agentDetails: action.payload };
    case UPDATE_RECENT_TRANSACTIONS:
      return { ...state, agentDetails: action.payload}
    default:
      return { ...state };
  }
};

export default PaymentReducer;
