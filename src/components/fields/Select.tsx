import { useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { optionT } from "../../types";

type SelectProps = {
  options: optionT[];
  handleSelect: (option: optionT) => void;
  error?: string;
  label: string;
  value: string;
  isLoading: boolean;
  loadingText: string;
};
const Select = ({
  error,
  handleSelect,
  options,
  label,
  value,
  isLoading,
  loadingText,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleToggleDropDown = () => {
    if (!isLoading) {
      setIsOpen(!isOpen);
    }
  };

  const onSelect = (option: optionT) => {
    setIsOpen(false);
    handleSelect(option);
    setSearchTerm(""); // Clear search term when an option is selected
  };
  const handleSearchBank = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full  relative z-40 ">
      {/* Select Label */}
      <label>{label}</label>
      {/* Select Toggle */}

      <button
        type="button"
        onClick={handleToggleDropDown}
        className={`w-full cursor-pointer flex justify-between items-center border-[2px] border-neutral-500 px-[10px] py-[5px] rounded-tl-[3px] rounded-tr-[3px]  ${
          isOpen ? "border-b-[0px]" : ""
        }`}
      >
        {isLoading ? <>{loadingText}</> : <p>{value ?? "Select Bank"}</p>}
        {!isOpen ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
      </button>
      {/* Select Options Container */}
      {isOpen && (
        <div className="bg-neutral-50 w-full z-40 absolute flex flex-col gap-[0px] rounded-br-[3px] rounded-bl-[3px] border-t-[0px] border-[2px] border-neutral-500 ">
          {/* Select Search */}
          <div className="px-[10px] flex items-center gap-[0px] border-t-[#EF8730] border-t-[3px] border-b-[2px] ">
            <IoSearchSharp size={20} strokeWidth={2} />
            <input
              onChange={handleSearchBank}
              value={searchTerm}
              placeholder="Search"
              type="text"
              className="placeholder:italic  border-neutral-500 py-[10px] w-full outline-none px-[10px]"
            />
          </div>
          {/* Select Options */}
          <ul className="h-[150px] overflow-x-scroll flex flex-col">
            {filteredOptions.map((option) => {
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onSelect(option);
                  }}
                  className="hover:text-neutral-50 px-[10px] cursor-pointer py-[10px] hover:bg-[#EF8730]"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
