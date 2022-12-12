import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAccount } from "wagmi";
import Logo from "./../public/logo.svg";

export const Header: FC = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  return (
    <div className="flex flex-row mb-auto">
      <button
        className="flex flex-row items-center gap-4 ml-6 h-14"
        onClick={() => router.push("/")}
      >
        <Logo />
        <h1 className="text-2xl">{`de|sign`}</h1>
      </button>
      <h5 className="ml-auto mr-6 mt-3">
        {isConnected ? <ConnectButton /> : null}
      </h5>
    </div>
  );
};
