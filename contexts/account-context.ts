import { createContext, SetStateAction, Dispatch } from "react";

export const AccountContext = createContext<{
  account?: string | null;
  setAccount?: Dispatch<SetStateAction<string | null>>;
}>({});
