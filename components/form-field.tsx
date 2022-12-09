import { FC } from "react";
import { Field, ErrorMessage } from "formik";
export const FormField: FC<{ date?: boolean; fieldName: string; placeholder: string }> = ({fieldName, placeholder, date}) => {
    return (
        <div className='m-1 w-stretch'>
            <Field className="border w-full border-black rounded-sm indent-1 p-1 focus-visible:outline-custom-red" type={(date ? 'date': 'text')} name={fieldName} placeholder={placeholder} />
            <ErrorMessage name={fieldName} component="div" className="text-custom-red text-xs"  />
        </div>
    )
}