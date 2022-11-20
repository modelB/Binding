import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  async function connect() {
    // window.ethereum = window.ethereum || {};
    if (window && typeof window.ethereum !== "undefined") {
      try {
        // Requests that the user provides an Ethereum address to be identified by. The request causes a MetaMask popup to appear. Read more: https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log({ account });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install Metamask.");
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Binding</title>
        <meta name="description" content="Legal Contracts Published as NFTs" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="flex flex-row items-center gap-4 mt-4 ml-6">
          <Image src="/favicon.svg" alt="logo" width={40} height={40} />
          <h1 className="theme-red text-2xl mt-2 cursive">Binding</h1>
          <h5 className="theme-red ml-auto mr-6 mt-2">
            legally-binding contracts, published to the blockchain forever
          </h5>
        </div>
        <div className="centered-screen">
          <button
            className="border-2 rounded-sm border-solid border-current p-2"
            onClick={connect}
          >
            Connect Wallet
          </button>
        </div>
        <footer className="absolute bottom-0 m-4"><a href=""><i className="fa fa-github mr-2"></i>GitHub</p></footer>
      </main>
    </div>
  );
}
