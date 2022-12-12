import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Form, Formik } from "formik";
import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { abi } from "../abi";
import { Button } from "../components/button";
import { FormField } from "../components/form-field";

export const Sign: FC = () => {
  const { isConnected } = useAccount();

  const { write, data } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: "signContract",
    mode: "recklesslyUnprepared",
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Formik
      initialValues={{
        tokenId: "",
      }}
      validate={(values) => {
        const errors = {} as {
          tokenId?: string;
        };
        if (!values.tokenId) {
          errors.tokenId = "Required";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        const { tokenId } = values;
        if (write) {
          write({
            recklesslySetUnpreparedArgs: [tokenId],
          });
        }
      }}
    >
      {({ isSubmitting }) =>
        isSuccess ? (
          <div className="flex flex-col gap-4 w-5/6 sm:w-full mx-auto">
            <h1 className="text-3xl mx-auto">Submitted!</h1>
            <div>
              Check it out on{" "}
              <a
                href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-custom-red underline"
              >
                PolygonScan
              </a>
              . Provide your counterparty with the token ID to sign as well if
              they haven&apos;t yet. Your e-signature will appear on the NFT
              contract shortly.
            </div>
          </div>
        ) : isLoading ? (
          <ImSpinner2 className="spin" />
        ) : !isConnected ? (
          <ConnectButton />
        ) : (
          <div className="flex flex-col w-80">
            <h1 className="text-4xl text-center mb-12">Sign Contract</h1>
            <h1 className="m-auto mb-2">
              Enter the token ID of the contract:{" "}
            </h1>
            <Form className="flex flex-col">
              <FormField fieldName="tokenId" placeholder="Token ID" />
              <Button
                type="submit"
                disabled={isSubmitting}
                text="Sign Contract"
              />
            </Form>
          </div>
        )
      }
    </Formik>
  );
};
export default Sign;
