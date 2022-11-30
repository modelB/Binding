import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Context,
} from "react";
import Router from "next/router";
import { AccountContext } from "../contexts/account-context";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function ConnectPage() {
  const { setAccount } = useContext(AccountContext);
  async function connect() {
    if (window && typeof window.ethereum !== "undefined") {
      try {
        // Requests that the user provides an Ethereum address to be identified by. The request causes a MetaMask popup to appear. Read more: https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        setAccount!(accounts[0]);
        Router.push("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install Metamask.");
    }
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <button
      className="border-2 rounded-sm border-solid border-current p-2 theme-red"
      onClick={connect}
    >
      Connect Wallet
    </button>
  );
}
