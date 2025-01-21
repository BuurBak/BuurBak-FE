// als icon library is gekozen nog optie voor veschillende icons toevoegen.

import Icon, { IconName } from "./Icon";

type ButtonType = {
  label: string;
  submit?: boolean;
  type?: "primary" | "secondary";
  className?: string;
  icon?: boolean;
  IconName?: IconName;
  disabled?: boolean;
  onClick?: any;
};

const Button = ({
  label,
  type,
  className,
  icon,
  disabled,
  submit,
  onClick,
  IconName,
  ...props
}: ButtonType) => {
  return (
    <>
      <button
        {...props}
        onClick={onClick}
        type={submit ? "submit" : "button"}
        className={
          (className !== undefined ? className : "") +
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
        {icon && <Icon name={IconName || "Search"} className="w-8 h-8 mr-2" />}
        {label}
      </button>
    </>
  );
};

export default Button;
