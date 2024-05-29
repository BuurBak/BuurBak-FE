type CheckmarkProps = {
  className?: string;
};

const Checkmark = ({ className, ...props }: CheckmarkProps) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input type="checkbox" {...props} className="hidden" />
      <span
        className={`w-6 h-6 inline-block border-2 ${
          checked ? "bg-primary-100 border-primary-100" : "border-gray-100"
        } rounded-md flex items-center justify-center transition-all`}
      ></span>
    </label>
  );
};

export default Checkmark;
