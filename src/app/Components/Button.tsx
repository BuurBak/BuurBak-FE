type ButtonType = {
  label: string,
  styling?: string;
};

const Button = ({ label, styling, ...props }: ButtonType) => {
  return (
    <>
      <button
        type="button"
        className={(styling !== undefined ? styling : "") + " px-7 h-12 font-bold bg-primary-100 rounded-sm text-white"}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
