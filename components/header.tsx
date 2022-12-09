import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { useAccount } from "wagmi";
import Logo from "./../public/logo.svg";

export const Header: FC = () => {
  const { address, isConnected } = useAccount();
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center gap-4 ml-6 h-14">
        <Logo />
        <h1 className="text-2xl">{`de|sign`}</h1>
      </div>
      <h5 className="ml-auto mr-6 mt-3">
        {isConnected ? (
          <ConnectButton />
        ) : (
          null
        )}
      </h5>
    </div>
  );
};
