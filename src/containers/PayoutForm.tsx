import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payoutFormSchema } from "../schema/PayoutFormSchema";
import { z } from "zod";
import { optionT } from "../types";

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

  const dummyOptions = [
    {
      label: "First Bank",
      value: "232",
    },
    {
      label: "FCMB",
      value: "102",
    },
    {
      label: "Access Bank",
      value: "112",
    },
    {
      label: "Fidelity Bank",
      value: "310",
    },
  ];

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
        options={dummyOptions}
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
