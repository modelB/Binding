import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Logo from "./../public/logo.svg";
import styles from "../styles/Home.module.css";
import { createContext, useContext, useState } from "react";
import { AccountContext } from "../contexts/account-context";

export default function App({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<string | null>(null);
  return (
    <div className={styles.container}>
      <Head>
        <title>de | sign</title>
        <meta name="description" content="Legal Contracts Published as NFTs" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="flex flex-row mt-4">
          <div className="flex flex-row items-center gap-4 ml-6">
            <Logo />
            <h1 className="text-2xl">{`de|sign`}</h1>
          </div>
          <h5 className="ml-auto mr-6 mt-3">
            legally-binding contracts, published to the blockchain forever
          </h5>
        </div>
        <div className="centered-screen">
          <AccountContext.Provider value={{ account, setAccount }}>
            <Component {...pageProps} />
          </AccountContext.Provider>
        </div>
        <footer className="absolute bottom-0 m-4">
          <a
            target="_blank"
            href="https://github.com/modelB/Binding"
            rel="noreferrer"
            className="text-xs"
          >
            <i className="fa fa-github mr-2" aria-hidden={true}></i>GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}
