import React from "react";
import { classNameMerger } from "~/utils";

interface SelectProps {
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
}

const Select = ({
  selectProps,
  label,
  isError = false,
  errorMessage,
  children,
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-gray-700 font-medium">
          {label}
        </label>
      )}
      <select
        {...selectProps}
        className={classNameMerger(
          "placeholder:text-sm border border-gray-300 w-full px-2 rounded-sm py-2",
          selectProps?.className,
          isError && "border-red-600 focus:outline-red-600"
        )}
      >
        {children}
      </select>
      {errorMessage && (
        <span className="text-red-600 text-sm placeholder:text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Select;


