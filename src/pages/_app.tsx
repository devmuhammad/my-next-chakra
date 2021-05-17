import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import theme from "../theme";
import "@fontsource/montserrat/400.css";
import "@fontsource/mulish/700.css";
import { AppProps } from "next/app";
import  {store, persistor } from "store";
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
