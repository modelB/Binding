import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import Head from "next/head";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "../components/header";

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
      <RainbowKitProvider chains={chains}>
          <Head>
            <title>de | sign</title>
            <meta
              name="description"
              content="Legal Contracts Published as NFTs"
            />
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <main className='min-h-screen'>
            <Header />
            <div className="centered-screen">
              <Component {...pageProps} />
            </div>
            <footer className="absolute box-border bottom-0 my-4 min-h-fit w-full flex flex-row items-center">
              <a
                target="_blank"
                href="https://github.com/modelB/Binding"
                rel="noreferrer"
                className="text-xs ml-5"
              >
                <i className="fa fa-github mr-2" aria-hidden={true}></i>GitHub
              </a>
              <div className="ml-auto mr-5">
                Legally-binding contracts, published to the blockchain forever
              </div>
            </footer>
          </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
