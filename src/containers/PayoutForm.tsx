import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import SelectedAccountCard from "../components/ui/SelectedAccountCard";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payoutFormSchema } from "../schema/PayoutFormSchema";
import { z } from "zod";
import { optionT } from "../types";
import { v4 as uuidv4 } from "uuid";
import useGetBanks from "../queries/useGetBanks";
import useValidateAccount from "../queries/useValidateAccount";
import useInitiateTransfer from "../mutations/useInitiateTransfer";
import { CONFIG } from "../config";

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
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(payoutFormSchema),
    defaultValues: {
      destinationAccountNumber: "",
      bankCode: "",
      bankName: "",
      amountToBePaid: undefined,
    },
  });
  const bankCode = watch("bankCode");
  const accountNumber = watch("destinationAccountNumber");

  // Get Banks Query
  const { Banks, isLoadingBanks } = useGetBanks();

  // Validate Accouny Query
  const { AccountDetails, isValidatingAccountDetails, errorMessage } =
    useValidateAccount(accountNumber, bankCode);

  // InitiateTransfer Mutation
  const { initiateTransferMutation } = useInitiateTransfer();

  const handleSelectBank = (option: optionT) => {
    setValue("bankCode", option.value);
    setValue("bankName", option.label);
  };

  const onSubmit: SubmitHandler<PayoutFormInputs> = async (data) => {
    if (!errorMessage) {
      const payload = {
        amount: Number(data.amountToBePaid),
        reference: `reference-${uuidv4()}`,
        narration: "transfer",
        destinationBankCode: data.bankCode,
        destinationAccountNumber: data.destinationAccountNumber,
        currency: "NGN",
        sourceAccountNumber: CONFIG.SOURCE_ACCOUNT_NUMBER,
      };
      await initiateTransferMutation.mutateAsync(payload);
      reset();
    } else {
      toast(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px] mt-[20px] "
    >
      <h2 className="text-center text-[30px] font-[600]">Payout Form</h2>

      {/* Select Bank Dropdown */}
      <Select
        isLoading={isLoadingBanks}
        loadingText={"Loading banks..."}
        options={Banks}
        error={errors.bankCode?.message}
        label="Destination Bank"
        handleSelect={handleSelectBank}
        value={watch("bankName")}
      />
      {/* Destination Account Number Input */}
      <Input
        name="destinationAccountNumber"
        type="text"
        placeholder="Account Number"
        register={register}
        required
        error={errors.destinationAccountNumber?.message}
        label="Destination Account Number"
      />

      {/* Account Name */}
      {accountNumber.length === 10 && bankCode.length > 0 && (
        <SelectedAccountCard
          error={errorMessage as string}
          accountName={AccountDetails?.accountName}
          isLoading={isValidatingAccountDetails}
        />
      )}

      {/* Amount to be paid */}
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
        extraClassNames="mt-[50px]"
      >
        Send Transaction
      </Button>
    </form>
  );
};

export default PayoutForm;
