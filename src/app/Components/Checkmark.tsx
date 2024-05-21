type CheckmarkProps = {
  checked: boolean;
  onChange?: () => void;
  onClick?: () => void;
};

const Checkmark = ({ checked, onChange, onClick }: CheckmarkProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
        onClick={onClick}
      />
      <span
        className={`w-6 h-6 inline-block border-2 ${
          checked ? "bg-primary-100 border-primary-100" : "border-gray-100"
        } rounded-md flex items-center justify-center transition-all`}
      ></span>
    </label>
  );
};

export default Checkmark;
