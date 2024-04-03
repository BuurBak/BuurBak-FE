type ButtonType = {
  label: string;
};

const Button = ({ label, ...props }: ButtonType) => {
  return (
    <>
      <button
        type="button"
        className="px-4 py-2 m5 bg-zinc-950 rounded-md text-white"
      >
        {label}
      </button>
    </>
  );
};

export default Button;
