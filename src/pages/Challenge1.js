import React, { useState } from "react";

const Challenge1 = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState();

  const onGetCodeClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/getCode`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-4">
        <form className="flex gap-4 justify-center">
          <input
            className="w-3/5 border px-4 py-2"
            type="text"
            placeholder="Please type your phone number with area code (E.g: +8412345689)"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 text-white w-[200px] h-[60px]"
            onClick={onGetCodeClick}
          >
            Get verify code
          </button>
        </form>
        <form className="flex gap-4 justify-center">
          <input
            className="w-3/5 border px-4 py-2"
            type="text"
            placeholder="Please type verify code"
            onChange={(e) => console.log(e.target.value)}
          />
          <button
            className="bg-red-500 text-white w-[200px] h-[60px]"
            type="submit"
          >
            Verify phone number
          </button>
        </form>
      </div>
    </div>
  );
};

export default Challenge1;
