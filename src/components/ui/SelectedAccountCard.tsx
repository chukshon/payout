type SelectedAccountCardProps = {
  accountName: string;
  isLoading: boolean;
};

const SelectedAccountCard = ({
  accountName,
  isLoading,
}: SelectedAccountCardProps) => {
  if (isLoading) {
    return <>Validating account...</>;
  }
  return (
    <div className="flex flex-col">
      <p className="text-[#EF8730]">{accountName}</p>
    </div>
  );
};

export default SelectedAccountCard;
