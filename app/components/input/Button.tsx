"use client";
import React from "react";
import Spinner from "../utils/Spinner";

interface Props {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button = (props: Props) => {
  return (
    <div>
      <button
        className={`${props.className} cursor-pointer flex justify-center items-center`}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type ?? "button"}
      >
        {props.label}{" "}
        {props.loading ? (
          <span className="ml-5 flex items-center">
            <Spinner width="15px" height="15px" />
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default Button;
