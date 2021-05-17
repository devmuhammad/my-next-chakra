
// export const BASE = baseUrl;

import environment from "./environment";

export const FWConfig = {
    public_key: environment.flutterWavePublicKey,
    tx_ref: '',
    amount: 0,
    currency: 'NGN',
    country: 'NG',
    payment_options: 'banktransfer,ussd',
    customer: {
      email: '',
      phonenumber: '',
      name: '',
    },
    customizations: {
      title: '',
      description: '',
      logo: 'https://ulesson-production.s3.eu-west-2.amazonaws.com/uLesson+Favicon.png',
    },
    meta:{}
  };

// APP CONFIG
export const GET_APP_CONFIG = `/appconfig`;
export const GET_ALL_PLANS = `/all_plans`;

