import { GET_APP_CONFIG, GET_ALL_PLANS } from '../config';
import {api} from 'config';

export default {
  getAppConfig: () => {
    return api.get(GET_APP_CONFIG);
  },
  getAllPlans: () => {
    return api.get(GET_ALL_PLANS);
  },
};