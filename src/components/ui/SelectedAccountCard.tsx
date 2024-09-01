type SelectedAccountCardProps = {
  accountName: string;
  isLoading: boolean;
  error: string;
};

const SelectedAccountCard = ({
  accountName,
  isLoading,
  error,
}: SelectedAccountCardProps) => {
  if (isLoading) {
    return <>Validating account...</>;
  }
  return (
    <div className="flex flex-col">
      <p>Account Details</p>
      {error && <p className="text-red-700">{error}</p>}
      <p className="text-[#EF8730]">{accountName}</p>
    </div>
  );
};

export default SelectedAccountCard;
