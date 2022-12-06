import React from 'react';
import '../styles/globals.css';
import Head from "next/head";
import { Parallax, Background } from "react-parallax";
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
        <Parallax
              blur={5}
              bgImage='/backgroundblur.png'
              bgImageAlt='background'
              strength={200}
              renderLayer={percentage => (
                <div>
                  <div
                    style={{
                      position: "fixed",
                      background: `white`,
                      left: "100%",
                      top: "100%",
                      borderRadius: "100%",
                      width: percentage * 500,
                      height: percentage * 500,
                    }}
                  />
                   </div>
              )}
            >
              <Toaster
                position="top-center"
                reverseOrder={false}
                  />  
                  <Component {...pageProps} />
            </Parallax>
        </StockpileProvider>
      </SolanaProviders>
  </>
  )
}

export default MyApp
