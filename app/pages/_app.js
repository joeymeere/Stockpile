import React from 'react';
import '../styles/globals.css';
import Head from "next/head";
import { SolanaProviders } from '../components/Providers';
import { StockpileProvider } from "../components/Context";
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
  <>
      <Head>
        <title>Stockpile | Funding Without Barriers</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SolanaProviders>
        <StockpileProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
              />  
              <Component {...pageProps} />
        </StockpileProvider>
      </SolanaProviders>
  </>
  )
}

export default MyApp
