import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Home from "./home";

export default function ConnectPage() {
  const { isConnected } = useAccount();
  return <div className="m-auto">{!isConnected ? <ConnectButton /> : <Home />}</div>;
}
