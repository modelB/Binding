import { useContext, useEffect } from "react";
import { AccountContext } from "../contexts/account-context";

export default function Home() {
  const { account } = useContext(AccountContext);
  

  useEffect(() => {
    console.log("account in home", account);
  }, []);
  return (
    <>
      <button
        className="border-2 rounded-sm border-solid border-current p-2 theme-red"
      >
        Create Contract
      </button>
      <button
        className="border-2 rounded-sm border-solid border-current p-2 theme-red"
      >
        Get Contract
      </button>
    </>
  );
}
