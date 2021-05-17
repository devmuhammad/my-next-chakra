export interface Environment {
  name: 'local' | 'dev' | 'staging' | 'production';
  baseUrl: string;
  apiPath: string;
  appToken: string;
  appBuildNumber: string;
  apiSignature: string;
  gtmId: string;
  flutterWavePublicKey: string;
}

const environment: Environment = {
  name: process.env.NEXT_PUBLIC_APP_ENV as Environment['name'],
  baseUrl: `${process.env.NEXT_PUBLIC_UL_DOMAIN}`,  
  apiPath: `${process.env.NEXT_PUBLIC_UL_API_PATH}`,  
  appToken: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
  appBuildNumber: `${process.env.NEXT_PUBLIC_APP_BUILD_NUMBER}`,
  apiSignature: `${process.env.NEXT_PUBLIC_API_SIGNATURE}`,
  gtmId: `${process.env.NEXT_PUBLIC_GTM_ID}`,
  flutterWavePublicKey: `${process.env.NEXT_PUBLIC_FW_PUB_KEY}`,
};

export default environment;
