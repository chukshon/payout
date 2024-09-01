import React from "react";

type SelectedAccountCardProps = {
  accountName: string;
  isLoading: boolean;
};

const SelectedAccountCard = ({
  accountName,
  isLoading,
}: SelectedAccountCardProps) => {
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="flex flex-col">
      <p>{accountName}</p>
    </div>
  );
};

export default SelectedAccountCard;
