import Input from "./components/fields/Input";
import Select from "./components/fields/Select";
import Button from "./components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payoutFormSchema } from "./schema/PayoutFormSchema";
import { z } from "zod";

type PayoutFormInputs = z.infer<typeof payoutFormSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayoutFormInputs>({
    resolver: zodResolver(payoutFormSchema),
  });

  const onSubmit = () => {};
  return (
    <main className="bg-[#D2D8DE] flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-50 w-[600px] h-[600px] rounded-[8px] py-[20px] px-[20px]">
        <h2 className="text-center text-[30px] font-[600]">Payout Form</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[10px] mt-[20px] "
        >
          <Input
            name="destinationAccountNumber"
            type="text"
            placeholder="Account Number"
            register={register}
            required
            error={errors.destinationAccountNumber?.message}
            label="Destination Account Number"
          />
          <Select />
          <Input
            name="destinationAccountNumber"
            type="text"
            placeholder="Account Number"
            register={register}
            required
            error={errors.destinationAccountNumber?.message}
            label="Destination Account Number"
          />
          <Button />
        </form>
      </div>
    </main>
  );
}

export default App;
