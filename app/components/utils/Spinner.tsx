import React from "react";

interface Props {
  width: string;
  height: string;
}
const Spinner = (props: Props) => {
  return (
    <div
      style={{
        width: props.width ?? "40px",
        height: props.height ?? "40px",
        border: "3px solid #e5e7eb",
        borderTop: "3px solid #4f46e5",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
};

export default Spinner;
