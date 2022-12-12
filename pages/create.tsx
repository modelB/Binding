import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { Form, Formik } from "formik";
import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { abi } from "../abi";
import { Button } from "../components/button";
import { FormField } from "../components/form-field";

export const Create: FC = () => {
  const { isConnected } = useAccount();

  const { write, data } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: "mint",
    mode: "recklesslyUnprepared",
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Formik
      initialValues={{
        sellerWalletAddress: "",
        buyerWalletAddress: "",
        buyerName: "",
        sellerName: "",
        product: "",
        price: "",
        contractDate: "",
      }}
      validate={(values) => {
        const errors = {} as {
          sellerWalletAddress?: string;
          buyerWalletAddress?: string;
          buyerName?: string;
          sellerName?: string;
          product?: string;
          price?: string;
          contractDate?: string;
        };

        for (let [key, val] of Object.entries(values)) {
          if (!val) errors[key as keyof typeof errors] = "Required";
        }
        if (
          !errors.sellerWalletAddress &&
          !ethers.utils.isAddress(values.sellerWalletAddress)
        ) {
          errors.sellerWalletAddress = "Invalid ERC-20 address";
        }

        if (
          !errors.buyerWalletAddress &&
          !ethers.utils.isAddress(values.buyerWalletAddress)
        ) {
          errors.buyerWalletAddress = "Invalid ERC-20 address";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        const {
          buyerName,
          buyerWalletAddress,
          sellerName,
          sellerWalletAddress,
          product,
          price,
          contractDate,
        } = values;
        console.log(values);
        if (write) {
          write({
            recklesslySetUnpreparedArgs: [
              buyerName,
              buyerWalletAddress,
              sellerName,
              sellerWalletAddress,
              product,
              price,
              contractDate,
            ],
          });
        }
      }}
    >
      {({ isSubmitting }) =>
        isSuccess ? (
          <div className="flex flex-col gap-4  w-5/6 sm:w-full mx-auto">
            <h1 className="text-3xl mx-auto">Submitted!</h1>
            <div>
              Check it out on{" "}
              <a
                href={`https://polygonscan.com/tx/${data?.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-custom-red underline"
              >
                PolygonScan
              </a>
              . Provide your counterparty with the token ID and sign at your
              leisure.
            </div>
          </div>
        ) : isLoading ? (
          <ImSpinner2 className="spin" />
        ) : !isConnected ? (
          <ConnectButton />
        ) : (
          <div className="flex flex-col w-80">
            <h1 className="text-4xl text-center mb-12">Create Contract</h1>
            <h1 className="m-auto mb-2">Enter details about your contract: </h1>
            <Form className="flex flex-col">
              <FormField fieldName="buyerName" placeholder="Buyer Name" />
              <FormField
                fieldName="buyerWalletAddress"
                placeholder="Buyer Wallet Address"
              />
              <FormField fieldName="sellerName" placeholder="Seller Name" />
              <FormField
                fieldName="sellerWalletAddress"
                placeholder="Seller Wallet Address"
              />
              <FormField fieldName="product" placeholder="Product" />
              <FormField fieldName="price" placeholder="Price" />
              <FormField fieldName="contractDate" placeholder="Contract Date" />
              <Button
                type="submit"
                disabled={isSubmitting}
                text="Create Contract"
              />
            </Form>
          </div>
        )
      }
    </Formik>
  );
};
export default Create;
