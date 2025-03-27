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
        Ongelukje? <span className="text-orange-500">Meld je schade!</span>
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Voeg hier de nodige informatie en bestanden toe om je schade te melden.
      </p>

      {/* Drag & Drop Zone */}
      <div className="mt-6 border-2 border-dashed border-gray-300 p-6 text-center">
        <input type="file" multiple className="hidden" onChange={handleFileChange} id="fileUpload" />
        <label htmlFor="fileUpload" className="cursor-pointer text-gray-500">
          <div className="p-10 border-2 border-dashed border-gray-400">
            <p>Sleep hier bestanden of klik om te uploaden</p>
          </div>
        </label>
      </div>

      {/* Download schadeformulier */}
      <button className="w-full bg-orange-500 text-white font-semibold py-2 mt-4 rounded-md hover:bg-orange-600">
        Download schadeformulier
      </button>

      {/* Tweede Drag & Drop Zone */}
      <div className="mt-6 border-2 border-dashed border-gray-300 p-6 text-center">
        <input type="file" multiple className="hidden" onChange={handleFileChange} id="fileUpload2" />
        <label htmlFor="fileUpload2" className="cursor-pointer text-gray-500">
          <div className="p-10 border-2 border-dashed border-gray-400">
            <p>Sleep hier extra bestanden of klik om te uploaden</p>
          </div>
        </label>
      </div>

      {/* Bevestig-knop */}
      <button className="w-full bg-orange-500 text-white font-semibold py-2 mt-4 rounded-md hover:bg-orange-600">
        Bevestig
      </button>
    </div>
    </main>
  );
};

export default SchadePage;
