import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Header } from "../components/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "De|Sign",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({ accentColor: "#d50101" })}
      >
        <Head>
          <title>de | sign</title>
          <meta
            name="description"
            content="Legal Contracts Published as NFTs"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <main className="flex flex-col min-h-fit h-screen">
          <Header />
          <div className="flex flex-col mx-auto w-fit max-w-md mt-1/2">
            <Component {...pageProps} />
          </div>
          <footer className="mt-auto box-border py-4 min-h-fit w-full flex flex-row align-self-end">
            <a
              target="_blank"
              href="https://github.com/modelB/Binding"
              rel="noreferrer"
              className="text-md ml-3 sm:ml-5 mr-8 min-w-fit"
            >
              <i className="fa fa-github mr-2" aria-hidden={true}></i>GitHub
            </a>
            <div className="ml-auto sm:mr-5 mr-3 text-xs sm:text-base">
              Legally-binding contracts, published to the blockchain forever
            </div>
          </footer>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
