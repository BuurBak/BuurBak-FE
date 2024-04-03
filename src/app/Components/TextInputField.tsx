import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type ButtonType = {
  label: string,
  outline?: boolean,
  icon?: "MagnifyingGlass",
  iconPosition?: "right" | "left";
};

const TextInputField = ({ label, outline, icon, iconPosition, ...props }: ButtonType) => {
  const importIconString = icon + "Icon";
  return (
    <>
@if ({icon} != null ) {
          <MagnifyingGlassIcon />
        }
      <input aria-label={label} className={outline ? "outline-primary-100" : ""} placeholder={label}>
        
      </input>
    </>
  );
};

export default TextInputField;