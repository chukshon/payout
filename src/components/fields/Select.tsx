import React, { useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";

type option = {
  label: string;
  value: string;
};

type SelectProps = {
  optons: option[];
  handleSelect: () => void;
};
const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleToggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchBank = () => {
    console.log("search");
  };

  return (
    <div className="w-full  relative z-40 ">
      {/* Select Label */}
      <label>Destination Bank</label>
      {/* Select Tab */}
      <button
        type="button"
        onClick={handleToggleDropDown}
        className={`w-full cursor-pointer flex justify-between items-center border-[2px] border-neutral-500 px-[10px] py-[5px] rounded-tl-[3px] rounded-tr-[3px]  ${
          isOpen ? "border-b-[0px]" : ""
        }`}
      >
        <p>Select Bank</p>
        {!isOpen ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
      </button>
      {/* Select Options */}
      {isOpen && (
        <div className="bg-neutral-50 w-full z-40 absolute flex flex-col gap-[0px] rounded-br-[3px] rounded-bl-[3px] border-t-[0px] border-[2px] border-neutral-500 ">
          <div className="px-[10px] flex items-center gap-[0px] border-t-[#EF8730] border-t-[3px] border-b-[2px] ">
            <IoSearchSharp size={20} strokeWidth={2} />
            <input
              placeholder="Search"
              type="text"
              className="placeholder:italic  border-neutral-500 py-[10px] w-full outline-none px-[10px]"
            />
          </div>
          <ul className="h-[150px] overflow-x-scroll flex flex-col">
            {dummyOptions.map((option) => {
              return (
                <li className="hover:text-neutral-50 px-[10px] cursor-pointer py-[10px] hover:bg-[#EF8730]">
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
