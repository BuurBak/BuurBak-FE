import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type ButtonType = {
  label: string,
  styling?: string,
  icon?: boolean,
  disabled?: boolean;
};

const Button = ({ label, styling, icon, disabled, ...props }: ButtonType) => {
  return (
    <>
      <button
        type="button"
        className={(styling !== undefined ? styling : "") + (disabled ? "bg-gray-100 hover:bg-gray-100" : "") + " flex flex-row justify-center items-center px-7 h-12 font-bold bg-primary-100 hover:bg-primary-200 rounded-sm text-white"}
      >
        {icon && <MagnifyingGlassIcon className="w-8 h-8 mr-2"/>}
        {label}
      </button>
    </>
  );
};

export default Button;
