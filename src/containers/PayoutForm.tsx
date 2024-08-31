import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payoutFormSchema } from "../schema/PayoutFormSchema";
import { z } from "zod";
import { optionT, BankT } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getBanks, validateAccount } from "../services/requests";
import { useAuth } from "../context/authContext";
import { useState } from "react";

type PayoutFormInputs = z.infer<typeof payoutFormSchema>;

const PayoutForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PayoutFormInputs>({
    resolver: zodResolver(payoutFormSchema),
    defaultValues: {
      destinationAccountNumber: undefined,
      bankCode: undefined,
      bankName: undefined,
      amountToBePaid: undefined,
      destinationAccountName: undefined,
    },
  });

  const bankCode = watch("bankCode");
  const accountNumber = watch("destinationAccountNumber");
  const { authToken } = useAuth();
  const bankQuery: any = useQuery({
    queryKey: [],
    queryFn: () => getBanks(authToken as string),
  });

  const validateAccountQuery: any = useQuery({
    queryKey: [accountNumber, bankCode],
    queryFn: () =>
      validateAccount(authToken as string, accountNumber, bankCode),
    enabled: accountNumber?.length === 10 && bankCode !== undefined,
  });

  const banks = bankQuery?.data?.data?.responseBody?.map((bank: BankT) => {
    return {
      label: bank.name,
      value: bank.code,
    };
  });

  const selectedAccount = validateAccountQuery?.data?.responseBody;

  const handleSelectBank = (option: optionT) => {
    setValue("bankCode", option.value);
    setValue("bankName", option.label);
  };

  const onSubmit: SubmitHandler<PayoutFormInputs> = (data) => {
    console.log(data);
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
        options={banks}
        error={errors.bankCode?.message}
        label="Destination Bank"
        handleSelect={handleSelectBank}
        value={watch("bankName")}
      />
      <Input
        name="destinationAccountName"
        type="number"
        placeholder="Account Name"
        register={register}
        required
        isDisabled={true}
        error={errors.destinationAccountName?.message}
        label="Destination Account Name"
      />
      <Input
        name="amountToBePaid"
        type="text"
        placeholder="Amount"
        register={register}
        required
        error={errors.amountToBePaid?.message}
        label="Amount to be paid"
      />

      <Button isLoading={false} isDisabled={false} type="submit">
        Send Transaction
      </Button>
    </form>
  );
};

export default PayoutForm;
