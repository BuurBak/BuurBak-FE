"use client";
import React, { ChangeEvent, useState } from "react";

const SchadePage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-2">
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md mt-[110px] mb-10">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Ongelukje? <span className="text-primary-100">Meld je schade!</span>
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Hier kan je een schadeformulier downloaden en vervolgens invullen.
        Voeg daarna de nodige informatie en bestanden toe om je schade te melden.
      </p>

      <div className="mt-6 border-2 border-dashed border-gray-300 p-6 text-center">
        <input type="file" multiple className="hidden" onChange={handleFileChange} id="fileUpload" />
        <label htmlFor="fileUpload" className="cursor-pointer text-gray-500">
          <div className="p-10 border-2 border-dashed border-gray-400">
            <p>Sleep hier bestanden of klik om te uploaden</p>
          </div>
        </label>
      </div>

      <a
          href="/Nieuw_Europees_schadeformulier.pdf"
          download
          className="block text-center w-full bg-primary-100 text-white font-semibold py-2 mt-4 rounded-md hover:bg-primary-200">
          Download schadeformulier
      </a>

      <div className="mt-6 border-2 border-dashed border-gray-300 p-6 text-center">
        <input type="file" multiple className="hidden" onChange={handleFileChange} id="fileUpload2" />
        <label htmlFor="fileUpload2" className="cursor-pointer text-gray-500">
          <div className="p-10 border-2 border-dashed border-gray-400">
            <p>Sleep hier extra bestanden of klik om te uploaden</p>
          </div>
        </label>
      </div>

      <button className="w-full bg-primary-100 text-white font-semibold py-2 mt-4 rounded-md hover:bg-primary-200">
        Bevestig
      </button>
    </div>
    </main>
  );
};

export default SchadePage;
