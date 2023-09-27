import '../styles/globals.css';
import { Provider, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { store } from '../redux/athlete/store';
import 'regenerator-runtime/runtime';
import client from '../apollo-client';
import { ApolloProvider } from '@apollo/client';
// NEAR-Wallet-Selector Integration
import { WalletSelectorContextProvider } from '../contexts/WalletSelectorContext';
import '@near-wallet-selector/modal-ui/styles.css';

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <ApolloProvider client={client}>
      {/* @ts-ignore:next-line*/}
      <WalletSelectorContextProvider>
        <Provider store={store}>{isClient ? <Component {...pageProps} /> : 'Prerendered'}</Provider>
      </WalletSelectorContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
