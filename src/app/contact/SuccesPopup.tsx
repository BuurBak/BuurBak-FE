import React from "react";

interface SuccessPopupProps {
  message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md text-green-800">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
