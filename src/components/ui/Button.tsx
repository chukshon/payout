import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isDisabled: boolean;
  type: "button" | "submit";
  onClick?: () => void;
};

const Button = ({
  children,
  isLoading,
  isDisabled,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`disabled:opacity-[0.3] disabled:cursor-not-allowed bg-[#EF8730] py-[10px] px-[5px] rounded-[5px] text-neutral-50`}
      type={type}
      disabled={isDisabled}
    >
      {isLoading ? <>Loading...</> : children}
    </button>
  );
};

export default Button;
