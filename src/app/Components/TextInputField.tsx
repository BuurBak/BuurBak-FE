import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";

type ButtonType = {
  label: string,
  outline?: boolean,
  icon?: boolean,
  inputValue: string,
  setInputValue?: ChangeEventHandler<HTMLInputElement>,
  filled?: boolean,
  styling?: string;
};

const TextInputField = ({ label, outline, icon, inputValue, setInputValue, filled, styling, ...props }: ButtonType) => {

  return (
    <div className={(styling !== undefined ? styling : "") + " relative w-fit"}>
      <input value={inputValue} onChange={setInputValue} className={(outline ? "outline-0 border border-primary-100" : "outline-0 border border-offWhite-100") + " h-12 focus:outline-0 px-3 rounded"} placeholder={label}>
      </input>
      {icon && <div className={(filled ? "right-0 top-0 p-2 bg-primary-100 rounded-r" : "right-2 top-2") + " absolute"}><MagnifyingGlassIcon className={(filled ? "text-white" : "") + " h-8 w-8"} /></div>}
    </div>
  )
};

export default TextInputField;