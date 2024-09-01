import { useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { optionT } from "../../types";
import useClickOutside from "../../hooks/useClickOutside";

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
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleToggleDropDown = () => {
    if (!isLoading) {
      setIsComponentVisible(!isComponentVisible);
    }
  };

  const onSelect = (option: optionT) => {
    setIsComponentVisible(false);
    handleSelect(option);
    setSearchTerm(""); // Clear search term when an option is selected
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={ref} className="w-full  relative z-40 ">
      {/* Select Label */}
      <label>{label}</label>
      {/* Select Toggle */}

      <button
        type="button"
        onClick={handleToggleDropDown}
        className={`${
          error ? "border-red-500" : ""
        } w-full cursor-pointer flex justify-between items-center border-[2px] border-neutral-500 px-[10px] py-[5px] rounded-tl-[3px] rounded-tr-[3px]  ${
          isComponentVisible ? "border-b-[0px]" : ""
        }`}
      >
        {isLoading ? <>{loadingText}</> : <p>{value ?? "Select Bank"}</p>}
        {!isComponentVisible ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
      </button>
      {/* Select Options Container */}
      {isComponentVisible && (
        <div className="bg-neutral-50 w-full z-40 absolute flex flex-col gap-[0px] rounded-br-[3px] rounded-bl-[3px] border-t-[0px] border-[2px] border-neutral-500 ">
          {/* Select Search */}
          <div className="px-[10px] flex items-center gap-[0px] border-t-[#EF8730] border-t-[3px] border-b-[2px] ">
            <IoSearchSharp size={20} strokeWidth={2} />
            <input
              onChange={handleSearch}
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
