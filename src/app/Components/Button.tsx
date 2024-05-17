// als icon library is gekozen nog optie voor veschillende icons toevoegen.
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type ButtonType = {
  label: string;
  submit?: boolean;
  type?: "primary" | "secondary";
  styling?: string;
  icon?: boolean;
  disabled?: boolean;
  buttonAction?: any;
};

const Button = ({
  label,
  type,
  styling,
  icon,
  disabled,
  submit,
  buttonAction,
  ...props
}: ButtonType) => {
  return (
    <>
      <button
        {...props}
        onClick={buttonAction}
        type={submit ? "submit" : "button"}
        className={
          (styling !== undefined ? styling : "") +
          (disabled
            ? type === "secondary"
              ? " text-gray-100 cursor-not-allowed"
              : " bg-gray-100 text-white cursor-not-allowed"
            : type === "secondary"
              ? " hover:bg-gray-50 text-secondary-100"
              : " bg-primary-100 hover:bg-primary-200 text-white") +
          " flex flex-row justify-center items-center px-7 h-12 font-bold rounded-sm transition duration-300"
        }
      >
        {icon && <MagnifyingGlassIcon className="w-8 h-8 mr-2" />}
        {label}
      </button>
    </>
  );
};

export default Button;
