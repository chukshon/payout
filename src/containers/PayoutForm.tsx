import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payoutFormSchema } from "../schema/PayoutFormSchema";
import { z } from "zod";
import { optionT } from "../types";
import useGetBanks from "../queries/useGetBanks";
import useValidateAccount from "../queries/useValidateAccount";
import SelectedAccountCard from "../components/ui/SelectedAccountCard";
import useInitiateTransfer from "../mutations/useInitiateTransfer";

type PayoutFormInputs = z.infer<typeof payoutFormSchema>;

const PayoutForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PayoutFormInputs>({
    resolver: zodResolver(payoutFormSchema),
    defaultValues: {
      destinationAccountNumber: "",
      bankCode: "",
      bankName: undefined,
      amountToBePaid: undefined,
    },
  });
  const bankCode = watch("bankCode");
  const accountNumber = watch("destinationAccountNumber");

  const { Banks, isLoadingBanks } = useGetBanks();
  const { AccountDetails, isValidatingAccountDetails } = useValidateAccount(
    accountNumber,
    bankCode
  );
  const { initiateTransferMutation } = useInitiateTransfer();
  const handleSelectBank = (option: optionT) => {
    setValue("bankCode", option.value);
    setValue("bankName", option.label);
  };

  const onSubmit: SubmitHandler<PayoutFormInputs> = async (data) => {
    const payload = {
      amount: Number(data.amountToBePaid),
      reference: "testing3",
      narration: "testing",
      destinationBankCode: data.bankCode,
      destinationAccountNumber: data.destinationAccountNumber,
      currency: "NGN",
      sourceAccountNumber: "5978398182",
    };
    await initiateTransferMutation.mutateAsync(payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px] mt-[20px] "
    >
      <h2 className="text-center text-[30px] font-[600]">Payout Form</h2>
      <Input
        name="destinationAccountNumber"
        type="text"
        placeholder="Account Number"
        register={register}
        required
        error={errors.destinationAccountNumber?.message}
        label="Destination Account Number"
      />
      <Select
        isLoading={isLoadingBanks}
        loadingText={"Loading banks..."}
        options={Banks}
        error={errors.bankCode?.message}
        label="Destination Bank"
        handleSelect={handleSelectBank}
        value={watch("bankName")}
      />
      {accountNumber.length === 10 && bankCode.length > 0 && (
        <SelectedAccountCard
          accountName={AccountDetails?.accountName}
          isLoading={isValidatingAccountDetails}
        />
      )}

      <Input
        name="amountToBePaid"
        type="text"
        placeholder="Amount"
        register={register}
        required
        error={errors.amountToBePaid?.message}
        label="Amount to be paid"
      />

      <Button
        isLoading={initiateTransferMutation.isLoading}
        isDisabled={initiateTransferMutation.isLoading}
        type="submit"
      >
        Send Transaction
      </Button>
    </form>
  );
};

export default PayoutForm;
