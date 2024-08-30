import { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: string;
};
const Input = ({
  label,
  error,
  placeholder,
  name,
  register,
  required,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-[5px] max-w-[400px]">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type="text"
        {...register(name, { required })}
        className="border-[2px] border-neutral-500 outline-none focus:border-blue-700 px-[10px] py-[5px] rounded-[3px]"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
