"use client";
import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  name: string;
  id: string;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
  return (
    <div className={props.className}>
      <label className={props.labelClassName}>{props.label}</label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange}
        className={`px-2 py-1 placeholder:text-xs focus:outline-none ${props.inputClassName}`}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
      />
    </div>
  );
};

export default Input;
