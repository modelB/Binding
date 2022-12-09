import { FC } from "react";
import { useSigner, useContractWrite } from "wagmi";
import { abi } from "../abi";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormField } from "../components/form-field";
import { Button } from "../components/button";
import { ethers } from 'ethers';

export const Create: FC = () => {
  const { data: signer } = useSigner();
  const { write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: 'mint',
    // overrides: {
    //     maxFeePerGas: ethers.utils.parseEther('1'),
    //     maxPriorityFeePerGas: ethers.utils.parseEther('1')
    // }
  });

  useEffect(() => {
    console.log('contractaddress', process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 'abi', abi)
    console.log({write, signer})
  }, [write, signer])
  

  return (
    <div className='flex flex-col w-80'>
      <h1 className='m-auto mb-2'>Enter details about your contract: </h1>
      <Formik
        initialValues={{ sellerWalletAddress: "", buyerWalletAddress: "", buyerName: "", sellerName: '', product: '', price: '', contractDate: '' }}
        validate={(values) => {
          const errors = {} as { sellerWalletAddress?: string; };
          if (!values.sellerWalletAddress) {
            errors.sellerWalletAddress = "Required";
          }
        //    else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.sellerWalletAddress)
        //   ) {
        //     errors.sellerWalletAddress = "Invalid email address";
        //   }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
            const { buyerName, buyerWalletAddress, sellerName, sellerWalletAddress, product, price, contractDate } = values;
            console.log(values)
            write!({ recklesslySetUnpreparedArgs: [buyerName, buyerWalletAddress, sellerName, sellerWalletAddress, product, price, contractDate]});
            setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <FormField fieldName='buyerName' placeholder='Buyer Name' />
            <FormField fieldName='buyerWalletAddress' placeholder='Buyer Wallet Address' />
            <FormField fieldName='sellerName' placeholder='Seller Name' />
            <FormField fieldName='sellerWalletAddress' placeholder='Seller Wallet Address' />
            <FormField fieldName='product' placeholder='Product' />
            <FormField fieldName='price' placeholder='Price' />
            <FormField fieldName='contractDate' placeholder='Contract Date' />
            <Button type="submit" disabled={isSubmitting} text='Create Contract' />
          </Form>
        )}
      </Formik>
    </div>
  )
};
export default Create;
