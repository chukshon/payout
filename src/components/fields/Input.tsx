import { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: string;
  isDisabled?: boolean;
};
const Input = ({
  label,
  error,
  placeholder,
  name,
  register,
  required,
  isDisabled,
  type,
}: InputFieldProps) => {
  return (
    <div className="w-full flex flex-col gap-[5px]">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        readOnly={isDisabled}
        {...register(name, { required })}
        className={`${
          isDisabled
            ? "opacity-[0.8] text-neutral-950 bg-neutral-400 focus:none pointer-events-none"
            : ""
        } ${
          error ? "border-red-500" : ""
        }  placeholder:z-0 border-[2px] border-neutral-500 outline-none focus:border-blue-700 px-[10px] py-[5px] rounded-[3px]`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
