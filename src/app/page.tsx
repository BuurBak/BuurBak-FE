"use client"

import { useState } from "react";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import TextInputField from "./Components/TextInputField";

export default function Home() {

  const [inputValue, setInputValue] = useState('');

  const changeInputValue = (event: { target: { value: any; }; }) => {
    if (event.target && event.target.value !== undefined) {
      setInputValue(event.target.value)
    }
  }

  return (
    <div>
      <TextInputField label="Type" outline filled icon inputValue={inputValue} setInputValue={changeInputValue} />
      <p>Input Value: {inputValue}</p>
      <Highlights />
      <Footer />
    </div>
  );
}
