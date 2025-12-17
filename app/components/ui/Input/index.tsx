import type React from "react";
import Reac from "react";
import { classNameMerger } from "~/utils";




interface propTypes {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    label?: string
    isError?: boolean
    errorMessage?: string
}

const Input = ({ inputProps, label, isError = false, errorMessage }: propTypes) => {
    return (
        <div>
            {label && <label className=" block mb-2 text-gray-700  font-medium  " htmlFor="" > {label}</label>}
            <input type="text"  {...inputProps}  className={classNameMerger(" placeholder:text-sm border border-gray-300 w-full px-2 rounded-sm py-2 ", inputProps?.className, isError && "  border-red-600   focus:outline-red-600 ")} />
            {errorMessage && <span className=" text-red-600 text-sm placeholder:text-red-600  " >
                {errorMessage}
            </span>}
        </div>
    )
}
export default Input